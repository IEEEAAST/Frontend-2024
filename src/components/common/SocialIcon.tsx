import { IoLogoLinkedin, IoLogoFacebook, IoLogoInstagram } from 'react-icons/io';
import {Social} from '../../interfaces/userData'
interface SocialIconProps {
    social: Social;
  }
export const SocialIcon = ({ social }: SocialIconProps) => {
    return (
        <a href={social.url} target="_blank" rel="noreferrer" className='w-12 h-12 transform transition-transform duration-200 hover:scale-125'>
            {social.name === "Facebook" && <IoLogoFacebook className='w-full h-full' />}
            {social.name === "Instagram" && <IoLogoInstagram className='w-full h-full' />}
            {social.name === "LinkedIn" && <IoLogoLinkedin className='w-full h-full'/>}
        </a>
    )
}
