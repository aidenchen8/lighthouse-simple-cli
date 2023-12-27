import type { Config } from 'lighthouse';
import { commonConfig } from './config';
const config: Config = {
  extends: 'lighthouse:default',
  settings: {
    ...commonConfig,
    formFactor: 'mobile',
    throttling: {
      rttMs: 35,
      throughputKbps: 40 * 1024,
      cpuSlowdownMultiplier: 1.5,
      requestLatencyMs: 0, // 0 means unset
      downloadThroughputKbps: 40 * 1024,
      uploadThroughputKbps: 25 * 1024,
    },
    screenEmulation: {
      // resolution base on iphone 12 pro
      mobile: true,
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      disabled: false,
    },
    emulatedUserAgent:
      'Mozilla/5.0 (Linux; Android 13; xiaomi (2023)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  },
};

export default config;
