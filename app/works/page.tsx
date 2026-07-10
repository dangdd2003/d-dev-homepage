'use client'

import { Container, Heading } from '@chakra-ui/react'
import Paragraph from '@/components/paragraph'
import { motion } from 'framer-motion'
import { GridItemStyle } from '@/components/grid-item'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 }
}

export default function Work() {
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <Container>
        <Heading as="h2" variant="page-title">
          Works
        </Heading>
        <Paragraph>(Still uploading :D)</Paragraph>
      </Container>
      <GridItemStyle />
    </motion.article>
  )
}
