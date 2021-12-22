module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/vue',
  ],
  plugins: ['prettier'],
  rules: {
    'max-len': [
      'error',
      {
        code: 100,
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
  },
  globals: {
    $nuxt: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaFeatures: { legacyDecorators: true },
  },
};

