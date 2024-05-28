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
} from '@chakra-ui/react'
// type TxT={text:string;}
interface Props{
  title:string | null;
  speaker:string | null;
  starting:string | null;
  duration?:string | null;
}
// function Topic (props:Text) {
//   return (
//   <>
//     {props.text}
//   </>
// )}
// function Pname(props:TxT){
//   return (
//     <Td>
//       {props.text}
//     </Td>
//   )
// }
// function Time(props:TxT){
//   return(
//     <Td>
//       {props.text}
//     </Td>
//   )
// }

export const ScheduleItem = ({title,speaker,starting,duration}:Props) => {
  return (
    <>
        <Tr>
                            <Td>
                                <Stack direction={'row'} alignItems="center">
                                    {/* <> AI and </> */}
                                    <>{title}</> {/*title*/}
                                </Stack>
                            </Td>
                            <Td>
                              {speaker}
                            </Td>
                            <Td>
                              {starting}
                            </Td>
                            <Td>
                              {duration}
                            </Td>
                            {/* <Td>Mariam </Td> */}
                            {/* <Pname text='hassan'/> */}
                            {/* <Td>2:00</Td>
                            <Td>4:00</Td> */}
                            {/* <Time text='2:00'/>
                            <Time text='4:00'/> */}
                        </Tr>
    </>
  )
}
