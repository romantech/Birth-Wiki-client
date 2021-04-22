import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SidebarLogin from './SidebarLogin';
import SidebarMypage from './SidebarMypage';
import { RootState } from '../store/index';
import { setIsSidbar, setIsLogin, setIsSignup, setUserInfo } from '../actions';
import { FcLike } from 'react-icons/fc';
import axios from 'axios';

function Nav() {
  const isSidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = new URL(window.location.href);
    const AuthorizationCode = url.searchParams.get('code');

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
        dispatch(setUserInfo(res.data.data));
        dispatch(setIsLogin(true));
      });
    }
  }, []);

  const showSidebar = () => {
    dispatch(setIsSidbar(!isSidebar));
  };

  const clickHandler = () => {
    window.location.replace('/');
  };

  return (
    <Navbar>
      <Home onClick={clickHandler}>
        <img className='logo' src='../logo_1.png' alt='logo' />
      </Home>
      <SidebarsOpen to='#'>
        <FaBars onClick={showSidebar} />
      </SidebarsOpen>

      <Favorite to='/myFavorite'>
        MyPage
        <FcLike />
      </Favorite>

      {isSidebar ? (
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

const Home = styled.button`
  background: #060b26;
  display: flex;
  align-items: center;
  font-size: 30px;
  margin: 10px 30px;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
  & .logo {
    width: 12rem;
    vertical-align: middle;
  }
`;

const SidebarsOpen = styled(Link)`
  display: flex;
  align-items: center;
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
  margin: 10px;
  position: absolute;
  right: 80px;
  height: 40px;
  font-size: 25px;
  background: none;
  color: #eee;
  text-decoration: none;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
