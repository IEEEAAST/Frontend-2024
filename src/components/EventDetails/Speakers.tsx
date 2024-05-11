import React from 'react'
import logo from '../../assets/IEEEAAST.ico'
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
  Flex
} from '@chakra-ui/react'
import t_icon from '../../assets/twitter-white@2x.png'
import { Speaker } from './Speaker'



export const Speakers = () => {

  return (
    // <table>
    //     <thead >
    //         <tr>
    //             <th>Name</th>
    //             <th>Name</th>
    //             <th>Name</th>
    //         </tr>
    //     </thead>

    //     <tbody>
    //         <tr>
    //             <td><img src={logo} classNameName='logo' /></td>
    //             <td><p>Mariam</p></td>
    //             <td><p >Dean of Engineering college,AASTMT</p></td>
    //         </tr>
    //     </tbody>
    // </table>

    <TableContainer mx={'auto'}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th></Th>
            <Th color={"#fff"} fontFamily={'SF-Pro-Display-Bold'}>Name</Th>
            <Th color={"#fff"} fontFamily={'SF-Pro-Display-Bold'}>Bio</Th>
            <Th color={"#fff"} fontFamily={'SF-Pro-Display-Bold'}>Social</Th>
          </Tr>
        </Thead>
        <Tbody>
          
          <Speaker name='mariam' src={'https://i.pinimg.com/564x/e0/31/14/e0311482368c394b6461c0cb38979fa5.jpg'} bio={'this person is delulu'} 
          Slinks={{
            twitter:  '',
            instagram: 'https://www.google.com/search?client=opera-gx&q=solo+leveling&sourceid=opera&ie=UTF-8&oe=UTF-8',
            linkedin: 'https://classroom.google.com/c/NjcxNjUxOTQzMjQx'
          }}  />

          <Speaker name='hassan' src={''} bio={'this person is delulu'}  Slinks={{twitter:'www'}}/>
          {/* <Speaker name={''} src={''} bio={''}/> */}
          {/* <Tr>
            <Td>
              <Stack direction={'row'} alignItems="center">
                <Avatar name='Mariam Rashad' src='https://i.pinimg.com/564x/e0/31/14/e0311482368c394b6461c0cb38979fa5.jpg' />
                <> Mariam</>
              </Stack>
            </Td>
            <Td>This person is delulu</Td>
            <Td><img src={t_icon} alt="Twitter Icon" width={'30px'} /></Td>
          </Tr>
          <Tr>
            <Td>
              <Stack direction={'row'} alignItems="center">
                <Avatar name='Mariam Rashad' src='https://i.pinimg.com/564x/e0/31/14/e0311482368c394b6461c0cb38979fa5.jpg' />
                <> Mariam</>
              </Stack>
            </Td>
            <Td>This person is delulu and can code.</Td>
            <Td><img src={t_icon} alt="Twitter Icon" width={'30px'} /></Td>
          </Tr> */}
        </Tbody>

      </Table>
    </TableContainer>

  )
}
