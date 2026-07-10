'use client'

import { Section } from '@/components/section'
import { AnimatedText } from '@/components/text-effect'
import { Box, Button, Container, Divider, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { GridItemStyle } from '@/components/grid-item'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 }
}

export default function NotFound() {
  const props = {
    align: 'center'
  }
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
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h1" mb={3}>
              Not Found!
            </Heading>
            <AnimatedText text="The page you are looking for was not found." />
            <Divider my={6} />
            <Section delay="0.5">
              <Box my={6} {...props}>
                <Button as={NextLink} href="/" colorScheme="teal">
                  Return to Home
                </Button>
              </Box>
            </Section>
          </Box>
        </Box>
      </Container>
      <GridItemStyle />
    </motion.article>
  )
}
