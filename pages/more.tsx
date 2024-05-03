import {
  Box,
  Container,
  Heading,
  ListItem,
  UnorderedList
} from '@chakra-ui/react'
import Layout from '@/components/layouts/article'
import { Section, SubSection } from '@/components/section'
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
              My study focus on Machine Learning and Image Processing so I use
              Python as the main programming language. I also use C/C++ for
              Distribution System, and working with Computer Graphics.
            </P>
            <Box ml={3} my={3}>
              <UnorderedList>
                <ListItem>
                  Machine Learning and Image stuffs: Python (Mostly)
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
                  Computer Science: Scikit Learn, Tensor Flow, Keras, Pytorch
                </ListItem>
                <ListItem>
                  WebApp Development: SpringBoot, Quarkus, React, Next.Js,
                  Chakra UI, Framer Motion, Three.Js
                </ListItem>
                <ListItem>Query Language: Hibernate ORM, JPA</ListItem>
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
            <UnorderedList>
              <ListItem>Git, Docker, JWT</ListItem>
              <ListItem>
                Microservice, Signal Processing, Deep Learning, Network
              </ListItem>
            </UnorderedList>
          </SubSection>
        </Section>
        <Section delay="0.7">
          <Heading as="h3" variant="section-title">
            <AnimatedText text="Free time only for studying???" />
          </Heading>
          <P>
            I am not that crazy for only studying even in the free time. I also
            play some animated games such as Genshin Impact or Honkai Star Rail.
            I usually read books, mangas, or daily tech newspapers. Another game
            that I played ( but very rarely right now ) is FPS games CS2 (
            Counter Strike 2 ) on Steam. Terarria and Oxygen Not Included are 2
            adventure, survival &quot;offline&quot; games that I really spent
            time on playing. Let make friend and we can play together!
          </P>
        </Section>
        <Section delay="0.9">
          <Heading as="h3" variant="section-title">
            <AnimatedText text="The Earth and ... Solar System" />
          </Heading>
          <Paragraph>
            Recently, I&apos;m trying to implement the solar system. Mostly, I
            just map the textures to the meshes so it is not too hard. However,
            calculating the orbits, rotations, positions of each planet for the
            whole system takes lots of my time. I will bring it to my website
            soon ... And one more thing ..... The Earth is just basic texture
            mapping and it looks ... not to clear and bright. I&apos;m still
            finding the best mapping so that the Earth might look better. Why
            Earth? ... It is just where we are leaving!
          </Paragraph>
        </Section>
      </Container>
    </Layout>
  )
}

export { getServerSideProps } from '@/components/chakra'
