

// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  plugins: ['svelte3'],
  extends: [
    'airbnb-base'
  ],
  overrides: [
    {
      files: '*.svelte',
      processor: 'svelte3/svelte3'
    }
  ],
  'rules': {
    'no-console': 'error',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-alert': 'off',
    'arrow-body-style': 'off',
    'global-require': 'off',
    'flowtype-errors/show-errors': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'error',
    'arrow-parens': 'off',
    'operator-linebreak': 'off',
    'no-debugger': 'error',
    'no-confusing-arrow': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    // the following rules are not explicitly specific to svelte, but leaving them on causes problems with how svelte works.
    'import/no-mutable-exports': 'off',
    'import/first': 'off',
    'import/prefer-default-export': 'off',
    'prefer-object-spread': 'off',
    'no-restricted-globals': 'warn',
    'no-return-assign': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
