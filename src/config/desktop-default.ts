import type { Config } from 'lighthouse';
import { commonConfig } from './config';
const config: Config = {
  extends: 'lighthouse:default',
  settings: {
    ...commonConfig,
    formFactor: 'desktop',
    throttling: {
      rttMs: 20,
      throughputKbps: 100 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0, // 0 means unset
      downloadThroughputKbps: 100 * 1024,
      uploadThroughputKbps: 50 * 1024,
    },
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      disabled: false,
    },
    emulatedUserAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
};

export default config;
