import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

function splitString(InputString: string) {
  const characters: string[] = []
  const regex = /[\s\S]/gu

  let match

  while ((match = regex.exec(InputString)) !== null) {
    characters.push(match[0])
  }
  return characters
}

export function RevealText({ input }: { input: string }) {
  const splitedString = splitString(input)
  return (
    <motion.div
      initial="hidden"
      whileInView="reveal"
      transition={{ staggerChildren: 0.03 }}
      viewport={{ once: true }}
    >
      {splitedString.map((char, index) => (
        <motion.span
          key={index}
          transition={{ duration: 1 }}
          variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function AnimatedText({
  text,
  once = true
}: {
  text: string
  once?: boolean
}) {
  const splitedText = splitString(text)
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5, once })
  return (
    <motion.span
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {}
      }}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      aria-hidden
    >
      {splitedText.map((char, index) => (
        <motion.span
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          key={index}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function TextLoop({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      let next = index + 1
      if (next === texts.length) {
        next = 0
      }
      setIndex(next)
    }, 3 * 1000)
  })

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        style={{ display: 'inline-block' }}
        key={index}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {texts[index]}
      </motion.span>
    </AnimatePresence>
  )
}
