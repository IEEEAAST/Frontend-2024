import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Avatar,
  Stack,
  Icon,
  Flex,
} from '@chakra-ui/react'
import t_icon from '../../assets/twitter-white@2x.png'
import { Social } from './Social';
import { socialLinks } from './Types.tsx';

// type txt = { text: string; }

// export interface spk {
//   name: string;
//   src: string;
//   bio: string;
//   Slinks: socialLinks;
// }

// const CustomAvatar: React.FC<spk> = ({ name, src }) => {
//   return <Avatar name={name} src={src} />;
// };
// function Sname(spk:txt){
//   return <div>{spk.text}</div>
// };
// function Bio(spk:txt){
//   return <Td>{spk.text}</Td>
// }

export const Speaker = ({ name, src, bio, links }: {name: string, src:string, bio:string, links:any}) => {
  return (
    <>
      <Tr>
        <Td>
          <Stack direction={'row'} alignItems="center">
            <Avatar name={name} src={src}/>
            {/* < CustomAvatar name={name} bio={bio} src={src} Slinks={{ twitter: 'twitter.com', instagram: '', linkedin: '' }} /> */}
          </Stack>
        </Td>
        <Td>
          <>{name}</>
        </Td>
        <Td>
          <>{bio}</>
        </Td>
        <Td>
          <Flex className='!space-x-3'>
            <Social links={links} />
          </Flex>
        </Td>
      </Tr>
    </>
  )
}
