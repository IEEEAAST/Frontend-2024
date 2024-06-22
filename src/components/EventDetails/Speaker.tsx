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

type txt={text:string;}

interface Props {
  name: string;
  src: string;
  bio: string;
  Slinks:socialLinks;
}

const CustomAvatar: React.FC<Props> = ({ name, src }) => {
  return <Avatar name={name} src={src} />;
};
// function Sname(props:txt){
//   return <div>{props.text}</div>
// };
// function Bio(props:txt){
//   return <Td>{props.text}</Td>
// }

export const Speaker = ({name,src,bio,Slinks}:Props) => {
  return (
    <>
      <Tr>
            <Td>
              <Stack direction={'row'} alignItems="center">
                < CustomAvatar name={name} bio={bio} src={src} Slinks={{Twitter:'twitter.com', Instagram:'', Linkedin: ''}} />
              </Stack>
            </Td>
            <Td>
              <>{name}</>
            </Td>
            <Td>
              <>{bio}</>
            </Td>
            <Td>
            <Flex className='!space-x-3'><Social links={Slinks} /></Flex>
            </Td>
          </Tr>
    </>
  )
}
