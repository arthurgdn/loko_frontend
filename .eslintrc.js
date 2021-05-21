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
        'quotes': ['error', 'single'],
        'array-bracket-spacing': 'error',
        'comma-spacing': 'error',
        'computed-property-spacing': 'error',
        'indent': 'error',
        'max-len': ['error', { 'code': 100 }],
        'no-multiple-empty-lines': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-newline': 'error',
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

    },
};