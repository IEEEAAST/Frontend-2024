import React, { useContext } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Avatar, Button, border } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import SignOut from '../../firebase/signout';

const ProfileMenu = () => {
    const { userData, setUserData } = useContext(UserContext);
  return (
    <Menu>
      <MenuButton>
        <Avatar size="md" src={userData?.link? `${userData.link}` : "src/assets/add-profile-picture-white@2x.png"}/>
      </MenuButton>
      <MenuList bg={'#00091A'} color={"white"} className='text-xl'>
      <div className='px-3 text-3xl'>{`${userData?.firstname} ${userData?.lastname}`}</div>
        <Link to={"/profile"}><MenuItem bg={'#151F33'} border={'1px solid #00091A'} _focus={{bg:'#1e2c48'}}>Profile</MenuItem></Link>
        <MenuItem bg={'#151F33'} border={'1px solid #00091A'} _focus={{bg:'#1e2c48'}} onClick={userData?()=>{SignOut();window.location.href="/"}:()=>{}}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;