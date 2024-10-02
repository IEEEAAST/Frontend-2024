import React, { useEffect } from 'react';
import getCollection from '../../firebase/getCollection';
interface EventHighlight{
  index: number;
  url: string;
}

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const EventHighlights = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [images, setImages] = React.useState<string[]>([]);
  useEffect(() => {
  getCollection('highlights').then((data) => {
    const sortedHighlights = (data.result || []).sort((a: EventHighlight, b: EventHighlight) => a.index - b.index);
    console.log(sortedHighlights);
    setImages(sortedHighlights.map((highlight: EventHighlight) => highlight.url));
  });
},[])
  const onClose = () => setIsOpen(false);
  const onOpen = (img:string) =>{
    setIsOpen(true);
    setSelectedImage(img);
  }

  return (
    <>
      <div className="flex flex-col items-start w-full container mx-auto">
        <p className="font-bold text-[2rem] md:text-[3rem] lg:text-[3rem] mb-5 w-full mt-20 text-center">Event Highlights</p>
        <div className="">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:size-[70rem] gap-4 p-10">
            <div onClick={()=>{onOpen(images[0])}} className="cursor-pointer">
              <img src={images[1]} alt="Image 1" className="object-cover border rounded-xl"/>
            </div>
            <div onClick={()=>{onOpen(images[1])}} className="cursor-pointer">
              <img src={images[1]} alt="Image 2" className="object-cover w-full border rounded-xl"/>
            </div>
            <div onClick={()=>{onOpen(images[2])}} className="cursor-pointer">
              <img src={images[1]} alt="Image 3" className="object-cover w-full border rounded-xl"/>
            </div>
            <div onClick={()=>{onOpen(images[3])}} className="cursor-pointer">
              <img src={images[0]} alt="Image 4" className="object-cover w-full border rounded-xl"/>
            </div>
            <div onClick={()=>{onOpen(images[4])}} className="cursor-pointer">
              <img src={images[3]} alt="Image 5" className="object-cover w-full border rounded-xl"/>
            </div>
            <div onClick={()=>{onOpen(images[5])}} className="cursor-pointer">
              <img src={images[5]} alt="Image 6" className="object-cover w-full border rounded-xl"/>
            </div>
            </div>
          </div>
        </div>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img src={selectedImage} alt="Selected Image" className="object-cover w-full h-full border rounded-xl" />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventHighlights;
