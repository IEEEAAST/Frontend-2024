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
} from '@chakra-ui/react'
import t_icon from '../../assets/twitter-white@2x.png'


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
            <Th color={"#fff"} fontFamily={'SF-Pro-Display-Bold'}>Name</Th>
            <Th color={"#fff"} fontFamily={'SF-Pro-Display-Bold'}>Bio</Th>
            <Th color={"#fff"} fontFamily={'SF-Pro-Display-Bold'}>Social</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Stack direction={'row'} alignItems="center">
                <Avatar name='Mariam Rashad' src='https://bit.ly/broken-link' />
                <> Mariam</>
              </Stack>
            </Td>
            <Td>This person is delulu</Td>
            <Td>  <img src={t_icon} alt="Twitter Icon" width={'30px'} /> </Td>
          </Tr>
          <Tr>
            <Td>
              <Stack direction={'row'} alignItems="center">
                <Avatar name='Mariam Rashad' src='https://bit.ly/broken-link' />
                <> Mariam</>
              </Stack>
            </Td>
            <Td>This person is delulu</Td>
            <Td><img src={t_icon} alt="Twitter Icon" width={'30px'} /></Td>
          </Tr>
          <Tr>
            <Td>
              <Stack direction={'row'} alignItems="center">
                <Avatar name='Mariam Rashad' src='https://bit.ly/broken-link' />
                <> Mariam</>
              </Stack>
            </Td>
            <Td>This person is delulu and can code.</Td>
            <Td><img src={t_icon} alt="Twitter Icon" width={'30px'} /></Td>
          </Tr>
        </Tbody>

      </Table>
    </TableContainer>

  )
}
