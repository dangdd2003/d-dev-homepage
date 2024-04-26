import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button
} from '@chakra-ui/react'

export default function NotFound() {
  const props = {
    align: 'center'
  }
  return (
    <Container>
      <Heading as="h1">Not Found</Heading>
      <Text>The page you are looking for was not found.</Text>
      <Divider my={6} />
      <Box my={6} {...props}>
        <Button as={NextLink} href="/" colorScheme="teal">
          Return to Home
        </Button>
      </Box>
    </Container>
  )
}
