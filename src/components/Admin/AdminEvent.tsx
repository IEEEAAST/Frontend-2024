import { useState, useEffect, useContext } from 'react';
import firebase from "firebase/compat/app";
import { EventData } from '../../interfaces/EventData';
import addStorage from '../../firebase/addStorage';
import { Accordion, AccordionItem, AccordionButton, Spinner, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import AdminSchedule from './AdminSchedule';
import { AdminSponsors } from './AdminSponsors';
import { AdminResources } from './AdminResources';
import { AdminGallery } from './AdminGallery';
import { createContext } from 'react';
import updateData from '../../firebase/updateData';
import {useNavigate} from 'react-router-dom';

interface AdminEventProps {
    event: EventData;
}
const eventTypes =[ "AI", "Database", "Game", "Media", "Mobile", "Other", "Python", "Security", "Technical", "Web"];
interface EventDataContextProps {
    eventData: EventData;
    setEventData: React.Dispatch<React.SetStateAction<EventData>>;
}

const convertDate = (date:firebase.firestore.Timestamp|null) => {
    return date?.toDate().toISOString().slice(0, 16)||null;
}

const AdminEvent: React.FC<AdminEventProps> = ({ event }) => {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState<EventData>({
        ...event,
        title: event.title || '',
        formLink: event.formLink || '',
        description: event.description || '',
        type: event.type || eventTypes[0],
        starttime: event.starttime || null,
        endtime: event.endtime || null,
        coverPhoto: event.coverPhoto || '',
        registrationOpen: event.registrationOpen || false,
        schedule: event.schedule || [],
        gallery: event.gallery || [],
    });
    const [uploading, setUploading] = useState(false);
    useEffect(() => {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            (fileInput as HTMLInputElement).value = '';
        }
    }, [event]);

    useEffect(() => {
        setEventData(event);
    }, [event]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Handle datetime-local input for starttime and endtime
        if (name === 'starttime' || name === 'endtime') {
            const dateValue = value ? firebase.firestore.Timestamp.fromDate(new Date(value)) : null;
            setEventData({ ...eventData, [name]: dateValue });
        } else {
            setEventData({ ...eventData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const {result,error} = await updateData('events', eventData.id, eventData);
        if (error) {
            console.error(error);
        } else {
            window.alert('Event updated successfully');
            navigate(`/event/${eventData.title}`);
        }
    };

    const uploadCover = async (file: File) => {
        setUploading(true);
        await addStorage(file, `events/${eventData.title}`).then((res) => {
            setUploading(false);
            setEventData({ ...eventData, coverPhoto: res.link });
        });
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4  rounded shadow-md'>
            <label className='flex flex-col'>
                <span className='mb-2 font-semibold'>Title</span>
                <input 
                    type="text" 
                    name="title" 
                    onChange={handleChange} 
                    value={eventData.title || ''} 
                    className='p-2 rounded bg-gray-800'
                />
            </label>
            <div className='flex gap-4'>
            <label className='flex flex-col'>
                <span className='mb-2 font-semibold'>Form Link</span>
                <input type="text"
                    name="formLink"
                    onChange={handleChange}
                    value={eventData.formLink || ''}
                    className='p-2 rounded bg-gray-800'
                />
            </label>
            <label className='flex h-fit gap-2 mb-auto mt-10'>
                <span className='font-semibold'>Registration Open?</span>
                <input type="checkbox"
                    name="registrationOpen"
                    checked={eventData.registrationOpen}
                    onChange={(e) => setEventData({ ...eventData, registrationOpen: e.target.checked })}
                    className='p-2 rounded bg-gray-800 w-6'
                />
            </label>
            </div>
            <label className='flex flex-col'>
                <span className='mb-2 font-semibold'>Description</span>
                <textarea 
                    name="description" 
                    value={eventData.description || ''} 
                    onChange={handleChange} 
                    className='p-2 rounded bg-gray-800 h-40 resize-none'
                />
            </label>
            <div>
                <label className='font semibold'>Cover Photo</label>
                <input
                    type='file'
                    accept='image/*'
                    onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                            await uploadCover(e.target.files[0]);
                        }
                    }}
                    className='mt-1 block w-full text-white'
                />
                {eventData.coverPhoto && (
                    <img src={eventData.coverPhoto} alt='Profile' className='mt-2 w-20 h-20 rounded-md' />
                )}
            </div>
            <label className='flex flex-col'>
                <span className='mb-2 font-semibold'>Type</span>
                <select 
                    name="type" 
                    value={eventData.type} 
                    onChange={handleChange} 
                    className='p-2 rounded bg-gray-800'
                >
                    {eventTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </label>
            <label className='flex flex-col'>
                <span className='mb-2 font-semibold'>Start Time</span>
                <input 
                    type="datetime-local" 
                    name="starttime" 
                    value={convertDate(eventData.starttime) || ''}
                    onChange={handleChange} 
                    className='p-2 rounded bg-gray-800'
                />
            </label>
            <label className='flex flex-col'>
                <span className='mb-2 font-semibold'>End Time</span>
                <input 
                    type="datetime-local" 
                    name="endtime" 
                    value={convertDate(eventData.endtime) || ''}
                    onChange={handleChange} 
                    className='p-2 rounded bg-gray-800'
                />
            </label>
            <Accordion allowMultiple>
                <AccordionItem>
                    <AccordionButton>
                        Schedule
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                    <AdminSchedule event={eventData} setEvent={setEventData} />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        Sponsors
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <AdminSponsors event={eventData} setEvent={setEventData}/>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        Resources
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <AdminResources event={eventData} setEvent={setEventData} setUploading={setUploading} />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        Gallery
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <AdminGallery event={eventData} setEvent={setEventData} setUploading={setUploading} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <div className='flex gap-4 w-full items-center'>
            <button type="submit" className={`p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 ${uploading && "opacity-25 cursor-not-allowed"}`} disabled={uploading}>
                Submit
            </button>
            <Spinner size='lg' hidden={!uploading} className='mt-4'/>
            </div>
        </form>
    );
};

export default AdminEvent;
