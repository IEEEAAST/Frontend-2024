import React from 'react';
import { Table, Td,Tr, Box,Image, Flex } from '@chakra-ui/react';
import t_icon from '../../assets/twitter-white@2x.png';
import i_icon from '../../assets/instagram-white@2x.png';
import l_icon from '../../assets/linkedin-white@2x.png';
import {socials} from '../EventDetails/Types'
import { px } from 'framer-motion';

// type socials = {
//   twitter?: string | null | undefined;
//   instagram?: string | null | undefined;
//   linkedin?: string | null | undefined;
// }

interface socialProps {
  links: socials;
}

// function Slink(props: { text: string }) {
//   return (
//     <a href={props.text}></a>
//   )
// }

export const Social: React.FC<socialProps> = ({ links }) => {
  const socialIcons: { [key: string]: string } = {
    twitter: t_icon,
    instagram: i_icon,
    linkedin: l_icon
  };

  return (
    <>
      {Object.entries(links).map(([key, value]) => { {/*key = Social media / value = links */ }
        if (value !== null && value !== undefined && value !== '' ) {
          return (
            <a key={key} href={value}>
              <Image  boxSize='30px' src={socialIcons[key]} alt={key} />
            </a>
          );
        }
      })}
    </>
  );
}