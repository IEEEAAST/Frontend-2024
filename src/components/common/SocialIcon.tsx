import { IoLogoLinkedin, IoLogoFacebook, IoLogoInstagram } from 'react-icons/io';
import {Social} from '../../interfaces/userData'
interface SocialIconProps {
    social: Social;
  }
export const SocialIcon = ({ social }: SocialIconProps) => {
    return (
        <a href={social.url} target="_blank" rel="noreferrer">
            {social.name === "Facebook" && <IoLogoFacebook className='w-10 h-10' />}
            {social.name === "Instagram" && <IoLogoInstagram className='w-10 h-10' />}
            {social.name === "LinkedIn" && <IoLogoLinkedin className='w-10 h-10 '/>}
        </a>
    )
}
