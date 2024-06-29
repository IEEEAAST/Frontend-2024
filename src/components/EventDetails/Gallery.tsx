import React, { useState } from 'react';
import { Stack, Image, Box, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from '@chakra-ui/react';
import person1 from '../../assets/person1.jpg';
import person2 from '../../assets/person2.jpg';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // repeat the images 28 times
  const images = Array.from({ length: 28 }, (_, index) => index % 2 === 0 ? person1 : person2);

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
    onOpen();
  };

  return (
    <>
      <Stack direction='row' alignItems='flex-start'>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '20px', gap: '1px' }}>
          {images.map((img, index) => (
            <Box key={index} w='150px' h='150px' bg='gray.100' overflow='hidden' margin='1px'>
              <Image
                boxSize='100%'
                objectFit='cover'
                src={img}
                alt={`person${index % 2 === 0 ? '1' : '2'}`}
                borderRadius='none'
                onClick={() => handleImageClick(img)}
                cursor='pointer'
              />
            </Box>
          ))}
        </div>
      </Stack>

      
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {selectedImage && (
              <Image src={selectedImage} alt="Selected" boxSize='100%' objectFit='cover' />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Gallery;
