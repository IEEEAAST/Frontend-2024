import {useContext, useState} from 'react'
import {UserContext} from '../App'
import {Tab, Tabs, TabList, TabPanels, TabPanel, Avatar, LightMode} from '@chakra-ui/react'
import UserData from '../interfaces/userData';
import { EventData } from '../interfaces/EventData';
import ArticleData from '../interfaces/ArticleData';
import getCollection from '../firebase/getCollection';
import deleteDocument from '../firebase/deleteDocument';
import { useEffect } from 'react';
import { AdminUser } from '../components/Admin/AdminUser';
import AdminEvent from '../components/Admin/AdminEvent';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import deleteStorageDir from '../firebase/deleteStorageDir';

export interface IdUserData extends UserData {
  id: string | null;
}

export const Admin = () => {
  const {userData, userId} = useContext(UserContext);
  if (!userData || !userData?.roles?.includes('admin')) {
      return (
        <div className='pt-[120px] px-6 flex flex-col w-full items-center justify-center h-[60vh]'>
          <p className='font-display text-3xl font-bold'>Unauthorized</p>
          <p className='text-xl'>You are not authorized to view this page</p>
        </div>
      );
  }
  const [users, setUsers] = useState<IdUserData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<UserData|EventData|ArticleData|null>(null);

  const [selectedUser, setSelectedUser] = useState<IdUserData | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  function openModal(item:UserData|EventData|ArticleData){
    setModalItem(item);
    setIsModalOpen(true);
  }

  async function cleanItemStorage(item:IdUserData|EventData|ArticleData){
    if ('registrationOpen' in item)
    {
      await deleteStorageDir(`events/${item.title}`);
    }
    else if ('firstname' in item)
    {
      await deleteStorageDir(`profilepics/${item.id}`);
    }
    else
    {
      await deleteStorageDir(`articles/${item.title}`);
    }
  }

  async function handleDeleteItem(item:IdUserData|EventData|ArticleData){
  if ('firstname' in item) {
    // It's a user
    await deleteDocument('users', item.id);
  } else if ('registrationOpen' in item) {
    // It's an event
    await deleteDocument('events', item.id);
  } else {
    // It's an article
    await deleteDocument('articles', item.id);
  }
  try{
  await cleanItemStorage(item);
  }
  catch(e){
    window.alert(e);
  }
  setIsModalOpen(false);
  }

  const fetchUsers = async () => {
    if (users.length === 0) {
      const usersCollection = await getCollection('users');
      const usersWithIds = usersCollection.result?.map((user, index) => ({
        ...user,
        id: usersCollection.ids ? usersCollection.ids[index] : null,
      }));
      const sortedUsers = usersWithIds?.sort((a, b) => (a.firstname || '').localeCompare(b.firstname || ''));
      setUsers(sortedUsers || []);
    }
  };

  const fetchEvents = async () => {
    if (events.length === 0) {
      const eventsCollection = await getCollection('events');
      const eventsWithIds = eventsCollection.result?.map((event, index) => ({
        ...event,
        id: eventsCollection.ids ? eventsCollection.ids[index] : null,
      }));
      console.log(eventsWithIds);
      setEvents(eventsWithIds || []);
    }
  };

  const fetchArticles = async () => {
    if (articles.length === 0) {
      const articlesCollection = await getCollection('articles');
      setArticles(articlesCollection.result || []);
    }
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
        <Tabs orientation='vertical' variant="unstyled" isLazy className='w-full' onChange={handleTabChange}>
          <TabList w='20%' px={4} py={2} gap={2} borderRight={"4px solid #000B21"}>
            <Tab w="100%" bg="#000B21" rounded={'full'} _selected={{background:"#516182"}}>Users</Tab>
            <Tab w="100%" bg="#000B21" rounded={'full'} _selected={{background:"#516182"}}>Events</Tab>
            <Tab w="100%" bg="#000B21" rounded={'full'} _selected={{background:"#516182"}}>Articles</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className='!p-0 w-full'>
              <p className='text-center font-extrabold text-2xl my-2'>Users</p>
              <div className='flex'>
                <div className='w-1/5 text-ellipsis flex flex-col min-w-48 bg-[#000b21] overflow-y-auto max-h-[63vh] overflow-x-hidden customScrollbar gap-1 border-4 border-[#000b21]'>
                {users.map(user => (
                  <div key={user.id} className={`flex items-center min-w-48 p-2 gap-2 ${selectedUser===user?"bg-[#516182]":"bg-[#0b162a]"} rounded-md cursor-pointer mr-2`} onClick={() => setSelectedUser(user)}>
                  <Avatar name={`${user.firstname} ${user.lastname}`} src={user.imgurl} />
                  <p>{user.firstname} {user.lastname}</p>
                    {user.id !== userId && (
                    <LightMode><Button className='ml-auto' size='sm' colorScheme='red' borderRadius='2xl' onClick={()=>{openModal(user)}}>X</Button></LightMode>
                    )}
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
            <TabPanel className='!p-0 w-full'>
              <p className='text-center font-extrabold text-2xl my-2'>Events</p>
                <div className='flex'>
                <div className='w-1/5 text-ellipsis flex flex-col items-center bg-[#000b21] overflow-y-auto max-h-[63vh] overflow-x-hidden customScrollbar gap-1 border-4 border-[#000b21]'>
                  {events.map(event => (
                  <div key={event.id} className={`flex items-center p-2 gap-2 ${selectedEvent === event ? "bg-[#516182]" : "bg-[#0b162a]"} rounded-full cursor-pointer w-full`} onClick={() => setSelectedEvent(event)}>
                    <p>{event.title}</p>
                    <button className='ml-auto rounded-full bg-red-600 w-6 h-6' onClick={()=>{openModal(event)}}>X</button>
                  </div>
                  ))}
                    <button 
                    className='bg-[#516182] rounded-full h-12 w-12 text-2xl font-extrabold'
                    onClick={() => {
                      const emptyEventData: EventData = {
                        id: null,
                        title: "",
                        description: "",
                        likedBy: [],
                        starttime: null,
                        endtime: null,
                        coverPhoto: "",
                        gallery: [],
                        keynotes: [],
                        schedule: [
                         ],
                        speakers: [],
                        sponsors: [],
                        type: "",
                        videos: [],
                        formLink: "",
                        registrationOpen: false,
                      };
                      setSelectedEvent(emptyEventData);
                      console.log(events);
                    }}
                    >
                    +
                    </button>
                </div>
                <div className='w-full min-h-[63vh] overflow-y-auto max-h-[63vh] overflow-x-hidden customScrollbar'>
                  {selectedEvent && (
                    <AdminEvent event={selectedEvent}/>
                  )}
                  
                </div>
                </div>
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>

      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered>
              <ModalOverlay />
              <ModalContent bg={"#151F33"}>
                <ModalHeader>Confirm Deletion</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to delete {modalItem && 'title' in modalItem ? modalItem.title : `${modalItem?.firstname} ${modalItem?.lastname}`}?
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={() => handleDeleteItem(modalItem as IdUserData | EventData | ArticleData)}>
                    Delete
                  </Button>
                  <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    </div>
  );
}
