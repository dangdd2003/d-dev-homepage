import { Container, Heading } from '@chakra-ui/react'
import Layout from '@/components/layouts/article'
import Paragraph from '@/components/paragraph'

export default function Post() {
  return (
    <Layout title="Articles">
      <Container>
        <Heading as="h3" variant="page-title">
          My Articles
        </Heading>
        <Paragraph>(Still writing :D)</Paragraph>
      </Container>
    </Layout>
  )
}

export { getServerSideProps } from '@/components/chakra'
