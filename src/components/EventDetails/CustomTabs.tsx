import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Bell from '../../assets/notification-bell-white.png';
import Star from '../../assets/fav-event-star-white.png';
import './styles/CustomTabs.css'; // Import your CSS file for styling
import { Schedule } from './schedule';
import {ScheduelItem} from './Scheduel-item';
import { Speakers } from './Speakers';
export const CustomTabs = () => {
const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <Tabs selectedIndex={activeTab} onSelect={(index) => handleTabClick(index)}>
      <div id="tablistBar">
      <TabList>
        <div className="tab-border" style={{ transform: `translateX(${activeTab * 100}%)` }}></div>
        <Tab>Schedule</Tab>
        <Tab>Speakers</Tab>
        <Tab>Sponsors</Tab>
        <Tab>Resources</Tab>
        <Tab>Gallery</Tab>
      </TabList>
      <div id="buttonsWrapper">
        <button className="iconButton"><img src={Bell}></img></button>
        <button className="iconButton"><img src={Star}></img></button>
        <button className='defaultButton'>Attend</button>
      </div>
      </div>
      <TabPanel>
          <Schedule/>
          <ScheduelItem/>
        </TabPanel>
        <TabPanel>
          <Speakers/>
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

export default CustomTabs;