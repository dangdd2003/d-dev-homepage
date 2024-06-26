import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === `transition`
  }
})

interface SectionProps {
  children: React.ReactNode
  delay?: string
}

export function Section({ children, delay = '0.1' }: SectionProps) {
  return (
    <StyledDiv
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: '1', delay }}
      mb={6}
    >
      {children}
    </StyledDiv>
  )
}

export function SubSection({ children, delay = '0.1' }: SectionProps) {
  return (
    <StyledDiv
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: '1', delay }}
    >
      {children}
    </StyledDiv>
  )
}
