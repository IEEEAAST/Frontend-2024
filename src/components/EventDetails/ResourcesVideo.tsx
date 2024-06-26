import { Link } from "react-router-dom"
import {
  Td,
  Box,
  Image,
  Text
} from '@chakra-ui/react'

interface VideoProps {
  thumbNail: string; //url to the thumbnail
  vidName: string | null | undefined; //name of the video
  vidLength: string | null | undefined; //the length of the video
  speakerName: string | null | undefined; //name of the speaker
  destUrl: string;  //the link to the video
}

  export const ResourceVideo = ({ thumbNail, vidName, vidLength, speakerName, destUrl }: VideoProps) => {
    return (
        <Td>
            <Box><Link target='_blank' to={destUrl}>
                    <Image src={thumbNail} width={"33vh"} height={"20vh"}></Image>
                    <Text fontFamily={"SF-Pro-Display-Bold"} marginTop={"0.7vh"}>{vidName}</Text>
                    <Text fontFamily={"SF-Pro"}>{vidLength} • {speakerName}</Text>
                </Link></Box></Td>
  )
}