import Layout from '@/components/layouts/article'
import { Section } from '@/components/section'
import { AnimatedText } from '@/components/text-effect'
import { Box, Button, Container, Divider, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function NotFound() {
  const props = {
    align: 'center'
  }
  return (
    <Layout title="Not Found">
      <Container>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h1" mb={3}>
              Not Found!
            </Heading>
            <AnimatedText text="The page you are looking for was not found." />
            <Divider my={6} />
            <Section delay="2">
              <Box my={6} {...props}>
                <Button as={NextLink} href="/" colorScheme="teal">
                  Return to Home
                </Button>
              </Box>
            </Section>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}
