import React from 'react';

const images = [
  'https://picsum.photos/285/300',
  'https://picsum.photos/285/612',
  'https://picsum.photos/370/300',
  'https://picsum.photos/750/300',
];

const EventHighlights = () => {
  return (
    <>
      <div className="flex flex-col items-start w-full container mx-auto">
        <p className="font-bold text-[45px] mb-5 w-full mt-20">Event Highlights</p>
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-[285px_445px_370px_370px] gap-4 p-4">
            <div className="col-span-1 row-span-1" style={{ height: '300px' }}>
              <img src={images[0]} alt="Image 1" className="object-cover w-full h-full border rounded-xl" />
            </div>
            <div className="col-span-1 row-span-2" style={{ height: '615px' }}>
              <img src={images[1]} alt="Image 2" className="object-cover w-full h-full border rounded-xl" />
            </div>
            <div className="col-span-1 row-span-1" style={{ height: '300px' }}>
              <img src={images[2]} alt="Image 3" className="object-cover w-full h-full border rounded-xl" />
            </div>
            <div className="col-span-1 row-span-1" style={{ height: '300px' }}>
              <img src={images[2]} alt="Image 4" className="object-cover w-full h-full border rounded-xl" />
            </div>
            <div className="col-span-1 row-span-1" style={{ height: '300px' }}>
              <img src={images[0]} alt="Image 5" className="object-cover w-full h-full border rounded-xl" />
            </div>
            <div className="col-span-2 row-span-1" style={{ height: '300px' }}>
              <img src={images[3]} alt="Image 6" className="object-cover w-full h-full border rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventHighlights;
