import NextLink from 'next/link'
import { Heading, Box, Image, Link, Badge } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export interface TitleProps {
  children?: React.ReactNode
}

export function Title({ children }: TitleProps) {
  return (
    <Box>
      <Link as={NextLink} href="/works">
        Works
      </Link>
      <span>
        {' '}
        <ChevronRightIcon />
      </span>
      <Heading display="inline-block" as="h3" fontSize={20} mb={4}>
        {children}
      </Heading>
    </Box>
  )
}

export interface WorkImageProps {
  src: string
  alt: string
}

export function WorkImage({ src, alt }: WorkImageProps) {
  return <Image borderRadius="lg" w="full" src={src} alt={alt} mb={4} />
}

export interface MetaProps {
  children?: React.ReactNode
}

export function Meta({ children }: MetaProps) {
  return (
    <Badge colorScheme="green" mr={2}>
      {children}
    </Badge>
  )
}
