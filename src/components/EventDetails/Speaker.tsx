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
import { socials } from '../EventDetails/Types';

type txt={text:string;}

interface Props {
  name: string;
  src: string;
  bio: string;
  Slinks:socials;
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
                < CustomAvatar name={name} bio={bio} src={src} Slinks={{twitter:'twitter.com'}} />
                {/* <Avatar name='Mariam Rashad' src='https://i.pinimg.com/564x/e0/31/14/e0311482368c394b6461c0cb38979fa5.jpg'   /> */}
                {/* <pic name="Mariam Rashad" src='https://i.pinimg.com/564x/e0/31/14/e0311482368c394b6461c0cb38979fa5.jpg' /> */}
                {/* <Sname/> */}
              </Stack>
            </Td>
            <Td>
              <>{name}</>
            </Td>
            <Td>
              <>{bio}</>
            </Td>
            {/* <Td>
              <img src={src}></img>
            </Td> */}
            {/* <Bio text="This person is delulu"/> */}
            {/* <Td>This person is delulu</Td> */}
            {/* <Td>  <img src={t_icon} alt="Twitter Icon" width={'30px'} link='' /> </Td> */}
            {/* <Social/> */}
            <Td>
            <Flex className='!space-x-3'><Social links={Slinks} /></Flex>
            </Td>
          </Tr>
    </>
  )
}
