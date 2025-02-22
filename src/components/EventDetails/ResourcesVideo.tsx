import { Link } from "react-router-dom"
import  React, { useState } from "react"
import { Ivideo } from "../../interfaces/EventData"
import {
  Td,
  Box,
  Image,
  Text
} from '@chakra-ui/react'

export const ResourceVideo : React.FC<Ivideo> = ({ thumbnail, name, length, speaker, url }) => {
  const maxLength = 30; // maximum charcters of video name.
  const [isHovered, setIsHovered] = useState(false);

  // trancuate the name of the video
  const trancuateName = name.length > maxLength? `${name.substring(0, maxLength)}...` : name;

  return (
    <Td>
      <Box position="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Link target='_blank' to={url}>
          {thumbnail
            ? <Image src={thumbnail} className='w-[32.6vh] h-[20vh] mb-3' ></Image> 
            : <Box className="flex bg-blue-950 w-[32.6vh] h-[20vh] mb-3"></Box>
          }
          <Text fontFamily={"SF-Pro-Display-Bold"} marginTop={"0.7vh"}>{trancuateName}</Text>
          <Text fontFamily={"SF-Pro"}>{length} • {speaker}</Text>
          {isHovered && name.length >= maxLength &&
            <Box
              position="absolute"
              backgroundColor="black"
              padding="5px"
              border="1px solid #ccc"
              zIndex="1"
              top="80%"
              left="45%"
              transform="translateX(-50%)"
            >{name}</Box>
          }
        </Link>
      </Box>
    </Td>
  );
}
