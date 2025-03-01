import {useContext, useState} from 'react'
import {UserContext} from '../App'
import {Tab, Tabs, TabList, TabPanels, TabPanel, Avatar} from '@chakra-ui/react'
import UserData from '../interfaces/userData';
import { EventData } from '../interfaces/EventData';
import ArticleData from '../interfaces/ArticleData';
import getCollection from '../firebase/getCollection';
import getDocument from '../firebase/getData';
import { useEffect } from 'react';
import { AdminUser } from '../components/Admin/AdminUser';

export interface IdUserData extends UserData {
  id: string | null;
}

export const Admin = () => {
  const {userData} = useContext(UserContext);
  if (!userData || !userData?.roles?.includes('admin')) {
      return null;
  }
  const [users, setUsers] = useState<IdUserData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [articles, setArticles] = useState<ArticleData[]>([]);

  const [selectedUser, setSelectedUser] = useState<IdUserData | null>(null);
  const [loading, setLoading] = useState(false);
  const availableRoles = ['admin', 'writer'];

  const fetchUsers = async () => {
    const usersCollection = await getCollection('users');
    const usersWithIds = usersCollection.result?.map((user, index) => ({
      ...user,
      id: usersCollection.ids ? usersCollection.ids[index] : null,
    }));
    const sortedUsers = usersWithIds?.sort((a, b) => (a.firstname || '').localeCompare(b.firstname || ''));
    console.log(sortedUsers);
    setUsers(sortedUsers || []);
  };

  const fetchEvents = async () => {
    const eventsCollection = await getCollection('events');
    setEvents(eventsCollection.result || []);
  };

  const fetchArticles = async () => {
    const articlesCollection = await getCollection('articles');
    setArticles(articlesCollection.result || []);
  };

  const handleTabChange = (index: number) => {
    switch (index) {
      case 0:
        fetchUsers();
        break;
      case 1:
        fetchEvents();
        break;
      case 2:
        fetchArticles();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleTabChange(0); // Load users by default
  }, []);



  return (
    <div className='pt-[120px] px-6'>
      <p className='font-display text-3xl font-bold'>Admin Settings</p>
      <div className='w-full bg-[#0b162a] h-[70vh] rounded-2xl mt-4 flex border-[#64748b]'>
        <Tabs orientation='vertical' variant="unstyled" isLazy className='w-full'>
          <TabList w='20%' px={4} py={2} gap={2} borderRight={"4px solid #000B21"}>
            <Tab w="100%" bg="#000B21" rounded={'full'} _selected={{background:"#516182"}}>Users</Tab>
            <Tab w="100%" bg="#000B21" rounded={'full'} _selected={{background:"#516182"}}>Events</Tab>
            <Tab w="100%" bg="#000B21" rounded={'full'} _selected={{background:"#516182"}}>Articles</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className='!p-0 w-full'>
              <p className='text-center font-extrabold text-2xl my-2'>Users</p>
                <div className='flex'>
                <div className='w-1/5 text-ellipsis flex flex-col bg-[#000b21] overflow-y-auto max-h-[63vh] overflow-x-hidden customScrollbar gap-1 border-4 border-[#000b21]'>
                {users.map(user => (
                  <div key={user.id} className={`flex items-center p-2 gap-2 ${selectedUser===user?"bg-[#516182]":"bg-[#0b162a]"} rounded-full cursor-pointer`} onClick={() => setSelectedUser(user)}>
                  <Avatar name={`${user.firstname} ${user.lastname}`} src={user.imgurl} />
                  <p>{user.firstname} {user.lastname}</p>
                  </div>
                ))}
                </div>
                <div className='w-full min-h-[63vh] overflow-y-auto max-h-[63vh] overflow-x-hidden customScrollbar'>
                  {selectedUser && (
                    <AdminUser selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                  )}
                </div>
                </div>
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
