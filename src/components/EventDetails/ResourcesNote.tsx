import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { Inote } from "../../interfaces/EventData";
import {
  Td,
  Box,
  Image,
  Text,
} from '@chakra-ui/react'

  export const ResourceNote : React.FC<Inote> = ({ thumbnail, name, url} )   => {
    const maxLength = 30; // Maximum number of characters
    // const [isValid, setIsValid] = useState(null);
    const [isHovered, setIsHovered] = useState(false);


    //truncate the name of the note beofer putting it.
    const truncateName = name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;



    return (
        <Td>
          <Box position="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link target='_blank' to={url}>
                {thumbnail? (
                  <Image src={thumbnail} className='w-[32.6vh] h-[20vh] mb-3' ></Image> 
                ) : (
                  <Box className="flex bg-blue-950 w-[32.6vh] h-[20vh] mb-3"></Box>
                )
              }
                <Text fontFamily={'SF-Pro-Display-Bold'}>{truncateName}</Text>
                {isHovered && name.length >= maxLength && (
                  <Box
                    position="absolute"
                    backgroundColor="black"
                    padding="5px"
                    border="1px solid #ccc"
                    zIndex="1"
                    top="80%"
                    left="50%"
                    transform="translateX(-50%)">
                    {name}
                  </Box>
        )}
            </Link>
          </Box>
        </Td>
  )
}