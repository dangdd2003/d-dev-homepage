import { Container, Heading } from '@chakra-ui/react'
import Layout from '@/components/layouts/artical'

export default function Work() {
  return (
    <Layout title="Works">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Works
        </Heading>
      </Container>
    </Layout>
  )
}

export { getServerSideProps } from '@/components/chakra'
