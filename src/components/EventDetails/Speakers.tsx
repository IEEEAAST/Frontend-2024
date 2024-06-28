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
import getDocumentsByField from '../../firebase/getDataByField'
import getData from '../../firebase/getData'
import getCollection from '../../firebase/getCollection'
import React, { useState, useEffect } from 'react';
//import {Props} from '../EventDetails/Speaker'


// getCollection('event').then ()
// getCollection('speakers').then ((res) => {
//         if (!res.error)
//           {
//             const speaker = res.result?.[0];
//             speaker(speaker.name,speaker.bio,speaker.imgurl,speaker.bio,speaker.social)
//             console.log(speaker);
//           }})

// getCollection('event').then((res) => {
//   if (!res.error) {
//     const speaker = res.result?.[0];
//     return (
//       <Speaker
//         name={speaker.name}
//         src={speaker.imgurl}
//         bio={speaker.bio}
//         Slinks={speaker.social}
//       />
//     );
//   }
// });


// const speakers = () => {
//   const [speakers, setSpeakers] = useState([]);

//   useEffect(() => {
//     getCollection('event').then((res) => {
//       if (!res.error) {
//         const speaker = res.result?.[0];
//         setSpeakers(speaker); // Assuming res.result is an array of speakers
//         console.log(speaker);
//       }
//     });
//   }, []);}



export const Speakers = () => {

  const [speakers, setSpeakers] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(()=> {
  //   getCollection('speakers').then(res => {
  //     console.log(res.result?.[0])
  //   })
  // })
const fetchData= async()=>{
  await getCollection('speakers').then((res) => {
    if (res.result) {
      // const speaker = res.result;
      // if (speaker){
      setSpeakers(res.result); // Assuming res.result is an array of speakers
      setLoading(false);
      console.log(res.result);
    // }
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

        {speakers.map((speaker:any, index:number) => (
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