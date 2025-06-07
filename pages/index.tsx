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
  const about = 'Hello, I\'m a simple "IT" guy based in Hanoi, Vietnam!'
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
            <p>(Đoàn Đình Đăng)</p>
            <p>
              A graduated Computer Science student, System Administrator,
              Engineer, and Researcher.
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
            <TextLoop texts={['Hello', 'Xin Chào', 'Bonjour']} /> from a
            student! &#129299; My name is Dang. I&apos;m a graduated Computer
            Science student from{' '}
            <Link target="_blank" href="https://usth.edu.vn/">
              University of Science and Technology Hanoi - USTH
            </Link>
            . I spend most of my time on researching and studying about AI and
            Machine Learning stuffs (mostly about image, and LLM). I also focus
            on DevOps, System Admin as the second carrier path. I spend 30
            minutes to 1 hour on learning French as my 3rd language in every
            morning. In my free time, I sometimes learn to 3D modelling in
            Computer Graphics. Becoming an AI Engineer is what I dream of when I
            started studying in this field. Just think about our future home,
            when we step into our house, the light, the music, etc... turn on
            automatically. With only our voice, our hand action, the house
            operates like magic while we are just sitting on sofa. Is it really
            convenient, time-saving, and &quot;funny&quot;, isn&apos;t it ?
            &#128522;
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
            Internship as Researcher at ICT Lab - USTH, Graduated from USTH
          </BioSection>
          <BioSection>
            <BioYear>Now</BioYear>
            System Administrator at MobiFone Corporation
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
