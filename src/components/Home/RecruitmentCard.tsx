import React from 'react';
import Facebook from '../../assets/facebook.png';
import Instagram from '../../assets/instagram-white@2x.png';
import LinkedIn from '../../assets/linkedin-white@2x.png';
import YouTube from '../../assets/youtube.png';
import TikTok from '../../assets/tik-tok.png';

const socials = [
    { name: 'Facebook', icon: Facebook, link: 'https://www.facebook.com/' },
    { name: 'Instagram', icon: Instagram, link: 'https://www.instagram.com/' },
    { name: 'LinkedIn', icon: LinkedIn, link: 'https://www.linkedin.com/' },
    { name: 'YouTube', icon: YouTube, link: 'https://www.youtube.com/' },
    { name: 'TikTok', icon: TikTok, link: 'https://www.tiktok.com/' },
];

export const RecruitmentCard = () => (
    <div className='bg-[#D3E4F5] text-black w-[calc(100%-150px)] sm:w-fit p-4 mt-4 rounded-2xl flex flex-col'>
        {<>
        <h1 className='font-black text-3xl mb-4'>Heads Up!</h1>
        <p className='text-sm font-display'>
            We're currently recruiting new volunteers right now!
            <br />You can register here:
        </p>
        <button className='bg-white rounded-full py-2 px-6 font-black border-2 border-[#a2bdd6] w-40 text-xs'>
            Volunteer
        </button>
        <div className='w-full mt-4 h-0 border opacity-10 border-black'></div>
        </>
        }
        <p className='font-textmedium font-extrabold text-lg mt-2 text-center'>
            Connect with us on our socials!
        </p>
        <div className='flex justify-center mt-2 gap-2'>
            {socials.map((social, index) => (
                <a href={social.link} key={index} target='_blank' rel='noreferrer'>
                    <div className='rounded-full bg-white h-10 w-10 flex items-center justify-center p-[7px] border-black border-2'>
                        <img
                            src={social.icon}
                            alt={social.name}
                            className={`mx-2 ${['Instagram', 'LinkedIn'].includes(social.name) && 'invert'}`}
                        />
                    </div>
                </a>
            ))}
        </div>
    </div>
);
