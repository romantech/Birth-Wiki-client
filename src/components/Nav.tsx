import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SidebarLogin from './SidebarLogin';
import SidebarMypage from './SidebarMypage';
import { RootState } from '../store/index';
import { setIsSidbar, setIsLogin, setIsSignup, setUserInfo, setGuestModal } from '../actions';
import axios from 'axios';
import GuestModal from './GuestModal';

function Nav() {
  const isSidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const isGuest = useSelector((state: RootState) => state.guestReducer.isGuest);
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

  const modalHandler = () => {
    if (!isLogin && !isGuest) {
      dispatch(setGuestModal(true));
    }
    if (isGuest || isLogin) {
      window.location.href = `${process.env.REACT_APP_CLIENT_URL}/myFavorite`;
    }
  };

  return (
    <Navbar>
      <Home onClick={clickHandler}>
        <img className='logo' src='../logo.png' alt='logo' />
      </Home>
      <SidebarsOpen onClick={showSidebar} />

      <Favorite onClick={modalHandler}>
        <div>
          {isGuest || isLogin ? (
            userInfo.profileImage ? (
              <UserPoto src={`${userInfo.profileImage}`} />
            ) : (
              <UserPoto src={`${process.env.PUBLIC_URL}/img/profile.png`} />
            )
          ) : null}
        </div>
      </Favorite>
      {isSidebar ? (
        <NavSidebar>
          <SidebarsClose onClick={showSidebar} />
          {isLogin || isGuest ? <SidebarMypage /> : <SidebarLogin />}
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
  }
`;

const Home = styled.button`
  background: #060b26;
  display: flex;
  align-items: center;
  font-size: 30px;
  margin: 10px 20px;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    margin: 10px 20px;
  }
  & .logo {
    width: 10rem;
    vertical-align: middle;
  }
`;

const SidebarsOpen = styled(FaBars)`
  display: flex;
  align-items: center;
  position: absolute;
  right: 30px;
  height: 40px;
  font-size: 2rem;
  background: none;
  color: #fff;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    right: 20px;
  }
`;

const NavSidebar = styled.div`
  background-color: rgba(6, 11, 38, 0.8);
  position: relative;
  display: none;
  width: 350px;
  right: 0;
  padding: 10px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  z-index: 3;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const SidebarsClose = styled(AiOutlineClose)`
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
  cursor: pointer;
`;

const Favorite = styled.button`
  display: flex;
  align-items: center;
  position: absolute;
  right: 70px;
  height: 40px;
  font-size: 30px;
  background: none;
  color: #eee;
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    right: 60px;
    & .mypage {
      display: none;
    }
    & .mypage2 {
      display: flex;
    }
  }
`;

const UserPoto = styled.img`
  font-size: 60px;
  height: 40px;
  width: 40px;
  color: #fff;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
