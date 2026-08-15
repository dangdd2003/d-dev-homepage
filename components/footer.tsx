import { Box } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box opacity={0.4} fontSize="sm" textAlign="center">
      &copy; {new Date().getFullYear()} Doan Dinh Dang with ♥
    </Box>
  )
}
