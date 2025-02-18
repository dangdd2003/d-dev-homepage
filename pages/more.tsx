import Layout from '@/components/layouts/article'
import P, { Paragraph } from '@/components/paragraph'
import { Section, SubSection } from '@/components/section'
import { AnimatedText } from '@/components/text-effect'
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
            any achievements &#128579;). It is just very interesting and
            enjoyable to answer the question &quot;why it is?&quot;. I really
            like to discuss with others about common natural phenomena.
          </P>
          <P>
            I started programming when i was in high school. I learned C++ as my
            first programming language. At that time, i only learned how to
            solve some basic algorithms. Not like right now, not only the
            solution, but also the optimization - definitely the hardest part :)
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
              document about computer system, CI/CD workflows, system
              optimization. Sometimes, i do some math for 3D modelling or
              animated visualization. It is really fun to do that.
            </P>
            <Box ml={3} my={3}>
              <UnorderedList>
                <ListItem>
                  Computer science stuffs: Python (mostly), and ... Matlab
                  (rarely, only for advanced calculation)
                </ListItem>
                <ListItem>Computer Graphics, Algorithms: C/C++</ListItem>
                <ListItem>
                  WebApp: Java, Typescript (not JavaScript, sorry, i don&apos;t
                  like NON typed language!!!)
                </ListItem>
                <ListItem>Database/SQL: MySQL/MariaDB, PostGresSQL</ListItem>
                <ListItem>
                  Scripting with bash and zsh, advanced system configuration
                </ListItem>
              </UnorderedList>
            </Box>
            <P>
              I also have err... &quot;just enough to use&quot; experience with
              some frameworks, libraries, tools.
            </P>
            <Box ml={3} my={3}>
              <UnorderedList>
                <ListItem>
                  Computer Science: Scikit Learn, Tensor Flow, Keras, Pytorch,
                  OpenCV
                </ListItem>
                <ListItem>
                  Development/Engineer: SpringBoot, Quarkus, React Native,
                  Next.Js, Three.Js, Hibernate ORM, JPA
                </ListItem>
                <ListItem>
                  Deployment/Adminstration: Docker, Git, Github Action, Travis
                  CI, Jenkins, Nginx, Traefik, Prometheus, Grafana, Networking
                </ListItem>
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
              Arch Linux &quot;by the way&quot;. I could say, I am a
              &apos;sub-advanced&apos; Linux user! &#128541;
            </P>
            <P>
              I use Windows only for ... playing games ... and ... MS Visual
              Studio, which only supports Windows due to its operation based on
              DDL so ... &#129301;
            </P>
          </SubSection>
          <SubSection delay="0.7">
            <Heading as="h4" fontSize={16} my={2}>
              Others
            </Heading>
            <Box ml={3} my={3}>
              <UnorderedList>
                <ListItem>JWT, REST Api, GCP, AWS, MS Azure</ListItem>
                <ListItem>Microservice, Distributed system</ListItem>
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
            some &quot;wjbu&quot; games such as Genshin Impact or Honkai Star
            Rail. I usually read books, mangas, or daily tech newspapers
            whenever the phone is on my hand. I also played FPS games CS2
            (Counter Strike 2) on Steam and Valorant (but very rarely right
            now). Terarria and Oxygen Not Included are 2 adventure, survival
            &quot;offline&quot; games that I really spent time on playing. Let
            make friend and we can play together!
          </P>
          <Box {...props} my={4}>
            <Button
              as={Link}
              href="mailto:3dbrogaming2003@gmail.com"
              scroll={false}
              leftIcon={<SiGmail />}
              colorScheme="teal"
              width={300}
              target="_blank"
            >
              3dbrogaming2003@gmail.com
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
