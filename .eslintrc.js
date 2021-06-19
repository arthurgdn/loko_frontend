module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'quotes': ['error', 'single'],
    'array-bracket-spacing': 'error',
    'comma-spacing': 'error',
    'computed-property-spacing': 'error',
    'indent': ['error', 2],
    'max-len': ['error', { 'code': 100 }],
    'no-multiple-empty-lines': 'error',
    'no-trailing-spaces': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': 'error',
    'space-in-parens': 'error',
    'semi-style': 'error',
    'semi': 'error',
    'operator-assignment': 'error',
    'operator-linebreak': 'error',
    'prefer-exponentiation-operator': 'error',
    'prefer-object-spread': 'error',
    'nonblock-statement-body-position': 'error',
    'key-spacing': 'error',
    'no-extra-parens': 'error',
    'object-curly-newline': ['error', {
      'ObjectExpression': { 'multiline': true, 'minProperties': 3 },
      'ObjectPattern': { 'multiline': true, 'minProperties': 3 },
      'ImportDeclaration': { 'multiline': true, 'minProperties': 3 },
      'ExportDeclaration': { 'multiline': true, 'minProperties': 3 },
    }]
  },
};