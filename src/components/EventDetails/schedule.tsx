import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
} from '@chakra-ui/react'
import { ScheduleItem } from './ScheduleItem';


export const Schedule = () => {
    return (
        <>
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
                        <ScheduleItem title='Ai' speaker='mariam' starting='2:00' duration='4:00'  />
                        <ScheduleItem title='ML' speaker='hassan' starting='2:00' duration='4:00'  />
                    </Tbody>

                </Table>
            </TableContainer>
        </>
    )
}
