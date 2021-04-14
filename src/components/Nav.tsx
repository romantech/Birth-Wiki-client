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
  margin: 10px;
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
  margin: 10px;
  position: absolute;
  left: 32px;
  height: 40px;
  font-size: 2rem;
  background: none;
  color: #fff;
`;
