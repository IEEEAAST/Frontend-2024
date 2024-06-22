import React from 'react'
import {
  Tr,
  Td,
  Stack,
} from '@chakra-ui/react'
interface Props{
  title:string | null;
  speaker:string | null;
  starting:string | null;
  duration?:string | null;
}

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
                        </Tr>
    </>
  )
}
