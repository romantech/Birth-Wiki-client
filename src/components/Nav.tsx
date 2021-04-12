import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SidebarLogin from './SidebarLogin';
import SidebarMypage from './SidebarMypage';

function Nav({ isLogin }: any) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  console.log('Nav', isLogin);

  return (
    <Navbar>
      <Home to='/'>BirthWiki</Home>
      <SidebarsOpen to='#'>
        <FaBars onClick={showSidebar} />
      </SidebarsOpen>

      {sidebar ? (
        <NavSidebar>
          <SidebarsClose to='#'>
            <AiOutlineClose onClick={showSidebar} />
          </SidebarsClose>
          {isLogin ? <SidebarMypage /> : <SidebarLogin />}
        </NavSidebar>
      ) : (
        ''
      )}
    </Navbar>
  );
}

export default Nav;

const Navbar = styled.nav`
  background: #060b26;
  height: 80px;

  display: flex;
  justify-content: start;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Home = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin: 0 0 0 30px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const SidebarsOpen = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin 10px;
  position: absolute;
  right: 32px;
  height: 40px;
  font-size: 2rem;
  background: none;
  color: #fff;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const NavSidebar = styled.div`
  background-color: #060b26;
  display: none;
  width: 350px;
  right: 0;
  padding: 10px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  transition: 850ms;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const SidebarsClose = styled(Link)`
display: flex;
align-items: center;
font-size: 30px;
margin 10px;
position: absolute;
left: 32px;
height: 40px;
font-size: 2rem;
background: none;
color: #fff;
`;

// const NavbarContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   height: 80px;
//   z-index: 1;
//   width: 100%;
//   padding: 0 24px;
//   max-width: 1100px;
// `;

// const NavLogo = styled(Link)`
//   color: #fff;
//   justify-self: flex-start;
//   cursor: pointer;
//   font-size: 1.5rem;
//   display: flex;
//   align-items: center;
//   margin-left: 24px;
//   font-weight: bold;
//   text-decoration: none;
// `;

// const MobileIcon = styled.div`
//   display: none;

//   @media screen and (max-width: 768px) {
//     display: block;
//     position: absolute;
//     top: 0;
//     right: 0;
//     transform: translate(-100%, 60%);
//     font-size: 1.8rem;
//     cursor: pointer;
//     color: yellow;
//   }
// `;

// const Navmenu = styled.ul`
//   display: flex;
//   align-items: center;
//   list-style: none;
//   text-align: center;
//   margin-right: -22px;

//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;

// const NavItem = styled.li`
//   height: 80px;
// `;

// const NavBtn = styled.nav`
//   display: flex;
//   align-items: center;

//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;
