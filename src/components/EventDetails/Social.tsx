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

interface SocialProps {
  links: socialLinks;
}

const socialIcons: { [key: string]: string} = {
  twitter: t_icon,
  instagram: i_icon,
  linkedin: l_icon
};

export const Social = ({ links }: SocialProps) => {

  const socialMediaOrder: (keyof socialLinks)[] = ['twitter', 'instagram', 'linkedin'];

  return (
    <>
      {socialMediaOrder.map(socialMedia => {
        const link = links[socialMedia];
        if(link && link !== '') {
          return (
            <Box key={socialMedia} boxSize='sm' width={"30px"} height={"30px"}>
              <Link target='_blank' to={link}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Image src={socialIcons[socialMedia]} alt={socialMedia} width={"30px"} height={"30px;"} _hover={{cursor: "pointer"}}/>
                </motion.div>
              </Link>
            </Box>
          )
        } else {
          return null;
        }
      })}
    </>
  );
}
