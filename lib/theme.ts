import {
  extendTheme,
  type ThemeConfig,
  StyleConfig
} from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true
}

const semanticTokens = {
  colors: {
    'body-bg': {
      default: '#f0e7db',
      _dark: '#202023'
    },
    'body-text': {
      default: '#1a202c',
      _dark: 'whiteAlpha.900'
    },
    'glass-bg': {
      default: 'whiteAlpha.500',
      _dark: 'whiteAlpha.200'
    },
    'link-color': {
      default: '#3d7aed',
      _dark: '#ff63c3'
    },
    'navbar-bg': {
      default: '#ffffff40',
      _dark: '#20202380'
    },
    'header-text': {
      default: 'gray.800',
      _dark: 'whiteAlpha.900'
    }
  }
}

const styles = {
  global: {
    body: {
      bg: 'body-bg',
      color: 'body-text'
    }
  }
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
      },
      'page-title': {
        fontSize: 25,
        marginTop: 3,
        marginBottom: 5
      }
    }
  },
  Link: {
    baseStyle: {
      color: 'link-color',
      textUnderlineOffset: 3
    }
  }
}

const fonts = {
  heading: "'M PLUS Rounded 1c'"
}

const colors = {
  grassTeal: `#88ccca`
}

const theme = extendTheme({
  config,
  components,
  fonts,
  colors,
  styles,
  semanticTokens
})

export default theme
