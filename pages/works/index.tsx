import { Container, Heading } from '@chakra-ui/react'
import Layout from '@/components/layouts/article'
import Paragraph from '@/components/paragraph'

export default function Work() {
  return (
    <Layout title="Works">
      <Container>
        <Heading as="h2" variant="page-title">
          Works
        </Heading>
        <Paragraph>(Still uploading :D)</Paragraph>
      </Container>
    </Layout>
  )
}

export { getServerSideProps } from '@/components/chakra'
