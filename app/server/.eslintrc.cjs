/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/unbound-method */

const { resolve } = require('path');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    resolve(__dirname, '../../.eslintrc.cjs')
  ],
  parserOptions: {
    project: resolve(__dirname, 'tsconfig.json')
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: resolve(__dirname, 'tsconfig.json')
      }
    }
  },
  rules: {}
};
