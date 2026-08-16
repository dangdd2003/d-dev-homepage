import { m, useInView, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

function splitString(inputString: string): string[] {
  return Array.from(inputString)
}

export interface RevealTextProps {
  input: string
}

export function RevealText({ input }: RevealTextProps) {
  const characters = splitString(input)
  return (
    <m.div
      initial="hidden"
      whileInView="reveal"
      transition={{ staggerChildren: 0.03 }}
      viewport={{ once: true }}
    >
      {characters.map((char, index) => (
        <m.span
          key={index}
          transition={{ duration: 1 }}
          variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
        >
          {char}
        </m.span>
      ))}
    </m.div>
  )
}

export interface AnimatedTextProps {
  text: string
  once?: boolean
}

export function AnimatedText({ text, once = true }: AnimatedTextProps) {
  const characters = splitString(text)
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { amount: 0.5, once })
  return (
    <m.span
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {}
      }}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      aria-hidden
    >
      {characters.map((char, index) => (
        <m.span
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          key={index}
          className="inline-block"
        >
          {char}
        </m.span>
      ))}
    </m.span>
  )
}

export interface TextLoopProps<T extends readonly string[]> {
  texts: T
  intervalMs?: number
}

export function TextLoop<const T extends readonly string[]>({
  texts,
  intervalMs = 3000
}: TextLoopProps<T>) {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    if (texts.length === 0) return

    const timeout = setTimeout(() => {
      setIndex(prev => (prev + 1) % texts.length)
    }, intervalMs)

    return () => clearTimeout(timeout)
  }, [index, texts.length, intervalMs])

  const currentText = texts[index]
  if (!currentText) return null

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.span
        style={{ display: 'inline-block' }}
        key={index}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentText}
      </m.span>
    </AnimatePresence>
  )
}
