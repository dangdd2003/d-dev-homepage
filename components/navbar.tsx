import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
  LinkProps
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Logo from '@/components/logo'
import ThemeToggleButton from './theme-toggle-button'
import { forwardRef } from 'react'
import { IoLogoGithub } from 'react-icons/io5'

function LinkItem({
  href,
  path,
  children,
  target,
  display,
  alignItems,
  style
}: LinkProps & { path: string }) {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      p={2}
      bg={active ? 'grassTeal' : undefined}
      color={active ? `#202023` : inactiveColor}
      target={target}
      display={display}
      alignItems={alignItems}
      style={style}
    >
      {children}
    </Link>
  )
}

const MenuLink = forwardRef<HTMLAnchorElement, { href: string }>(
  (props, ref) => <Link ref={ref} as={NextLink} {...props} />
)
MenuLink.displayName = `MenuLink`

interface NavbarProps {
  path: string
}

export default function Navbar(props: NavbarProps) {
  const { path } = props
  const boxProps = {
    align: 'right'
  }

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        flexWrap="wrap"
        alignItems="center"
        justifyItems="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        {/* Display Header Options*/}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/articles" path={path}>
            Articles
          </LinkItem>
          <LinkItem href="/connect" path={path}>
            Connect
          </LinkItem>
          <LinkItem href="/more" path={path}>
            More
          </LinkItem>
          <LinkItem
            href="https://github.com/dangdd2003/d-dev-homepage"
            path={path}
            target="_blank"
            display="inline-flex"
            alignItems="center"
            style={{ gap: 3 }}
          >
            <IoLogoGithub />
            Source
          </LinkItem>
        </Stack>
        <Box flex={1} {...boxProps}>
          <ThemeToggleButton />
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem as={MenuLink} href="/">
                  About
                </MenuItem>
                <MenuItem as={MenuLink} href="/works">
                  Works
                </MenuItem>
                {/* <MenuItem as={MenuLink} href="/articles"> */}
                {/*   Articles */}
                {/* </MenuItem> */}
                <MenuItem as={MenuLink} href="/connect">
                  Connect
                </MenuItem>
                <MenuItem as={MenuLink} href="/more">
                  More
                </MenuItem>
                <MenuItem
                  as={Link}
                  isExternal
                  href="https://github.com/dangdd2003/d-dev-homepage"
                >
                  View Source
                  <Box ml={2}>
                    <IoLogoGithub />
                  </Box>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
