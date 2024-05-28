import { Link } from "react-router-dom"
import {
  Td,
  Box,
  Image,
  Text
} from '@chakra-ui/react'

interface VideoProps {
  thumbNail: string; //url to the thumbnail
  vidName: string; //name of the video
  vidLength: string; //the length of the video
  speakerName: string; //name of the speaker
  destUrl: string;  //the link to the video
}

  export const ResourceVideo = ({ thumbNail, vidName, vidLength, speakerName, destUrl }: VideoProps) => {
    return (
        <Td>
            <Box><Link target='_blank' to={destUrl}>
                    <Image src={thumbNail} width={"150px"}></Image>
                    <Text>{vidName}</Text>
                    <Text>{vidLength} . {speakerName}</Text>
                </Link></Box></Td>
  )
}