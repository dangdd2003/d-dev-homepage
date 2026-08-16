'use client'

import P from '@/components/paragraph'
import { Section } from '@/components/section'
import { AnimatedText, RevealText, TextLoop } from '@/components/text-effect'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Heading, Link } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { m } from 'framer-motion'
import { GridItemStyle } from '@/components/grid-item'
import dynamic from 'next/dynamic'

const HomeBelowFold = dynamic(() => import('@/components/home-below-fold'))

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 }
}

export default function Home() {
  const about = 'Hello, I\'m a simple "IT" guy based in Hanoi, Vietnam!'
  const props = {
    align: 'center'
  }
  return (
    <m.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <Container>
        <Box
          borderRadius="lg"
          bg="glass-bg"
          p={3}
          mb={6}
          textAlign="center"
          css={{ backdropFilter: 'blur(10px)' }}
        >
          <RevealText input={about} />
        </Box>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2">
              <AnimatedText text="Doan Dinh Dang" once={false} />
            </Heading>
            <p>(Đoàn Đình Đăng)</p>
            <p>
              A graduated Computer Science student, System Administrator,
              Engineer, and Researcher.
            </p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              w="100px"
              h="100px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <Image
                src="/avatars/avatar.jpg"
                alt="Profile image"
                width={100}
                height={100}
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQEG/8QAIRAAAQMDBAMAAAAAAAAAAAAAAQACEQMEBRUiMVIzQZH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EABoRAAICAwAAAAAAAAAAAAAAAAECABEEEyH/2gAMAwEAAhEDEQA/AEDUwmSvK9Oi2bhnln0rpOO6CxWAJF5dGTJ5PaUL3ydzvqJtrlS4mAHWyZ//2Q=="
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          </Box>
        </Box>
        <Section delay="0.3">
          <Heading as="h3" variant="section-title">
            <AnimatedText text="Who am I" />
          </Heading>
          <P>
            <TextLoop texts={['Hello', 'Xin Chào', 'Bonjour']} /> from a
            student! &#129299; My name is Dang. I&apos;m a graduated Computer
            Science student from{' '}
            <Link isExternal href="https://usth.edu.vn/">
              University of Science and Technology Hanoi - USTH
            </Link>
            . I spend most of my time researching and studying AI and Machine
            Learning (mostly about Computer Vision and LLMs). I also focus on
            DevOps and System Administration as my second career path. I spend
            30 minutes to 1 hour learning French as my 3rd language every
            morning. In my free time, I sometimes learn 3D modelling in Computer
            Graphics. Becoming an AI Engineer is what I dream of when I started
            studying in this field. Just think about our future home: when we
            step into our house, the lights, the music, etc. turn on
            automatically. With only our voice or hand gestures, the house
            operates like magic while we are just sitting on the sofa.
            Isn&apos;t that really convenient, time-saving, and fun? &#128522;
          </P>
          <Box {...props} my={4}>
            <Button
              as={NextLink}
              href="/more"
              scroll={false}
              rightIcon={<ChevronRightIcon />}
              colorScheme="teal"
            >
              More About Me
            </Button>
          </Box>
        </Section>

        <HomeBelowFold />
      </Container>
      <GridItemStyle />
    </m.article>
  )
}
