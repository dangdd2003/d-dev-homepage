import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Global } from '@emotion/react'

interface ItemProps {
  children?: React.ReactNode
  category?: string
  title: string
  thumbnail: string
}

type GridItemProps = ItemProps & {
  href: string
}

type WorkGridItemProps = ItemProps & {
  id: string
}

export function PostGridItem({
  children,
  href,
  title,
  thumbnail
}: GridItemProps) {
  return (
    <Box w="100%" textAlign="center">
      <LinkBox cursor="pointer">
        <Image
          src={thumbnail}
          alt={title}
          className="grid-item-thumbnail"
          placeholder="blur"
          blurDataURL="/"
          loading="lazy"
          width={200}
          height={200}
        />
        <LinkOverlay href={href} target="_blank">
          <Text mt={2}>{title}</Text>
        </LinkOverlay>
        <Text fontSize={14}>{children}</Text>
      </LinkBox>
    </Box>
  )
}

export function WorkGridItem({
  children,
  category = 'work',
  id,
  title,
  thumbnail
}: WorkGridItemProps) {
  return (
    <Box w="100%" textAlign="center">
      <LinkBox
        as={NextLink}
        href={`/${category}/${id}`}
        scroll={false}
        cursor="pointer"
      >
        <Image
          src={thumbnail}
          alt={title}
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
        />
      </LinkBox>
      <LinkOverlay as="div" href={`/${category}/${id}`}>
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </Box>
  )
}

export function GridItemStyle() {
  return <Global styles={`.grid-item-thumbnail { border-radius: 12px; }`} />
}
