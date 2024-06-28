import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Spinner,
} from '@chakra-ui/react'
import { Speaker } from './Speaker'
import { IspksIds, Ispk } from '../../interfaces/EventData';
import getCollection from '../../firebase/getCollection'
import React, { useState, useEffect } from 'react';
//import {Props} from '../EventDetails/Speaker'


export const Speakers : React.FC<IspksIds> = ({speakersIds}) => {

  const [speakers, setSpeakers] = useState<Ispk[]>();
  const [loading, setLoading] = useState(true);
  
const fetchData= async()=>{
  await getCollection('speakers').then((res) => {
    if (res.result && !res.error) {
      
        const wantedSpeakerIDs = res.result.filter((id,index)=>
          speakersIds.includes(res.ids?.[index]));
        setSpeakers(wantedSpeakerIDs);

       // Assuming res.result is an array of speakers
      setLoading(false);
    }
  });
}

  useEffect(() => {
    fetchData();
  },[]);

  return loading ? <Spinner size="xl"/>: (
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

        {speakers && speakers.map((speaker:Ispk, index:number) => (
        <Speaker
          key={index}
          name={speaker.name}
          src={speaker.imgurl}
          bio={speaker.bio}
          links={speaker.socials}
        />
      ))}

          {/* <Speaker name={'name'} src={''} bio={'this person is delulu'}
          Slinks={{
            twitter:  '',
            instagram: 'https://www.google.com/search?client=opera-gx&q=solo+leveling&sourceid=opera&ie=UTF-8&oe=UTF-8',
            linkedin: 'https://classroom.google.com/c/NjcxNjUxOTQzMjQx'
          }}  />

          <Speaker name='hassan' src={''} bio={'this person is delulu'}  Slinks={{twitter:'https://twitter.com', instagram:'', linkedin:''}}/> */}
        </Tbody>

      </Table>
    </TableContainer>

  )
}