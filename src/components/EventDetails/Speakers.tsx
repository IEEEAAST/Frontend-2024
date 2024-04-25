import React from 'react'
import './styles/Speakers.css'
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
  } from '@chakra-ui/react'

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
        //             <td><img src={logo} className='logo' /></td>
        //             <td><p>Mariam</p></td>
        //             <td><p >Dean of Engineering college,AASTMT</p></td>
        //         </tr>
        //     </tbody>
        // </table>

        <TableContainer mx={'auto'}>
  <Table variant='simple'>
    
    <Thead>
      <Tr>
        <Th color={"#fff"}>Name</Th>
        <Th color={"#fff"}>Bio</Th>
        <Th color={"#fff"} >Social</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>
            <Stack direction={'row'} alignItems="center">
            <Avatar name='Oshigaki Kisame' src='https://bit.ly/broken-link' />
            <> Mariam</>
            </Stack>
        </Td>
        <Td>millimetres (mm)</Td>
        <Td>25.4</Td>
      </Tr>
      <Tr>
        <Td>
            <Stack direction={'row'} alignItems="center">
            <Avatar name='Oshigaki Kisame' src='https://bit.ly/broken-link' />
            <> Mariam</>
            </Stack>
        </Td>
        <Td>centimetres (cm)</Td>
        <Td>30.48</Td>
      </Tr>
      <Tr>
        <Td>
        <Stack direction={'row'} alignItems="center">
            <Avatar name='Oshigaki Kisame' src='https://bit.ly/broken-link' />
            <> Mariam</>
            </Stack>
        </Td>
        <Td>metres (m)</Td>
        <Td>0.91444</Td>
      </Tr>
    </Tbody>
    
  </Table>
</TableContainer>

    )
}
