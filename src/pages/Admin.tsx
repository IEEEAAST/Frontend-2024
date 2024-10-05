import {useContext} from 'react'
import {UserContext} from '../App'
import {Tab, Tabs, TabList, TabPanels, TabPanel} from '@chakra-ui/react'

export const Admin = () => {
    const {userData} = useContext(UserContext)
    if (!userData||!userData?.roles?.includes('admin')) {
        return null
    }
  return (
    <div className='pt-[120px] px-6'>
      <p className='font-display text-3xl font-bold'>Admin Settings</p>
      <div className='w-full bg-[#0b162a] h-[70vh] rounded-2xl mt-4 flex border-[#64748b]'>
        
            <Tabs orientation='vertical' variant="unstyled" w={"20%"} isLazy>
                <TabList w='100%' px={4} py={2} gap={2} borderRight={"4px solid #000B21"}>
                    <Tab w="100%" bg="#000B21" rounded={'full'} _selected={{background:"#516182"}}>Users</Tab>
                    <Tab w="100%" bg="#000B21" rounded={'full'} _selected={{background:"#516182"}}>Events</Tab>
                    <Tab w="100%" bg="#000B21" rounded={'full'} _selected={{background:"#516182"}}> Articles</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>

                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>

    </div>
  )
}