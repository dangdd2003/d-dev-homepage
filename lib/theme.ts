import {
  extendTheme,
  type ThemeConfig,
  StyleConfig,
  type StyleFunctionProps
} from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true
}

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode('#f0e7db', '#202023')(props)
    }
  })
}

const components: Record<string, StyleConfig> = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: (props: StyleFunctionProps) => ({
      color: mode('#3d7aed', '#ff63c3')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'M PLUS Rounded 1c'"
}

const colors = {
  grassTeal: `#88ccca`
}

const theme = extendTheme({ config, components, fonts, colors, styles })

export default theme
