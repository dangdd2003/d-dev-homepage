'use client'

import { BioSection, BioYear } from '@/components/bio'
import P from '@/components/paragraph'
import { Section } from '@/components/section'
import { AnimatedText } from '@/components/text-effect'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function HomeBelowFold() {
  const props = {
    align: 'center'
  }
  return (
    <>
      <Section delay="0.5">
        <Heading as="h3" variant="section-title">
          <AnimatedText text="Biography" />
        </Heading>
        <BioSection>
          <BioYear>2003</BioYear>
          Born in Hanoi, Vietnam
        </BioSection>
        <BioSection>
          <BioYear>2021</BioYear>
          Started studying at University of Science and Technology of Hanoi -
          USTH
        </BioSection>
        <BioSection>
          <BioYear>2023</BioYear>
          Internship as Backend Dev at FPT IS - Information System
        </BioSection>
        <BioSection>
          <BioYear>2024</BioYear>
          Internship as Researcher at ICT Lab - USTH, Graduated from USTH
        </BioSection>
        <BioSection>
          <BioYear>Now</BioYear>
          System/Cloud Engineer at MobiFone Corporation
        </BioSection>
      </Section>

      <Section delay="0.7">
        <Heading as="h3" variant="section-title">
          <AnimatedText text="I ♥" />
        </Heading>
        <P>
          Music, Piano (but haven&apos;t known how to play yet &#128533; ),
          Reading, Computer Vision.
        </P>
      </Section>

      <Section delay="0.9">
        <Heading as="h3" variant="section-title">
          <AnimatedText text="Connect to me" />
        </Heading>
        <Box {...props} my={4}>
          <Button
            as={NextLink}
            href="/connect"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            My Bio Links
          </Button>
        </Box>
      </Section>
    </>
  )
}
