import { Text } from '@chakra-ui/react'
import Link from 'next/link'
import styled from '@emotion/styled'
import LetterDIcon from './icons/d'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 500ms ease;
  }

  &:hover svg {
    transform: rotate(360deg);
  }
`

export default function Logo({ path = '' }: { path?: string }) {
  const isLegacy = path.startsWith('/legacy')
  return (
    <Link href={isLegacy ? '/legacy' : '/'} scroll={false}>
      <LogoBox>
        <LetterDIcon />
        <Text
          color="header-text"
          fontFamily='M PLUS Rounded 1c", sans-serif'
          fontWeight="bold"
          ml={3}
        >
          Doan Dinh Dang
        </Text>
      </LogoBox>
    </Link>
  )
}
