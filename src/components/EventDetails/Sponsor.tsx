import { motion } from "framer-motion";
import { Link } from "react-router-dom"
import {
  Tr,
  Td,
  Box,
  Image
} from '@chakra-ui/react'

interface SponsorProps {
  sponsorImg: string;
  name: string;
  totalEventSponsored: number;
  linkSocial: string;
}

  export const Sponsor = ({ sponsorImg, name, totalEventSponsored, linkSocial }: SponsorProps) => {
    const destUrl:string = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs"
    return (
      <Tr>
      <Td><Box boxSize='sm' width={"50px"} height={"50px"}><Image src={sponsorImg} alt='test' width={"50px"} height={"50px;"}/></Box></Td>
      <Td>{name}</Td>
      <Td>{totalEventSponsored} Events</Td>
      <Td><Box boxSize='sm' width={"30px"} height={"30px"}><Link target='_blank' to={destUrl}>
        <motion.div whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}><Image src={linkSocial} alt='test' width={"30px"} height={"30px;"} _hover={{cursor: "pointer"}}/></motion.div></Link></Box></Td>
      </Tr>
  )
}