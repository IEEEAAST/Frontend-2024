import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import { generateFakeImages } from '../../mock/home/generateFakeImages';
import { VolunteersCarsousel } from './VolunteersCarsousel';

type Props = {}

export const Volunteers = (props: Props) => {
  const imgs1 = generateFakeImages(10);
  const imgs2 = generateFakeImages(10);
  const imgs3 = generateFakeImages(10);
  const imgs4 = generateFakeImages(10);
  
  return (
    <div className='flex flex-col items-center pt-10 w-full px-[205px] overflow-hidden'>
      <p className='font-bold text-3xl'>Meet Talent in Our Team</p>
      <Tabs variant='unstyled' className='mt-8'>
        <TabList className='gap-20 pt-8'>
          <Tab><p className='text-3xl'>IT</p></Tab>
          <Tab><p className='text-3xl'>Technical</p></Tab>
          <Tab><p className='text-3xl'>Operations</p></Tab>
          <Tab><p className='text-3xl'>Creative</p></Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
             <VolunteersCarsousel imgs={imgs1}/>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>four!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
