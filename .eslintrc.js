module.exports = {
  env: {
    browser: true,
    // commonjs: true,
    // es6: true,
    jquery: true
  },
  extends: [
    'standard'
    // '@cybozu/eslint-config',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    // 'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'jquery'],
  parser: '@typescript-eslint/parser',
  globals: {
  },
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    semi: ['error', 'always'],
    'semi-spacing': [
      'error',
      {
        after: true,
        before: false
      }
    ],
    'semi-style': ['error', 'last'],
    // 'prettier/prettier': ['error', { singleQuote: true, semi: true }],
    'no-extra-semi': 'error',
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'space-before-function-paren': 0,
    'eol-last': 0,
    indent: ['error', 2, { SwitchCase: 1 }]
  }
};
