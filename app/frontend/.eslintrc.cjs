/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/unbound-method */

const { resolve } = require('path');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    resolve(__dirname, '../../.eslintrc.cjs'),
    'plugin:vue/base',
    'plugin:vue/vue3-recommended'
  ],
  plugins: [
    'eslint-plugin-vue'
  ],
  parserOptions: {
    project: resolve(__dirname, 'tsconfig.json'),
    extraFileExtensions: ['.vue']
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: resolve(__dirname, 'tsconfig.json')
      }
    }
  },
  rules: {
    'vue/no-v-html': ['off'],
    'vue/multi-word-component-names': ['off'],
    'vue/html-indent': ['error', 'tab'],
    'vue/no-useless-v-bind': ['error', {
      ignoreIncludesComment: true,
      ignoreStringEscape: true
    }],
    'vue/no-v-text-v-html-on-component': [
      'error',
      {
        allow: ['router-link', 'nuxt-link']
      }
    ]
  }
};
