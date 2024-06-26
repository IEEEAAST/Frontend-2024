import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Center } from '@chakra-ui/react'
import { generateFakeImages } from '../../mock/home/generateFakeImages';
import { VolunteersCarousel } from './VolunteersCarsousel';
import Committee from '../../interfaces/Committee.tsx';
import VolunteerData from '../../interfaces/Volunteer.tsx';
import { useState , useEffect } from 'react';
import getCollection from '../../firebase/getCollection.js';

type Props = {}

export const Volunteers = (props: Props) => {
  const imgs1 = generateFakeImages(20);
  const imgs2 = generateFakeImages(20);
  const imgs3 = generateFakeImages(20);
  const imgs4 = generateFakeImages(20);
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerData[][]>([]);
  useEffect(() => {
    getCollection('committees').then((response) => {
      if (response.result) {
        const sortedResponse = response.result.sort((a, b) => a.name.localeCompare(b.name));
        setCommittees(sortedResponse);
        console.log(sortedResponse);
      } else {
        // Handle the case where response.result is null or undefined
        console.error('Failed to retrieve committees:', response.error);
      }
    }).catch((error) => {
      console.error('Error fetching committees:', error);
    });
  }, []);
  
  useEffect(() => {
    getCollection('volunteers').then((response) => {
      if (response.result) {
        const sortedResponse = response.result.sort((a, b) => a.name.localeCompare(b.name));
        console.log(sortedResponse);
      } else {
        // Handle the case where response.result is null or undefined
        console.error('Failed to retrieve volunteers:', response.error);
      }
    }).catch((error) => {
      console.error('Error fetching volunteers:', error);
    });
  }, []);
  
  return (
    <div className="flex flex-col w-full px-[205px] container mx-auto overflow-hidden pt-[100px]" >
        <p className="font-bold text-[45px] mx-auto">Meet Talent in Our Team</p>
        <Tabs position='relative' variant='unstyled'>
          <Center> {/* Center component to horizontally center its children */}
            <TabList className='gap-16 pt-10'>
              {committees.map((committee, index) => (
                <Tab key={index}><p className='text-4xl'>{committee.name}</p></Tab>
              ))}

            </TabList>
          </Center>
          <TabIndicator mt='-1.5px' height='2px' bg='white' borderRadius='1px' />
          <TabPanels>
            {committees.map((committee, index) => (
              <TabPanel key={index}>
                <div className="w-full">
                  <VolunteersCarousel imgs={imgs1}/>
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        </div>
  )
}
