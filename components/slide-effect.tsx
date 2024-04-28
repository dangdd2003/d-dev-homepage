import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
export function Slide() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds: number) => seconds + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0 }}
        className="name"
        style={{ fontSize: 100 }}
        key={seconds}
      >
        {seconds}
      </motion.div>
    </AnimatePresence>
  )
}
