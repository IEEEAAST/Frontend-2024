import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Center } from '@chakra-ui/react'
import { generateFakeImages } from '../../mock/home/generateFakeImages';
import { VolunteersCarsousel } from './VolunteersCarsousel';

type Props = {}

export const Volunteers = (props: Props) => {
  const imgs1 = generateFakeImages(20);
  const imgs2 = generateFakeImages(20);
  const imgs3 = generateFakeImages(20);
  const imgs4 = generateFakeImages(20);
  
  return (
    <div className="flex flex-col w-full px-[205px] container mx-auto overflow-hidden pt-[100px]" >
        <p className="font-bold text-[45px] mx-auto">Meet Talent in Our Team</p>
        <Tabs position='relative' variant='unstyled'>
          <Center> {/* Center component to horizontally center its children */}
            <TabList className='gap-16 pt-10'>
              <Tab><p className='text-4xl '>IT</p></Tab>
              <Tab><p className='text-4xl'>Technical</p></Tab>
              <Tab><p className='text-4xl'>Operations</p></Tab>
              <Tab><p className='text-4xl'>Creative</p></Tab>
            </TabList>
          </Center>
          <TabIndicator mt='-1.5px' height='2px' bg='white' borderRadius='1px' />
          <TabPanels>
            <TabPanel>
              <div className="w-full">
                <VolunteersCarsousel imgs={imgs1}/>
              </div>
            </TabPanel>
            <TabPanel>
            <div className="w-full">
                <VolunteersCarsousel imgs={imgs2}/>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="w-full">
                <VolunteersCarsousel imgs={imgs3}/>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="w-full">
                <VolunteersCarsousel imgs={imgs4}/>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </div>
  )
}
