import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Bell from '../../assets/notification-bell-white.png';
import Star from '../../assets/fav-event-star-white.png';
import Plus from '../../assets/plus.png';
import Person from '../../assets/profile-person-white@2x.png'
import './styles/CustomTabs.css'; // Import your CSS file for styling
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
        <Tab><span className="tabText">Schedule</span></Tab>
        <Tab><span className="tabText">Speakers</span><img src={Person} className="tabIcon"></img></Tab>
        <Tab><span className="tabText">Sponsors</span></Tab>
        <Tab><span className="tabText">Resources</span></Tab>
        <Tab><span className="tabText">Gallery</span></Tab>
      </TabList>
      <div id="buttonsWrapper">
        <button className="iconButton"><img src={Bell}></img></button>
        <button className="iconButton"><img src={Star}></img></button>
        <button className='defaultButton'>
          <span id="buttonText">Attend</span>
          <button className="iconButton" id="plus"><img src={Plus}></img></button>
          </button>
      </div>
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

export default CustomTabs;