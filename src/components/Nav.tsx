import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SidebarLogin from './SidebarLogin';
import SidebarMypage from './SidebarMypage';
import { RootState } from '../store/index';
import { setIsSidbar, setIsLogin, setIsSignup } from '../actions';
import { FcLike } from 'react-icons/fc';
import axios from 'axios';

function Nav({ isLogin }: any) {
  const sidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);
  const dispatch = useDispatch();
  const showSidebar = () => {
    dispatch(setIsSidbar(!sidebar));
  };

  useEffect(() => {
    console.log(localStorage.getItem('source'));
    const url = new URL(window.location.href);
    const AuthorizationCode = url.searchParams.get('code');
    console.log('AuthorizationCode', AuthorizationCode);

    if (AuthorizationCode) {
      axios({
        url: 'https://server.birthwiki.space/user/login',
        method: 'post',
        data: {
          AuthorizationCode,
          source: `${localStorage.getItem('source')}`,
        },
        withCredentials: true,
      }).then((res) => {
        console.log(res);
        dispatch(setIsLogin(true));
        //setAt(res.data.data.accessToken)
      });
    }
  });

  return (
    <Navbar>
      <Home to='/'>BirthWiki</Home>
      <SidebarsOpen to='#'>
        <FaBars onClick={showSidebar} />
      </SidebarsOpen>

      <Favorite to='myFavorite'>
        <FcLike />
      </Favorite>
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
  height: 70px;
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
  margin: 10px 30px;
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
  background-color: rgba(6, 11, 38, 0.8);

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
  z-index: 100;
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

const Favorite = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin: 10px;
  position: absolute;
  right: 80px;
  height: 40px;
  font-size: 2rem;
  background: none;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
