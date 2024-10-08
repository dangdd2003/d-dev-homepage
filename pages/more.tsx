import {
  Box,
  Button,
  Container,
  Heading,
  ListItem,
  UnorderedList
} from '@chakra-ui/react'
import Link from 'next/link'
import { SiGmail } from 'react-icons/si'
import Layout from '@/components/layouts/article'
import { Section, SubSection } from '@/components/section'
import P, { Paragraph } from '@/components/paragraph'
import { AnimatedText } from '@/components/text-effect'

export default function More() {
  const props = {
    align: 'center'
  }
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
            Working with number is my cup of tea. I really like natural sciences
            especially Math, Physics, and Chemistry ( But not that good to get
            any achievements:) ). It is just very interesting and enjoyable to
            answer the question &quot;why it is?&quot;. I really like to discuss
            with others about common natural phenomena.
          </P>
          <P>
            I started programming when i was in high school. I learned C++ as my
            first programming language. At that time, i only learned how to
            solve some basic algorithms. Not like right now, not only solution,
            but also optimization - the hardest part :)
          </P>
        </Section>
        <Section delay="0.5">
          <Heading as="h3" variant="section-title">
            <AnimatedText text="My skill" />
          </Heading>
          <SubSection delay="0.3">
            <Heading as="h4" fontSize={16} my={2}>
              Programming
            </Heading>
            <P>
              My study focuses on Mathematical problems in AI, Machine Learning,
              and Signal/Image Processing stuffs. I also learn and read lots of
              document about Distributed System and spend my free time on
              practicing deploying works with some CI/CD tools. Sometimes, i
              also do some math for 3D modelling or animated visualization.
            </P>
            <Box ml={3} my={3}>
              <UnorderedList>
                <ListItem>
                  AI/ML and Signal/Image stuffs: Python (Mostly)
                </ListItem>
                <ListItem>Computer Grahics, Algorithm: C/C++</ListItem>
                <ListItem>WebApp: Java, Typescript</ListItem>
                <ListItem>Database/SQL: MySQL/MariaDB, PostGresSQL</ListItem>
                <ListItem>Script: Bash</ListItem>
              </UnorderedList>
            </Box>
            <P>
              I also have err... &quot;just enough to use&quot; experience with
              some frameworks.
            </P>
            <Box ml={3} my={3}>
              <UnorderedList>
                <ListItem>
                  Computer Science: Scikit Learn, Tensor Flow, Keras, Pytorch,
                  OpenCV
                </ListItem>
                <ListItem>
                  WebApp Development: SpringBoot, Quarkus, React Native,
                  Next.Js, Three.Js
                </ListItem>
                <ListItem>Query Language: Hibernate ORM, JPA, Mysql</ListItem>
              </UnorderedList>
            </Box>
          </SubSection>
          <SubSection delay="0.5">
            <Heading as="h4" fontSize={16} my={2}>
              Operating System
            </Heading>
            <P>
              I use Linux as my main Operating System for most of my work. I
              started using Fedora when I was in high school. And now, I use
              Arch Linux &quot;by the way&quot;.
            </P>
            <P>
              I use Windows only for playing games ..... And one more thing ....
              Visual Studio only supports Windows so ...
            </P>
          </SubSection>
          <SubSection delay="0.7">
            <Heading as="h4" fontSize={16} my={2}>
              Others
            </Heading>
            <Box ml={3} my={3}>
              <UnorderedList>
                <ListItem>Git, Docker, JWT, CI/CD</ListItem>
                <ListItem>
                  Microservice, Networking, System Administration
                </ListItem>
              </UnorderedList>
            </Box>
          </SubSection>
        </Section>
        <Section delay="0.7">
          <Heading as="h3" variant="section-title">
            <AnimatedText text="Free time only for studying???" />
          </Heading>
          <P>
            I am not that crazy for only studying even in the free time. I play
            some animated games such as Genshin Impact or Honkai Star Rail (just
            say wjbu stuffs lol). I usually read books, mangas, or daily tech
            newspapers whenever the phone is on my hand. I also played FPS games
            CS2 (Counter Strike 2) on Steam and Valorant (but very rarely right
            now). Terarria and Oxygen Not Included are 2 adventure, survival
            &quot;offline&quot; games that I really spent time on playing. Let
            make friend and we can play together!
          </P>
          <Box {...props} my={4}>
            <Button
              as={Link}
              href="mailto:d-gamin@dangdd.me"
              scroll={false}
              leftIcon={<SiGmail />}
              colorScheme="teal"
              width={300}
              target="_blank"
            >
              d-gaming@dangdd.me
            </Button>
          </Box>
        </Section>
        <Section delay="0.9">
          <Heading as="h3" variant="section-title">
            <AnimatedText text="The Earth? ..." />
          </Heading>
          <Paragraph>
            Why The Earth? ... It is just where we are leaving:D. I just came up
            with the idea of adding the earth to the page when trying to
            decorate it.
          </Paragraph>
        </Section>
      </Container>
    </Layout>
  )
}

export { getServerSideProps } from '@/components/chakra'
