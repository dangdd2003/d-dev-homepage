import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager
} from '@chakra-ui/react'
import theme from '@/lib/theme'

export default function Chakra({
  cookies,
  children
}: {
  cookies: string
  children?: React.ReactNode
}) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  )
}

export function getServerSideProps({ req }: { req: any }) {
  const host =
    (req.headers['x-forwarded-host'] as string) ||
    (req.headers.host as string) ||
    'dangdd.tech'
  const protocol =
    (req.headers['x-forwarded-proto'] as string) || 'https'
  return {
    props: {
      cookies: req.headers.cookie ?? '',
      baseUrl: `${protocol}://${host}`
    }
  }
}
