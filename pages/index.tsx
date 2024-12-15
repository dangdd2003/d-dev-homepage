import { BioSection, BioYear } from '@/components/bio'
import Layout from '@/components/layouts/article'
import P from '@/components/paragraph'
import { Section } from '@/components/section'
import { AnimatedText, RevealText, TextLoop } from '@/components/text-effect'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

export default function Home() {
  const about = "Hello, I'm a 3rd year IT Student in USTH - Hanoi, Vietnam!"
  const props = {
    align: 'center'
  }
  return (
    <Layout>
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
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
            <p>
              Bachelor in Information and Comunication Technology ( Student /
              Researcher / Developer)
            </p>
          </Box>
          {/* Profile Image */}
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
                width={0}
                height={0}
                sizes="100vw"
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
            {/*May be add some animation for "Xin chao, Hello, Bonjour"*/}
            <TextLoop texts={['Hello', 'Xin Chào', 'Bonjour']} /> from a
            student! &#129299; My name is Dang. I&apos;m a graduated Computer
            Science student from{' '}
            <Link target="_blank" href="https://usth.edu.vn/">
              University of Science and Technology Hanoi - USTH
            </Link>
            . I spend most of my time on researching and studying about AI and
            Machine Learning stuffs (mostly about image, and LLM). I also focus
            on System Admin, DevOps and Computer Graphics when I cannot come up
            with what to do next. I learn French as my 3rd language. Ussually,
            30 minutes to one hour every morning to learn French is enough for
            me. Becoming an AI Engineer is what I dream of when I started
            studying in this field. Just think about your home in the future,
            when you step into your house, the light, the music, ... turn on
            automatically. With only your voice, your hand action, the house
            operates normally while you are just sitting on sofa. Is it
            convenient and time saving, isn&apos;t it ? &#128522;
          </P>
          <Box {...props} my={4}>
            <Button
              as={NextLink}
              href="/more"
              scroll={false}
              rightIcon={<ChevronRightIcon />}
              colorScheme="teal"
            >
              {/* My Portfolio */}
              More About Me
            </Button>
          </Box>
        </Section>

        <Section delay="0.5">
          <Heading as="h3" variant="section-title">
            {/* Bio */}
            <AnimatedText text="Biography" />
          </Heading>
          <BioSection>
            <BioYear>2003</BioYear>
            Born in Hanoi, Vietnam
          </BioSection>
          <BioSection>
            <BioYear>2021</BioYear>
            Started studying at University of Science and Technology of Hanoi -
            USTH
          </BioSection>
          <BioSection>
            <BioYear>2023</BioYear>
            Internship as Backend Dev at FPT IS - Information System
          </BioSection>
          <BioSection>
            <BioYear>2024</BioYear>
            Internship as Researcher at ICT Lab - USTH
          </BioSection>
        </Section>

        <Section delay="0.7">
          <Heading as="h3" variant="section-title">
            {/* I ♥ */}
            <AnimatedText text="I ♥" />
          </Heading>
          <P>
            Music, Piano (but haven&apos;t known how to play yet &#128533; ),
            Reading, Computer Vision.
          </P>
        </Section>

        <Section delay="0.9">
          <Heading as="h3" variant="section-title">
            {/* Connect to me */}
            <AnimatedText text="Connect to me" />
          </Heading>
          <Box {...props} my={4}>
            <Button
              as={NextLink}
              href="/connect"
              scroll={false}
              rightIcon={<ChevronRightIcon />}
              colorScheme="teal"
            >
              My Bio Links
            </Button>
          </Box>
        </Section>
      </Container>
    </Layout>
  )
}

export { getServerSideProps } from '@/components/chakra'
