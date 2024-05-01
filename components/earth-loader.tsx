import { LegacyRef, forwardRef } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

export function EarthSpinner() {
  return (
    <Spinner
      size="xl"
      position="absolute"
      left="50%"
      top="50%"
      ml="calc(0px - var(--spinner-size) / 2)"
      mt="calc(0px - var(--spinner-size))"
    />
  )
}

export const EarthContainer = forwardRef(
  (
    { children }: { children: React.ReactNode },
    ref: LegacyRef<HTMLDivElement>
  ) => (
    <Box
      ref={ref}
      className="voxel-dog"
      m="auto"
      mt={['-20px', '-60px', '-120px']}
      mb={['-40px', '-140px', '-200px']}
      w={[280, 480, 640]}
      h={[280, 480, 640]}
      position="relative"
    >
      {children}
    </Box>
  )
)
EarthContainer.displayName = 'DogContainer'

export default function Loader() {
  return (
    <EarthContainer>
      <EarthSpinner />
    </EarthContainer>
  )
}
