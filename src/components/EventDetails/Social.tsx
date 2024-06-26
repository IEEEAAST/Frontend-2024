import { Link } from "react-router-dom"
import { motion } from "framer-motion";
import { socialLinks } from "./Types.tsx"
import t_icon from '../../assets/twitter-white@2x.png'
import i_icon from '../../assets/language-globe-white@2x.png'
import l_icon from '../../assets/linkedin-white@2x.png'
import {
  Box,
  Image
} from '@chakra-ui/react'

// interface SocialProps {
//     links: socialLinks;
// }

// const socialIcons: { [key: string]: string} = {
//     twitter: t_icon,
//     instagram: i_icon,
//     linkedin: l_icon
// };

export const Social = ({ links }: any) => {
    console.log("this is social and the links i recieved are : ", links)
    return (
        <>
            <Box boxSize='sm' width={"30px"} height={"30px"}>
                <a target='_blank' href={links.instagram != undefined ? links.instagram: "#"}>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                            <Image src={l_icon} alt={""} width={"30px"} height={"30px;"} _hover={{cursor: "pointer"}}/>
                    </motion.div>
                </a>
            </Box>
        </>
)
}