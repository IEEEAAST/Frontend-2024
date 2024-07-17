import React, { useContext } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Avatar, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import SignOut from '../../firebase/signout';

const ProfileMenu = () => {
    const { userData, setUserData } = useContext(UserContext);
  return (
    <Menu>
      <MenuButton>
        <Avatar size="sm" src={userData?.link? `${userData.link}` : "src/assets/add-profile-picture-white@2x.png"}/>
      </MenuButton>
      <MenuList background={"black"}>
        <Link to={"/profile"}><MenuItem>Profile</MenuItem></Link>
        <MenuItem onClick={userData?()=>{SignOut();window.location.href="/"}:()=>{}}>SignOut</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;