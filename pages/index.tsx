import NextLink from 'next/link'
import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  Link,
  Button
} from '@chakra-ui/react'
import Layout from '@/components/layouts/article'
import Image from 'next/image'
import { Section } from '@/components/section'
import { BioSection, BioYear } from '@/components/bio'
import P from '@/components/paragraph'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { RevealText, AnimatedText, TextLoop } from '@/components/text-effect'

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
          {/*Profile Image*/}
          {/* <Box */}
          {/*   flexShrink={0} */}
          {/*   mt={{ base: 4, md: 0 }} */}
          {/*   ml={{ md: 6 }} */}
          {/*   textAlign="center" */}
          {/* > */}
          {/*   <Box */}
          {/*     borderColor="whiteAlpha.800" */}
          {/*     borderWidth={2} */}
          {/*     borderStyle="solid" */}
          {/*     w="100px" */}
          {/*     h="100px" */}
          {/*     display="inline-block" */}
          {/*     borderRadius="full" */}
          {/*     overflow="hidden" */}
          {/*   > */}
          {/*     <Image */}
          {/*       src="/avatars/shiba2.png" */}
          {/*       alt="Profile image" */}
          {/*       width="100" */}
          {/*       height="100" */}
          {/*     /> */}
          {/*   </Box> */}
          {/* </Box> */}
        </Box>
        <Section delay="0.3">
          <Heading as="h3" variant="section-title">
            <AnimatedText text="Who am I" />
          </Heading>
          <P>
            {/*May be add some animation for "Xin chao, Hello, Bonjour"*/}
            <TextLoop texts={['Hello', 'Xin Chào', 'Bonjour']} /> from a
            student! My name is Dang. I&apos;m currently a third year student
            studying Computer Science in{' '}
            <Link target="_blank" href="https://usth.edu.vn/">
              University of Science and Technology of Hanoi - USTH
            </Link>
            . I spend most of my time on researching and studying about Machine
            Learning stuff. During my free time, I usually learn other engineer
            fields like DevOps and Distributed System or 3D Modelling in
            Computer Graphics. I also learn French as my 3rd language. My dream
            carrier path is to become a Machine Learning Engineer. Imagine that,
            when everything is automated ...
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
            <BioYear>Now</BioYear>
            Internship as Researcher at ICT Lab - USTH
          </BioSection>
        </Section>

        <Section delay="0.7">
          <Heading as="h3" variant="section-title">
            {/* I ♥ */}
            <AnimatedText text="I ♥" />
          </Heading>
          <P>
            Music, Piano (but haven&apos;t known how to play yet :(( ), Reading,
            Machine Learning, Computer Vision, 3D Modelling
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
