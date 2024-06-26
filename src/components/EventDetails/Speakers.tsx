import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react'
import { Speaker } from './Speaker'



export const Speakers = () => {

  return (
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
            Twitter:  '',
            Instagram: 'https://www.google.com/search?client=opera-gx&q=solo+leveling&sourceid=opera&ie=UTF-8&oe=UTF-8',
            Linkedin: 'https://classroom.google.com/c/NjcxNjUxOTQzMjQx'
          }}  />

          <Speaker name='hassan' src={''} bio={'this person is delulu'}  Slinks={{Twitter:'https://twitter.com', Instagram:'', Linkedin:''}}/>
        </Tbody>

      </Table>
    </TableContainer>

  )
}
