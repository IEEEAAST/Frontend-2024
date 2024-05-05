import l_Img from '../../assets/linkedin-white.png'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    TableContainer
  } from '@chakra-ui/react'
  import { Sponsor } from './Sponsor'


  export const Sponsors = () => {
    const img:string = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fautology.rs%2Ffajlovi%2Fproductbrand%2Fvaleo-valeo-logo_5a5137a8b439f.jpg&f=1&nofb=1&ipt=104cce7874de5eb8a6a657f3147ffcc5dd2aed720826721c9d44d6680d0fe13e&ipo=images";
    return (
      <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th></Th>
            <Th color={"fff"} fontWeight={"Bold"}>Name</Th>
            <Th color={"fff"} fontWeight={"Bold"}>Total Event Sponsored</Th>
            <Th color={"fff"} fontWeight={"Bold"}>Social</Th>
          </Tr>
        </Thead>
        <Tbody>
        <Sponsor sponsorImg={img} name={'valeo'} totalEventSponsored={24} linkSocial={l_Img} />
        <Sponsor sponsorImg={img} name={'valeo'} totalEventSponsored={24} linkSocial={l_Img} />
        <Sponsor sponsorImg={img} name={'valeo'} totalEventSponsored={24} linkSocial={l_Img} />
        <Sponsor sponsorImg={img} name={'valeo'} totalEventSponsored={24} linkSocial={l_Img} />
        <Sponsor sponsorImg={img} name={'valeo'} totalEventSponsored={24} linkSocial={l_Img} />
        <Sponsor sponsorImg={img} name={'valeo'} totalEventSponsored={24} linkSocial={l_Img} />
        <Sponsor sponsorImg={img} name={'valeo'} totalEventSponsored={24} linkSocial={l_Img} />

        </Tbody>
        <Tfoot>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}