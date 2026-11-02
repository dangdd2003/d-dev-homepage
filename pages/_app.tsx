import type { AppProps } from 'next/app'
import Layout from '@/components/layouts/main'
import Chakra from '@/components/chakra'
import { mPlusRounded1c } from '@/lib/fonts'
import { AnimatePresence, LazyMotion, MotionConfig } from 'framer-motion'

// Shared components (layouts/article, section, text-effect, theme toggle) use
// the lightweight `m` component, which renders but never animates unless a
// <LazyMotion> provider supplies the animation features. Without it, every
// element with `initial={{ opacity: 0 }}` stays invisible after hydration.
const loadFeatures = () =>
  import('@/lib/framer-features').then(res => res.default)

export default function Website({ Component, pageProps, router }: AppProps) {
  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user">
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
      </MotionConfig>
    </LazyMotion>
  )
}
