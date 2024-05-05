import { Link } from "react-router-dom"
import {
  Td,
  Box,
  Image,
  Text
} from '@chakra-ui/react'

interface NoteProps {
  thumbNail: string; //url to the thumbnail of the note
  noteName: string; //name of the note
  destUrl: string; //url to the the note
}

  export const ResourceNote = ({ thumbNail, noteName, destUrl}: NoteProps) => {
    return (
        <Td><Box><Link target='_blank' to={destUrl}>
       
                <Image src={thumbNail} width={"150px"}></Image>
                <Text>{noteName}</Text>
                </Link></Box></Td>
  )
}