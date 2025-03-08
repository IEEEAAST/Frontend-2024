import { EventData, Inote } from '../../interfaces/EventData'
import { Ivideo } from '../../interfaces/EventData'
import addStorage from '../../firebase/addStorage';
import { IconButton } from '@chakra-ui/react';
import { IoIosAdd } from 'react-icons/io';

interface AdminResourcesProps {
  event: EventData;
  setEvent: (value: EventData) => void;
  setUploading: (value: boolean) => void;
}

export const AdminResources = ({ event, setEvent, setUploading }: AdminResourcesProps) => {

  const handleAddVideo = () => {
    const updatedVideos = [...(event.videos || []), { name: '', length: '', speaker: '', thumbnail: '', url: '' }];
    setEvent({ ...event, videos: updatedVideos });
  }

  const handleAddKeynote = () => {
    const updatedKeynotes = [...(event.keynotes || []), { name: '', thumbnail: '', url: '' }];
    setEvent({ ...event, keynotes: updatedKeynotes });
  }

  const handleDeleteKeynote = (index: number) => {
    if (!event.keynotes || event.keynotes.length <= 0) return;
    const updatedKeynotes = event.keynotes.filter((_, i) => i !== index);
    setEvent({ ...event, keynotes: updatedKeynotes });
  }

  const handleDeleteVideo = (index: number) => {
    if (!event.videos || event.videos.length <= 0) return;
    const updatedVideos = event.videos.filter((_, i) => i !== index);
    setEvent({ ...event, videos: updatedVideos });
  }

  const uploadThumbnail = async (file: File, item: Inote | Ivideo) => {
    setUploading(true);
    await addStorage(file, `events/${event.title}/resources`).then((res) => {
      setUploading(false);
      item.thumbnail = res.link;
      setEvent({ ...event });
    });
  };

  return (
    <div>
      <h1 className='font-extrabold text-2xl mb-6'>Keynotes</h1>
      {event.keynotes && event.keynotes.map((keynote, index) => (
        <div key={index}>
          <label className='flex flex-col'>
            <span className='mb-2 font-semibold'>Name</span>
            <input type="text" className='p-2 rounded bg-gray-800' value={keynote.name}
              onChange={(e) => {
                const updatedKeynotes = [...(event.keynotes || [])];
                updatedKeynotes[index].name = e.target.value;
                setEvent({ ...event, keynotes: updatedKeynotes });
              }} />
          </label>
          <label className='flex flex-col'>
            <span className='mb-2 font-semibold'>Thumbnail</span>
            <input
              type="file"
              className='p-2 rounded bg-gray-800'
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  uploadThumbnail(e.target.files[0], keynote);
                }
              }}
            />
            <img src={keynote.thumbnail ?? ''} alt="Thumbnail" className='mt-2 w-[177px] h-[100px]' />
          </label>
          <label className='flex flex-col'>
            <span className='mb-2 font-semibold'>URL</span>
            <input
              type="text"
              className='p-2 rounded bg-gray-800'
              value={keynote.url}
              onChange={(e) => {
                const updatedKeynotes = [...(event.keynotes) || []];
                updatedKeynotes[index].url = e.target.value;
                setEvent({ ...event, keynotes: updatedKeynotes });
              }}
            />
          </label>
          <button
            type="button"
            className='bg-red-500 rounded-full h-8 w-8 text-xl font-extrabold mt-4'
            onClick={() => handleDeleteKeynote(index)}
          >
            -
          </button>
        </div>
      ))}
      <IconButton 
        aria-label='Add Keynote'
        onClick={() => handleAddKeynote()}
        size='sm'
        icon={<IoIosAdd />}
        fontSize='20px'
        isRound={true}
      />
      <hr className='mt-6'></hr>
      <h1 className='font-extrabold text-2xl my-6'>Videos</h1>
      {event.videos && event.videos.map((video, index) => (
        <div key={index}>
          <label className='flex flex-col'>
            <span className='mb-2 font-semibold'>Title</span>
            <input type="text" className='p-2 rounded bg-gray-800' value={video.name}
              onChange={(e) => {
                const updatedVideos = [...(event.videos) || []];
                updatedVideos[index].name = e.target.value;
                setEvent({ ...event, videos: updatedVideos });
              }}
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-2 font-semibold'>Length</span>
            <input type="text" className='p-2 rounded bg-gray-800' value={video.length}
              onChange={(e) => {
                const updatedVideos = [...(event.videos) || []];
                updatedVideos[index].length = e.target.value;
                setEvent({ ...event, videos: updatedVideos });
              }}
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-2 font-semibold'>Speaker</span>
            <input type="text" className='p-2 rounded bg-gray-800' value={video.speaker}
              onChange={(e) => {
                const updatedVideos = [...(event.videos) || []];
                updatedVideos[index].speaker = e.target.value;
                setEvent({ ...event, videos: updatedVideos });
              }}
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-2 font-semibold'>Thumbnail</span>
            <input
              type="file"
              className='p-2 rounded bg-gray-800'
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  uploadThumbnail(e.target.files[0], video);
                }
              }}
            />
            <img src={video.thumbnail ?? ''} alt="Thumbnail" className='mt-2 w-[177px] h-[100px]' />
          </label>
          <label className='flex flex-col'>
            <span className='mb-2 font-semibold'>URL</span>
            <input type="text" className='p-2 rounded bg-gray-800' value={video.url}
              onChange={(e) => {
                const updatedVideos = [...(event.videos) || []];
                updatedVideos[index].url = e.target.value;
                setEvent({ ...event, videos: updatedVideos });
              }}
            />
          </label>
          <button
            type="button"
            className='bg-red-500 rounded-full h-8 w-8 text-xl font-extrabold mt-4'
            onClick={() => handleDeleteVideo(index)}
          >
            -
          </button>
          
        </div>
      ))}
      <IconButton 
        aria-label='Add Video'
        onClick={() => handleAddVideo()}
        size='sm'
        icon={<IoIosAdd />}
        fontSize='20px'
        isRound={true}
      />
    </div>
  );
}
