import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '@/components/layouts/artical'
import Section from '@/components/section'

export default function Post() {
  return (
    <Layout title="Posts">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          My Posts
        </Heading>
      </Container>
    </Layout>
  )
}

export { getServerSideProps } from '@/components/chakra'
