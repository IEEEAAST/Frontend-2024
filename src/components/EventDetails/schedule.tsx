import React from 'react'
import Font from '../../assets/fonts/SF-Pro.ttf';
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


export const Schedule = () => {
    return (
        <>
            {/* <div className='text'>
    <h4>Title</h4>
    <h4>Speaker</h4>
    <h4>Starting</h4>
    <h4>Duration</h4>
    </div> */}

            {/* <div className='list'>
        <p>AI</p>
        <p>mariam Rashad</p>
        <p id='start'>2:00</p>
        <p>4:00</p>
    </div> */}

            <TableContainer mx={'auto'}  >
                <Table variant='simple'>

                    <Thead>
                        <Tr>
                            <Th color={"#fff"}>Title</Th>
                            <Th color={"#fff"}>Speaker</Th>
                            <Th color={"#fff"}>Starting</Th>
                            <Th color={"#fff"}>Duration</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <Stack direction={'row'} alignItems="center">
                                    <> AI</>
                                </Stack>
                            </Td>
                            <Td>Mariam </Td>
                            <Td>2:00</Td>
                            <Td>4:00</Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Stack direction={'row'} alignItems="center">
                                    <> AI</>
                                </Stack>
                            </Td>
                            <Td>Mariam</Td>
                            <Td>2:00</Td>
                            <Td>4:00</Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Stack direction={'row'} alignItems="center">
                                    <> AI and machine learning </>
                                </Stack>
                            </Td>
                            <Td>Mariam Hassan Rashad</Td>
                            <Td>2:00</Td>
                            <Td>4:00</Td>
                        </Tr>
                    </Tbody>

                </Table>
            </TableContainer>
        </>
    )
}
