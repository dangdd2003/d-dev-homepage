import { Container, Box, Heading, Button } from '@chakra-ui/react'
import Layout from '@/components/layouts/article'
import Link from 'next/link'
import { SiGmail } from 'react-icons/si'
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io'
import { Section } from '@/components/section'

export default function Connection() {
  const props = {
    align: 'center'
  }
  return (
    <Layout title="Connect">
      <Container>
        <Heading as="h2" variant="page-title">
          Connect to me through
        </Heading>
        <Box {...props} my={5}>
          <Section delay="0.3">
            <Button
              as={Link}
              href="mailto:d-dev@dangdd.me"
              scroll={false}
              leftIcon={<SiGmail />}
              colorScheme="teal"
              width={300}
              target="_blank"
            >
              d-dev@dangdd.me
            </Button>
          </Section>
          <Section delay="0.5">
            <Button
              as={Link}
              href="https://github.com/dangdd2003"
              scroll={false}
              leftIcon={<IoLogoGithub />}
              colorScheme="teal"
              width={300}
              target="_blank"
            >
              @dangdd2003
            </Button>
          </Section>
          <Section delay="0.7">
            <Button
              as={Link}
              href="https://www.linkedin.com/in/dangdd2003"
              scroll={false}
              leftIcon={<IoLogoLinkedin />}
              colorScheme="teal"
              width={300}
              target="_blank"
            >
              Doan Dinh Dang
            </Button>
          </Section>
        </Box>
      </Container>
    </Layout>
  )
}

export { getServerSideProps } from '@/components/chakra'
