/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/newline-after-import */
/* eslint @stylistic/indent: ['error', 2] */

import javascript from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
// @ts-expect-error missing definitions
import pluginImport from 'eslint-plugin-import';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
// @ts-expect-error missing definitions
import pluginSortExports from 'eslint-plugin-sort-exports';
import pluginTsdoc from 'eslint-plugin-tsdoc';
// @ts-expect-error missing definitions
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescript from 'typescript-eslint';
import parserVue from 'vue-eslint-parser';

/** @type {FlatConfig} */
const ignored = {
  ignores: [
    '**/dist/**',
    'build/**'
  ]
};

/** @type {FlatConfig} */
const base = {
  name: 'base',
  files: [filesUnder('')],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: { ...globals.node, ...globals.browser },
    sourceType: 'module',
    parser: /** @type {Parser} */ (typescript.parser),
    parserOptions: {
      project: 'tsconfig.json',
      ecmaFeatures: { jsx: true }
    }
  },
  plugins: {
    'eslint-plugin-tsdoc': pluginTsdoc,
    'import': pluginImport,
    'simple-import-sort': pluginSimpleImportSort,
    'sort-exports': pluginSortExports
  },
  settings: {
    'import/parsers': { espree: ['.js', '.cjs', '.mjs', '.jsx'] },
    'import/resolver': { typescript: true }
  },
  /** @type {Partial<Rules>} */
  rules: {
    // ESLint built-in

    'object-shorthand': 'error',
    'eqeqeq': 'error',

    // Typescript ESLint

    '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/restrict-plus-operands': ['error', { allowNumberAndString: true }],

    // Stylistic

    '@stylistic/quote-props': ['error', 'consistent-as-needed'],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true
      },
      overrides: {
        interface: {
          multiline: {
            delimiter: 'semi',
            requireLast: true
          }
        }
      },
      singleline: {
        delimiter: 'semi'
      }
    }],
    '@stylistic/no-extra-semi': 'error',
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/arrow-parens': ['error', 'always', { requireForBlockBody: true }],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/brace-style': ['error', '1tbs'],

    '@stylistic/no-tabs': 'off',
    '@stylistic/indent': ['error', 'tab'],
    '@stylistic/indent-binary-ops': ['off'], // should be ['error', 'tab'] but problematic for object members

    '@stylistic/newline-per-chained-call': 'off',
    '@stylistic/array-element-newline': 'off',
    '@stylistic/array-bracket-newline': ['error', 'consistent'],
    '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
    '@stylistic/function-call-argument-newline': ['error', 'consistent'],
    '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],

    '@stylistic/nonblock-statement-body-position': ['error', 'below'],
    '@stylistic/max-len': [
      'error',
      {
        code: 120,
        tabWidth: 4,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],

    // Stylistic JSX

    '@stylistic/jsx-quotes': ['error', 'prefer-single'],

    '@stylistic/jsx-indent': ['error', 'tab'],
    '@stylistic/jsx-indent-props': ['error', 'tab'],

    '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
    '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1 }],
    '@stylistic/jsx-closing-tag-location': 'error',
    '@stylistic/jsx-tag-spacing': ['error', { closingSlash: 'never', beforeSelfClosing: 'always', afterOpening: 'never', beforeClosing: 'never' }],
    '@stylistic/jsx-sort-props': ['error', { callbacksLast: true, /* "shorthandLast": false, */ reservedFirst: true, ignoreCase: true, noSortAlphabetically: true }],
    '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'none' }], // single-child
    '@stylistic/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line'
      }
    ],
    '@stylistic/jsx-pascal-case': 'error',
    '@stylistic/jsx-equals-spacing': 'error',
    '@stylistic/jsx-closing-bracket-location': ['error', { selfClosing: 'tag-aligned', nonEmpty: 'tag-aligned' }],
    '@stylistic/jsx-curly-newline': ['error', { multiline: 'consistent' }],
    '@stylistic/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

    // Import

    // 'import/no-named-as-default': 'error', broken with current version
    // 'import/no-named-as-default-member': 'error', broken with current version
    'import/no-duplicates': 'error',
    'import/first': 'error',
    'import/newline-after-import': ['error', { count: 1, exactCount: true, considerComments: true }],

    // Simple-import-sort

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Sort-exports

    'sort-exports/sort-exports': ['error', { sortDir: 'asc', pattern: '**/index.ts' }]
  }
};

const serverPath = 'app/server';

/** @type {FlatConfig} */
const server = {
  name: 'server',
  files: [filesUnder(serverPath)],
  languageOptions: {
    parserOptions: {
      project: `${serverPath}/tsconfig.json`
    }
  },
  settings: {
    'import/resolver': {
      typescript: { project: `${serverPath}/tsconfig.json` }
    }
  }
};

const uiPath = 'app/ui';

/** @type {FlatConfig} */
const ui = {
  name: 'ui',
  files: [filesUnder(uiPath)],
  languageOptions: {
    parser: parserVue,
    parserOptions: {
      parser: /** @type {Parser} */ (typescript.parser),
      project: `${uiPath}/tsconfig.json`,
      extraFileExtensions: ['.vue']
    }
  },
  plugins: {
    vue: pluginVue
  },
  settings: {
    'import/resolver': {
      typescript: { project: `${uiPath}/tsconfig.json` }
    }
  },
  /** @type {Partial<Rules>} */
  rules: {
    'vue/no-v-html': ['off'],
    'vue/multi-word-component-names': ['off'],
    'vue/html-indent': ['error', 'tab'],
    'vue/no-useless-v-bind': ['error', { ignoreIncludesComment: true, ignoreStringEscape: true }],
    'vue/no-v-text-v-html-on-component': ['error', { allow: ['router-link', 'nuxt-link'] }]
  }
};

export default [
  ignored,
  // https://github.com/eslint/eslint/blob/271e7ab1adc45a7b2f66cfea55a54e6048d9749a/packages/js/src/configs/eslint-recommended.js#L20
  javascript.configs['recommended'],
  // https://github.com/typescript-eslint/typescript-eslint/blob/f248e689b04bdfd81429977a731ba6b8ad82622e/packages/typescript-eslint/src/configs/strict-type-checked.ts#L21
  ...typescript.configs['strictTypeChecked'],
  // https://github.com/eslint-stylistic/eslint-stylistic/blob/5060350fe3ecc3acd7fae83eb45cbd4de9c06fb5/packages/eslint-plugin/configs/customize.ts#L103
  stylistic.configs['recommended-flat'],
  // https://github.com/import-js/eslint-plugin-import/blob/c0ac54b8a721c2b1c9048838acc4d6282f4fe7a7/config/recommended.js#L8
  // imports.configs['recommended'], (flat config unsupported)
  // https://github.com/vuejs/eslint-plugin-vue/blob/cfad3eecc506effaedf43cc74f231d19fc780997/lib/configs/flat/vue3-recommended.js#L9
  ...pluginVue.configs['flat/recommended'],
  base,
  server,
  ui
];

/**
 * Returns an array of glob patterns matching all files under `path`.
 * @param {string} path
 * @returns Array of glob patterns
 */
function filesUnder(path) {
  return `${path ? path + '/' : ''}**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,vue,svelte}`;
}

/**
 * @typedef {import('eslint').Linter.FlatConfigParserModule} Parser
 * ESLint Parser definition.
 * @typedef {import('eslint').ESLint.Plugin} Plugin
 * ESLint Plugin definition.
 * @typedef {{ [K in keyof import('@stylistic/eslint-plugin').RuleOptions]: import('eslint').Linter.RuleEntry<import('@stylistic/eslint-plugin').RuleOptions[K]> }} StylisticRules
 * All Stylistic rules.
 * @typedef {Record<string, import('eslint').Linter.RuleEntry> & StylisticRules} Rules
 * All available rules.
 * @typedef {import('eslint').Linter.FlatConfig} FlatConfig
 * ESLint configuration definition.
 */
