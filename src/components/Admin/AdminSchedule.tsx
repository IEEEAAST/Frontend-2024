import React, { useEffect, useState } from 'react';
import { EventData, Schedule } from '../../interfaces/EventData';
import getCollection from '../../firebase/getCollection';
import { Button, IconButton, LightMode } from '@chakra-ui/react';
import { IoIosAdd } from 'react-icons/io';

interface AdminScheduleProps {
  event: EventData;
  setEvent: (event: EventData) => void;
}
interface Speaker {
  name: string;
  id: string;
}

const AdminSchedule: React.FC<AdminScheduleProps> = ({ event, setEvent }) => {
  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
  const [newScheduleItem, setNewScheduleItem] = useState<Schedule>({
    title: '',
    speaker: '',
    starting: '',
    duration: ''
  });

  useEffect(() => {
    const fetchSpeakers = async () => {
      const speakersCollection = await getCollection('speakers');
      const speakersWithIds = speakersCollection.result?.map((speaker, index) => ({
        name: speaker.name,
        id: speakersCollection.ids ? speakersCollection.ids[index] : ''
      }));
      setSpeakerList(speakersWithIds || []);
    };
    fetchSpeakers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedScheduleList = [...(event.schedule || [])];
      updatedScheduleList[index] = { ...updatedScheduleList[index], [name]: value };
      setEvent({ ...event, schedule: updatedScheduleList });
    } else {
      setNewScheduleItem({ ...newScheduleItem, [name]: value });
    }
  };

  const handleAddScheduleItem = () => {
    setEvent({ ...event, schedule: [...(event.schedule || []), newScheduleItem] });
    setNewScheduleItem({ title: '', speaker: '', starting: '', duration: '' });
  };

  const handleRemoveScheduleItem = (index: number) => {
    const updatedScheduleList = event.schedule ? event.schedule.filter((_, i) => i !== index) : [];
    setEvent({ ...event, schedule: updatedScheduleList });
  };

  return (
    <div>
      {(event.schedule?.length === 0 || !event.schedule)
        ? <p>Schedule is currently empty.</p>
        : <table className="border-collapse">
          <thead>
            <tr>
              <th className="py-2 border border-gray-700 text-center">Title</th>
              <th className="py-2 border border-gray-700 text-center">Speaker</th>
              <th className="py-2 border border-gray-700 text-center">Starting</th>
              <th className="py-2 border border-gray-700 text-center">Duration</th>
              <th className="py-2 border border-gray-700 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {event.schedule.map((scheduleItem, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2 border border-gray-700 text-center">
                  <input
                    type="text"
                    name="title"
                    value={scheduleItem.title}
                    onChange={(e) => handleInputChange(e, index)}
                    className="py-2 rounded bg-gray-800 mt-1 text-center"
                  />
                </td>
                <td className="py-2 border border-gray-700 text-center">
                  <select
                    name="speaker"
                    value={scheduleItem.speaker}
                    onChange={(e) => handleInputChange(e, index)}
                    className="py-2 rounded bg-gray-800 mt-1 text-center"
                  >
                    {speakerList.map((speaker) => (
                      <option key={speaker.id} value={speaker.name}>
                        {speaker.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-2 border border-gray-700 text-center">
                  <input
                    type="text"
                    name="starting"
                    value={scheduleItem.starting}
                    onChange={(e) => handleInputChange(e, index)}
                    className="py-2 rounded bg-gray-800 mt-1 text-center w-40"
                  />
                </td>
                <td className="py-2 border border-gray-700 text-center">
                  <input
                    type="text"
                    name="duration"
                    value={scheduleItem.duration}
                    onChange={(e) => handleInputChange(e, index)}
                    className="p-2 rounded bg-gray-800 mt-1 text-center w-40"
                  />
                </td>
                <td className="py-2 border border-gray-700 text-center">
                  <LightMode><Button
                    onClick={() => handleRemoveScheduleItem(index)}
                    className="p2"
                    colorScheme='red'
                  >
                    Delete
                  </Button></LightMode>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      <div className="mt-4">
        <IconButton 
          aria-label='Add Event'
          onClick={handleAddScheduleItem} 
          size='sm'
          icon={<IoIosAdd />}
          fontSize='20px'
          isRound={true}
        />
      </div>
    </div>
  );
};

export default AdminSchedule;
