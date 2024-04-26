import type { AppProps } from 'next/app'
import Layout from '@/components/layouts/main'
import Chakra from '@/components/chakra'
import Fonts from '@/components/fonts'
import { AnimatePresence } from 'framer-motion'

export default function Website({ Component, pageProps, router }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence
          mode="wait"
          initial={true}
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0 })
            }
          }}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </Chakra>
  )
}
