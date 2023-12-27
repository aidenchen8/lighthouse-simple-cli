import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { cleandir } from 'rollup-plugin-cleandir';

const defaultConfig = {
  input: './src/index.ts',
  output: {
    dir: './dist',
    format: 'es',
    banner: '#!/usr/bin/env node',
  },
  plugins: [cleandir('./dist'), json(), typescript(), terser()],
};

export default defaultConfig;
