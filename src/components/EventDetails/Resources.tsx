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


  export const Resources = () => {
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
            <ResourceVideo thumbNail={pic} vidName={'Sustainability in Design works...'} vidLength={'25 Min'} speakerName={'Speaker Name'} destUrl={destUrl} />
            <ResourceVideo thumbNail={pic} vidName={'Sustainability in Design works...'} vidLength={'25 Min'} speakerName={'Speaker Name'} destUrl={destUrl} />
            <ResourceVideo thumbNail={pic} vidName={'Sustainability in Design works...'} vidLength={'25 Min'} speakerName={'Speaker Name'} destUrl={destUrl} />
            <ResourceVideo thumbNail={pic} vidName={'Sustainability in Design works...'} vidLength={'25 Min'} speakerName={'Speaker Name'} destUrl={destUrl} />
            <ResourceVideo thumbNail={pic} vidName={'Sustainability in Design works...'} vidLength={'25 Min'} speakerName={'Speaker Name'} destUrl={destUrl} />
            <ResourceVideo thumbNail={pic} vidName={'Sustainability in Design works...'} vidLength={'25 Min'} speakerName={'Speaker Name'} destUrl={destUrl} />
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