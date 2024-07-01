import React, { useState } from 'react';
import { Stack, Image, Box, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from '@chakra-ui/react';

interface GalleryProps {
  images: string[] | null;
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
    onOpen();
  };

  return (
    <>
      <Stack direction='row' alignItems='flex-start'>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '20px', gap: '1px' }}>
          {images?.map((img, index) => (
            <Box key={index} w='150px' h='150px' bg='gray.100' overflow='hidden' margin='1px'>
              <Image
                boxSize='100%'
                objectFit='cover'
                src={img}
                alt={`Image ${index}`}
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
