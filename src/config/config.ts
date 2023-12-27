import type { SharedFlagsSettings } from 'lighthouse';
export const commonConfig: SharedFlagsSettings = {
  output: ['html', 'json', 'csv'],
  maxWaitForFcp: 15 * 1000,
  maxWaitForLoad: 35 * 1000,
  onlyCategories: ['performance'],
};

export const commonflagConfig = {};

export const quickTestAudits = [
  'is-on-https',
  'metrics/first-contentful-paint',
  'metrics/largest-contentful-paint',
  'metrics/total-blocking-time',
  'metrics/interaction-to-next-paint',
  'network-requests',
  'network-rtt',
  'network-server-latency',
  'performance-budget',
  'long-tasks',
  'dobetterweb/charset',
  'dobetterweb/dom-size',
  'dobetterweb/js-libraries',
];
