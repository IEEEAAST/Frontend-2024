import { ResourceVideo } from './ResourcesVideo'
import { ResourceNote } from './ResourcesNote'
import {  IResources } from '../../interfaces/EventData'
import {
    Table,
    Thead,
    Tr,
    Th,
    Flex,
    TableContainer,

  } from '@chakra-ui/react'

// interface Videos {
//   videos: Ivideo[];
// }

  export const Resources : React.FC<IResources> = ({ videos, notes })  => {

    return (

        <Flex direction={"column"}>
        <TableContainer marginBottom={"56px"} className='customScrollbar'>
         {/* table for videos */}
        <Table variant='sm'>
          <Thead>
            <Tr>
              <Th className="!text-lg !capitalize" fontFamily={'SF-Pro-Display-Bold'}>Videos</Th>
            </Tr>
          </Thead>
          <Tr>
          <Flex>
            {videos && videos.map((video) => (
              <ResourceVideo thumbnail={video.thumbnail} name={video.name} length={video.length} speaker={video.speaker} url={video.url} />
            ))}
          </Flex>
          </Tr>
        </Table></TableContainer>

        {/* table for notes */}
        <TableContainer className='customScrollbar'>
        <Table variant='sm'>
          <Thead>
            <Tr>
              <Th className="!text-lg !capitalize" fontFamily={'SF-Pro-Display-Bold'}>Key Notes</Th>
            </Tr>
          </Thead>
          <Tr>
           <Flex>
           {notes && notes.map((note) => (
              <ResourceNote thumbnail={note.thumbnail} name={note.name} url={note.url} />
            ))}
           </Flex>
          </Tr>
        </Table>
        </TableContainer>
        </Flex>
    )
}