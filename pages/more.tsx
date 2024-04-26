import { Box, Container, Heading } from '@chakra-ui/react'
import Layout from '@/components/layouts/article'
import Section from '@/components/section'
import P, { Paragraph } from '@/components/paragraph'
import { AnimatedText } from '@/components/text-effect'

export default function More() {
  return (
    <Layout title="More">
      <Container>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              More about me
            </Heading>
          </Box>
        </Box>
        <Section delay="0.3">
          <Heading as="h3" variant="section-title">
            <AnimatedText text="Why I choose Computer Science" />
          </Heading>
          <P>
            Working with number is just my cup of tea. I really like natural
            sciences especially Math, Physics, and Chemistry ( But not that good
            to get any achievement:) ) It is just very funny to answer the
            question &quot;why it is?&quot; in the nature in our daily life. I
            started programming when i was in high school. I learned C++ as my
            first programming language. At that time, i only learned how to
            solve some basic algorithms. Not like right now, not only solution,
            but also optimization - the hardest part :)
          </P>
        </Section>
        <Section delay="0.5">
          <Heading as="h3" variant="section-title">
            <AnimatedText text="Free Time" />
          </Heading>
          <P>
            I don&apos;t always study in the free time. I also play some
            animated games such as Genshin Impact or Honkai Star Rail. I usually
            read books, mangas, or daily tech newspapers. Another game that I
            played ( but very rarely ) FPS games CS2 ( Counter Strike 2 ) on
            Steam. Let make friend and we can play together! Terarria and Oxygen
            Not Included are 2 survival &quot;offline&quot; games that I really
            spent time on playing.
          </P>
        </Section>
        <Section delay="0.7">
          <Heading as="h3" variant="section-title">
            <AnimatedText text="Solar System..." />
          </Heading>
          <Paragraph>
            Recently, I&apos;m trying to implement the solar system using OpenGL
            in C++. I will bring it to my own website using WebGL ( an API for
            3D Graphics on WebSite ) and Three.Js ( 3D Graphics Library for
            WebSite ) soon.
          </Paragraph>
        </Section>
      </Container>
    </Layout>
  )
}

export { getServerSideProps } from '@/components/chakra'
