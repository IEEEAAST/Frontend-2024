import React, { useState, useEffect } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    TableContainer,
    Spinner
    } from '@chakra-ui/react'
  import getCollection from '../../firebase/getCollection'
  import { Sponsor } from './Sponsor'
  import { Isponsor, IsponsorsIds } from '../../interfaces/EventData' 

  export const Sponsors: React.FC<IsponsorsIds> = ({ sponsorIds } ) => {
    const [Sponsors, setSponsors] = useState<Isponsor[]>();
    const [isLoading, setIsLoading] = useState(true);


    const fetchData = async() => {
      try{
      await getCollection('sponsors').then((res) => {
        if(!res.error && res.result)
            {
              const matchedSponsors = res.result.filter((sponsor, index) =>
                sponsorIds.includes(res.ids?.[index]));
                setSponsors(matchedSponsors)
            }
          })
        } catch(error){
            console.error('Error fetching sponsors: ', error)
        }
        setIsLoading(false);
      };
    useEffect(() => {
        fetchData();
    }, []);


    return  isLoading? <div className="h-screen flex justify-center items-center"><Spinner size={"xl"} className="flex "/></div> : (
      <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th></Th>
            <Th color={"fff"} fontFamily={'SF-Pro-Display-Bold'}>Name</Th>
            <Th color={"fff"} fontFamily={'SF-Pro-Display-Bold'}>Total Events Sponsored</Th>
            <Th color={"fff"} fontFamily={'SF-Pro-Display-Bold'}>Socials</Th>
          </Tr>
        </Thead>
        <Tbody>
        {Sponsors && Sponsors.map((sponsor) => (
          <Sponsor sponsorImg= {sponsor.imgurl} name={sponsor.name} totalEventSponsored={sponsor.totaleventssponsered} linksSocial={sponsor.socials} /> 
          ))}
        </Tbody>
        <Tfoot>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}