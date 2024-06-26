import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Center, Spinner } from '@chakra-ui/react';
import { VolunteersCarousel } from './VolunteersCarousel';
import HeadVolunteer from '../../interfaces/HeadVolunteer.tsx';
import { useState, useEffect } from 'react';
import getCollection from '../../firebase/getCollection.js';

type Props = {}

interface GroupedHeads {
  [year: number]: {
    boards: HeadVolunteer[],
    heads: HeadVolunteer[]
  }
}

export const Volunteers = (props: Props) => {
  const [headsByYear, setHeadsByYear] = useState<GroupedHeads>({});
  const [isLoading, setIsLoading] = useState<boolean>(true); // State to track loading

  useEffect(() => {
    const boardRoleOrder = ['Chairman', 'Vice Chairman', 'Secretary', 'Treasurer'];
    const headRoleOrder = [
      'Head of IT Committee',
      'Head of Web Team (IT Committee)',
      'Head of Mobile Team (IT Committee)',
      'Head of Technical Committee',
      'Head of Operations Committee',
      'Head of Registration Committee',
      'Head of Media Committee',
      'Head of Marketing Committee',
      'Head of Documentation Committee'
    ];

    const fetchData = async () => {
      try {
        const response = await getCollection('heads');

        if (response.result) {
          const result: HeadVolunteer[] = response.result;
          const groupedHeads = result.reduce((acc: GroupedHeads, head) => {
            const year = head.year;
            if (!acc[year]) {
              acc[year] = { boards: [], heads: [] };
            }
            if (head.board) {
              acc[year].boards.push(head);
            } else {
              acc[year].heads.push(head);
            }
            return acc;
          }, {});

          // Sort boards based on boardRoleOrder
          for (const year in groupedHeads) {
            groupedHeads[year].boards.sort((a, b) => {
              return boardRoleOrder.indexOf(a.role) - boardRoleOrder.indexOf(b.role);
            });

            // Sort heads based on headRoleOrder
            groupedHeads[year].heads.sort((a, b) => {
              return headRoleOrder.indexOf(a.role) - headRoleOrder.indexOf(b.role);
            });
          }

          setHeadsByYear(groupedHeads);
          setIsLoading(false); // Set loading state to false after data is fetched
          console.log(groupedHeads);
        } else {
          console.error('Failed to retrieve heads:', response.error);
          setIsLoading(false); // Set loading state to false on error
        }
      } catch (error) {
        console.error('Error fetching heads:', error);
        setIsLoading(false); // Set loading state to false on error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full px-[205px] container mx-auto overflow-hidden pt-[100px]">
      <p className="font-bold text-[45px] mx-auto">Meet Talent in Our Team</p>

      {/* Conditional rendering based on loading state */}
      {isLoading ? (
        <Center mt={8}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <div>
          <Tabs position='relative' variant='unstyled' defaultIndex={3}>
            <Center>
              <TabList className='gap-16 pt-10'>
                <Tab><p className='text-4xl'>2021</p></Tab>
                <Tab><p className='text-4xl'>2022</p></Tab>
                <Tab><p className='text-4xl'>2023</p></Tab>
                <Tab><p className='text-4xl'>2024</p></Tab>
              </TabList>
            </Center>
            <TabIndicator mt='-1.5px' height='2px' bg='white' borderRadius='1px' />
            <TabPanels>
              {[2021, 2022, 2023, 2024].map((year) => (
                <TabPanel key={year}>
                  <Tabs position='relative' variant='unstyled' defaultIndex={0}>
                    <Center>
                      <TabList>
                        <Tab>Board</Tab>
                        <Tab>Heads</Tab>
                      </TabList>
                    </Center>
                    <TabIndicator mt='-1.5px' height='2px' bg='white' borderRadius='1px' />
                    <TabPanels>
                      <TabPanel>
                        {headsByYear[year] && headsByYear[year].boards.length > 0 ? (
                          <VolunteersCarousel volunteers={headsByYear[year].boards} />
                        ) : (
                          <p>No boards available for {year}</p>
                        )}
                      </TabPanel>
                      <TabPanel>
                        {headsByYear[year] && headsByYear[year].heads.length > 0 ? (
                          <VolunteersCarousel volunteers={headsByYear[year].heads} />
                        ) : (
                          <p>No heads available for {year}</p>
                        )}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </div>
      )}
    </div>
  );
};
