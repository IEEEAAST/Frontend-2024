import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles/SlidingTabs.css'

export const SlidingTabs = () => {
  return (
    <Tabs>
    <div id="tablistBar">
        <TabList>
          <Tab>Schedule</Tab>
          <Tab>Speakers</Tab>
          <Tab>Sponsors</Tab>
          <Tab>Resources</Tab>
          <Tab>Gallery</Tab>
        </TabList>
        <button>Attend</button>
    </div>
        <TabPanel>
          Schedule goes here!
        </TabPanel>
        <TabPanel>
          Speakers go here!
        </TabPanel>
        <TabPanel>
            Sponsors go here!
        </TabPanel>
        <TabPanel>
            Resources go here!
        </TabPanel>
        <TabPanel>
            Gallery goes here!
        </TabPanel>
    </Tabs>
  )
}
