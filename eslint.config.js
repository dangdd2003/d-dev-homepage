import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    rulse: {
      'no-unsued-vars': 'warn',
      'no-undef': 'warn'
    }
  }
]
