import { Box } from '@chakra-ui/react'

export default function Footer() {
  const props = {
    align: 'center'
  }
  return (
    <Box opacity={0.4} fontSize="sm" {...props}>
      &copy; {new Date().getFullYear()} Doan Dinh Dang with ♥
    </Box>
  )
}
