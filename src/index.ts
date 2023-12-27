import { Command } from 'commander';
import lighthouse from 'lighthouse';
import { resolve } from 'path';
import fs from 'fs';
import * as chromeLauncher from 'chrome-launcher';
import pkg from '../package.json';
import desktopConfig from './config/desktop-default';
import mobileConfig from './config/mobile-default';
import { quickTestAudits } from './config/config';

const program = new Command();
program.name(pkg.name).description(pkg.description).version(`v${pkg.version}`);

program
  .option(
    '-t ,--type <char>',
    'what type of device is been testing, [string] [choices: "mobile", "desktop"]',
    'desktop',
  )
  .option('-q, --quick', `quick test`, false)
  .option(
    '-o, --output <char...>',
    `Reporter for the results, supports multiple values. choices: "json", "html", "csv"`,
    ['html', 'json', 'csv'],
  )
  .option('-p, --output-path <char>', `The file path to output the results.`)
  .option('-v, --view', `Open HTML report in your browser`, false)
  .option('-t, --times <number>', `test times`);

// program
//   .command('dev')
//   .description('Run dev')
//   .action(async () => {});

program.parse();

const pattern = /^https?:\/\//;

const options = program.opts();
let url = program.args[0];
if (!pattern.test(url)) {
  url = 'https://' + url;
}
console.log('Options: ', program.opts());
console.log('Remaining arguments: ', program.args);

let config;
if (options.type === 'mobile') {
  config = mobileConfig;
} else {
  config = desktopConfig;
}
if (options.quick) {
  config.onlyAudits = quickTestAudits;
}
// set output
config.settings.output = options.output

// Step 1: 启动 Chrome
const chrome = await chromeLauncher.launch({
  chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
});

lighthouse(
  url,
  {
    logLevel: 'info',
    port: chrome.port,
  },
  config,
)
  .then((res) => {
    if (res?.report) {
      const outputPath = resolve(process.cwd(), options.outputPath || '')
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      let index =0
      for(const fileType of config.settings.output) {
        const filePath = resolve(outputPath, `${url.replace(pattern, '')}__report.${fileType}`)
        fs.writeFileSync(
          filePath,
          res?.report[index],
        );
        index++
      }
    }
  })
  .catch((e) => {
    console.error('[Lighthouse Error]:', e);
  })
  .finally(() => {
    chrome.kill();
  });
