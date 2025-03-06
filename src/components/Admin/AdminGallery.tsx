import addStorageMultiple from '../../firebase/addStorageMultiple';
import deleteStorage from '../../firebase/deleteStorage';
import { EventData } from '../../interfaces/EventData';

interface AdminGalleryProps {
  setUploading: (value: boolean) => void;
  event: EventData;
  setEvent: (value: EventData) => void;
}
export const AdminGallery: React.FC<AdminGalleryProps> = ({ event, setEvent, setUploading  }) => {
    const deleteImage = async (index: number) => {
        setUploading(true);
        function extractFileName(url: string) {
            try {
                const decodedUrl = decodeURIComponent(url);
                const fileNameWithParams = decodedUrl.split('/').pop();
                const fileName = fileNameWithParams ? fileNameWithParams.split('?')[0] : '';
                return fileName;
            } catch (error) {
                console.error("Error extracting file name:", error);
                return null;
            }
        }

        const fileName = extractFileName(event.gallery?.[index] || '');
        if (!fileName) {
            console.error("Failed to extract file name from URL");
            return;
        }

        try {
            await deleteStorage(`events/${event.title}/gallery/${fileName}`);
            const updatedGallery = event.gallery?.filter((_, i) => i !== index) || [];
            setEvent({ ...event, gallery: updatedGallery });
            setUploading(false);
        } catch (error) {
            console.error("Error deleting file from storage:", error);
        }
    };
  return (
    <>
    <div className="grid gap-4 p-4 w-full h-full" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
        {event.gallery?.map((image, index) => (
            <div key={index} className="gallery-item overflow-hidden rounded-lg shadow-lg w-24 h-24 relative">
                <button 
                onClick={() => deleteImage(index)}
                className='z-10 top-0 right-0 mt-1 mr-1 bg-red-600 absolute w-4 h-4 text-[10px] rounded-full border-2 border-black'><p className='-translate-y-[2px]'>X</p></button>
                <img src={image} alt={`Gallery item ${index + 1}`} className="w-full h-full object-cover z-0" />
                
            
            </div>
        ))}
    </div>
    <input
      type="file"
      multiple
      onChange={async (e) => {
        if (e.target.files) {
          setUploading(true);
          const files = Array.from(e.target.files);
          const urls = await addStorageMultiple(files, `events/${event.title}/gallery`);
          const newLinks = urls.map(url => url.link);
          setEvent({ ...event, gallery: [...(event.gallery || []), ...newLinks] });
          setUploading(false);
        }
      }}
      className="mt-4"
    />
    
    </>
  )
}
