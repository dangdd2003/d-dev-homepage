import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'build/**',
      'dist/**',
      'next-env.d.ts'
    ]
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript']
  })
]

export default config
