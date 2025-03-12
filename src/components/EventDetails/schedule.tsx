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
    
  //const [loading, setLoading] = useState(true);

  //const fetchData = async () => {}

  // getDataByField("events","schedule","==", Schedule).then(res => {
  //     if(res.result){
  //         setSchdule(res.result);
  //         setLoading(false);
  //         console.log(res.result);
  //     }
  //     })
  // }

  //useEffect(() => {
  //    fetchData();
  //}, []);


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
            {/* {Schedule.map((schedule:any, index:number) =>
                <ScheduleItem key={index} title={schedule.title} speaker={schedule.speaker} starting={schedule.starting} duration={schedule.duration} />
            )} */}
            {schedules.map((schedule:any, index:number) => (
                // Assuming 'schedule' contains fields like 'title', 'speaker', etc.
              <ScheduleItem key={index} title={schedule.title} speaker={schedule.speaker} starting={schedule.starting} duration={schedule.duration}/>
            ))}
            {/* <ScheduleItem title='Ai' speaker='mariam' starting='2:00' duration='4:00' />
            <ScheduleItem title='ML' speaker='hassan' starting='2:00' duration='4:00' /> */}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
