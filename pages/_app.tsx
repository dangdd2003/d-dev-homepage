import type { AppProps } from 'next/app'
import Layout from '@/components/layouts/main'
import Chakra from '@/components/chakra'
import { mPlusRounded1c } from '@/lib/fonts'
import { AnimatePresence } from 'framer-motion'

export default function Website({ Component, pageProps, router }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <div className={mPlusRounded1c.variable}>
        <Layout router={router} baseUrl={pageProps.baseUrl}>
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
      </div>
    </Chakra>
  )
}
