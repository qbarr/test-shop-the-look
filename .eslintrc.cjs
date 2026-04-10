module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'standard'
  ],
  plugins: [
    'import',
    '@typescript-eslint'
  ],
  settings: {
    'import/core-modules': [
      'prop-types',
      'react-dom'
    ],
    'import/resolver': {
      node: {
        paths: [
          './'
        ],
        moduleDirectory: [
          './',
          'node_modules'
        ]
      }
    }
  },
  env: {
    browser: true,
    amd: true,
    es6: true,
    node: true,
    mocha: true
  },
  rules: {
    'import/no-webpack-loader-syntax': 0,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always'
      }
    ],
    'standard/no-callback-literal': 0,
    'prefer-promise-reject-errors': 0,
    'no-case-declarations': 0,
    'comma-dangle': 2,
    'no-console': 1,
    'no-alert': 1,
    'no-undef': 1,
    strict: 2,
    'one-var': 0,
    'no-extra-semi': 1,
    'no-underscore-dangle': 0,
    'no-unused-vars': 1,
    'prefer-const': 1,
    'no-unreachable': 1,
    'no-floating-decimal': 0,
    'prefer-arrow-callback': 1,
    'max-nested-callbacks': [
      2,
      {
        max: 5
      }
    ],
    'implicit-arrow-linebreak': [
      1,
      'beside'
    ],
    curly: [
      1,
      'multi-or-nest',
      'consistent'
    ],
    quotes: [
      2,
      'single'
    ],
    'max-len': [
      0,
      {
        code: 140
      }
    ],
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true
      }
    ],
    'object-curly-spacing': [
      1,
      'always'
    ],
    'array-bracket-spacing': [
      1,
      'never'
    ],
    'multiline-ternary': 'off',
    'no-trailing-spaces': [
      1,
      {
        skipBlankLines: true
      }
    ]
  }
}
