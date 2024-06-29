
import { socialLinks } from "./Types.tsx"
import { Social } from "./Social.tsx"
import {
  Tr,
  Td,
  Box,
  Image,
  Flex,
} from '@chakra-ui/react'

interface SponsorProps {
  sponsorImg: string;
  name: string;
  totalEventSponsored: number;
  linksSocial: socialLinks;
}

  export const Sponsor = ({ sponsorImg, name, totalEventSponsored, linksSocial }: SponsorProps) => {
        return (
      <Tr>
      <Td><Box boxSize='sm' width={"50px"} height={"50px"}><Image src={sponsorImg} alt='test' width={"50px"} height={"50px;"}/></Box></Td>
      <Td fontFamily={'SF-Pro-Display-Regular'}>{name}</Td>
      <Td fontFamily={'SF-Pro-Display-Regular'}>{totalEventSponsored} Events</Td>
      <Td>
      <Flex className="!space-x-5">
      <Social links={linksSocial} />
        </Flex>
        </Td>
      </Tr>
  )
}