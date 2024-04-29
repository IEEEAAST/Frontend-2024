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
            <Th color={"#fff"}>Name</Th>
            <Th color={"#fff"}>Bio</Th>
            <Th color={"#fff"}>Social</Th>
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
            <Td>  <img src={t_icon} alt="Twitter Icon" width={'30px'}/> </Td>
            <Td>
            <div className="w-full h-40 flex items-center justify-center cursor-pointer">
  <div
    className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group"
  >
    <span
      className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"
    ></span>
    <span
      className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        className="w-5 h-5 text-green-400"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        className="w-5 h-5 text-green-400"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200"
      >Button</span>
  </div>
</div>

            </Td>
          </Tr>
          <Tr>
            <Td>
              <Stack direction={'row'} alignItems="center">
                <Avatar name='Mariam Rashad' src='https://bit.ly/broken-link' />
                <> Mariam</>
              </Stack>
            </Td>
            <Td>This person is delulu</Td>
            <Td><img src={t_icon} alt="Twitter Icon" width={'30px'}/></Td>
          </Tr>
          <Tr>
            <Td>
              <Stack direction={'row'} alignItems="center">
                <Avatar name='Mariam Rashad' src='https://bit.ly/broken-link' />
                <> Mariam</>
              </Stack>
            </Td>
            <Td>This person is delulu and can code.</Td>
            <Td><img src={t_icon} alt="Twitter Icon" width={'30px'}/></Td>
          </Tr>
        </Tbody>

      </Table>
    </TableContainer>

  )
}
