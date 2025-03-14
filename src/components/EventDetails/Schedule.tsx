import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
} from '@chakra-ui/react'
import { ScheduleItem } from './ScheduleItem';
import { scheduleItems} from '../../interfaces/EventData'

export const Schedule = ({schedules}:scheduleItems) => {
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
            {schedules.map((schedule:any, index:number) => (
              // Assuming 'schedule' contains fields like 'title', 'speaker', etc.
              <ScheduleItem key={index} title={schedule.title} speaker={schedule.speaker} starting={schedule.starting} duration={schedule.duration}/>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
