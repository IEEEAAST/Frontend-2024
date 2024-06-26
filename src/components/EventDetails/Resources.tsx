import { ResourceVideo } from './ResourcesVideo'
import { ResourceNote } from './ResourcesNote'
import pic from '../../assets/IEEELogoWhite.png'
import {
    Table,
    Thead,
    Tr,
    Th,
    Flex,
    TableContainer,

  } from '@chakra-ui/react'
import { EventData } from '../../interfaces/EventData'
import { Ivideo } from '../../interfaces/EventData'
import { useEffect, useState } from 'react'


  export const Resources = ( eventVideos : Ivideo[]) => {
      useEffect(()=> {

      })
      const [videos, setVideos] = useState<Ivideo[]>();
    const destUrl:string = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs"
    return (
        <Flex direction={"column"}>
        <TableContainer marginBottom={"56px"}>
         {/* table for videos */}
        <Table variant='sm'>
          <Thead>
            <Tr>
              <Th className="!text-lg !capitalize">Videos</Th>
            </Tr>
          </Thead>
          <Tr>
          <Flex>
            {videos && videos.map((video) => (
              <ResourceVideo thumbNail={video.thumbnail} vidName={video.name} vidLength={video.length} speakerName={video.speaker} destUrl={video.url} />
            ))}
          </Flex>
          </Tr>
        </Table></TableContainer>

        {/* table for notes */}
        <TableContainer>
        <Table variant='sm'>
          <Thead>
            <Tr>
              <Th className="!text-lg !capitalize">Key Notes</Th>
            </Tr>
          </Thead>
          <Tr>
           <Flex>
                <ResourceNote thumbNail={pic} noteName={'Sustainability in Design works...'} destUrl={destUrl} />
                <ResourceNote thumbNail={pic} noteName={'Sustainability in Design works...'} destUrl={destUrl} />
                <ResourceNote thumbNail={pic} noteName={'Sustainability in Design works...'} destUrl={destUrl} />
                <ResourceNote thumbNail={pic} noteName={'Sustainability in Design works...'} destUrl={destUrl} />
                <ResourceNote thumbNail={pic} noteName={'Sustainability in Design works...'} destUrl={destUrl} />
                <ResourceNote thumbNail={pic} noteName={'Sustainability in Design works...'} destUrl={destUrl} />
                <ResourceNote thumbNail={pic} noteName={'Sustainability in Design works...'} destUrl={destUrl} />
                <ResourceNote thumbNail={pic} noteName={'Sustainability in Design works...'} destUrl={destUrl} />
           </Flex>
          </Tr>
        </Table>
        </TableContainer>
        </Flex>
    )
}