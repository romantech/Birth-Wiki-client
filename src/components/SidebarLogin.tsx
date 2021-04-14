import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import * as IconName from 'react-icons/fc';
import axios from 'axios';
import { validateEmail, validatePassword } from '../utils/validate';
import { setIsLogin, setUserInfo, setisSidbar } from '../actions/index';
import { RootState } from '../store/index';
import SidebarSignUp from './SidebarSignUp';

function SidebarLogin() {
  const state = useSelector((state: RootState) => state.loginReducer.isLogin);
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const sidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);

  const history = useHistory();
  const dispatch = useDispatch();

  const googleLoginHandler = () => {
    const GOOGLE_LOGIN_URL = '';
    window.location.assign(GOOGLE_LOGIN_URL);
  };
  const naverLoginHandler = () => {
    const NAVER_LOGIN_URL = '';
    window.location.assign(NAVER_LOGIN_URL);
  };
  const kakaoLoginHandler = () => {
    const KAKAO_LOGIN_URL = '';
    window.location.assign(KAKAO_LOGIN_URL);
  };
  //input 관련
  const [userSignInInfo, setUserSignInInfo] = useState({
    userEmail: '',
    password: '',
    isLogin: false,
    errorMsg: '',
  });

  const { userEmail, password, errorMsg, isLogin } = userSignInInfo;

  const inputHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSignInInfo({
      ...userSignInInfo,
      [key]: e.target.value,
    });
  };

  const homeLoginHandler = async () => {
    console.log(userEmail);
    console.log(password);
    console.log(errorMsg);

    if (!userEmail || !password) {
      return setUserSignInInfo({
        ...userSignInInfo,
        errorMsg: '❗️ 이메일과 비밀번호를 모두 입력하세요',
      });
    }

    if (!validateEmail(userEmail) || !validatePassword(password)) {
      return setUserSignInInfo({
        ...userSignInInfo,
        errorMsg: '❗️ 이메일 혹은 비밀번호가 올바르지 않습니다',
      });
    }

    if (userEmail !== userInfo.userEmail || password !== userInfo.password) {
      return setUserSignInInfo({
        ...userSignInInfo,
        errorMsg: '❗️ 이메일 혹은 비밀번호가 올바르지 않습니다',
      });
    } else if (userEmail === userInfo.userEmail && password === userInfo.password) {
      dispatch(setIsLogin(true));
    }
  };

  const signupHandler = () => {
    dispatch(setisSidbar(!sidebar));
    <Link to='/signup' />;
  };

  return (
    <LoginContainer>
      Login
      <SocialLoginContainer>
        <p>소셜 로그인</p>
        <SocialGoogle to='#' onClick={googleLoginHandler}>
          <IconName.FcGoogle />
        </SocialGoogle>
        <SocialNaver onClick={naverLoginHandler}>
          <img src='../naver.png' alt='naver' height='35px' />
        </SocialNaver>
        <SocialKakao onClick={kakaoLoginHandler}>
          <img src='../kakao.png' alt='kakao' height='35px' />
        </SocialKakao>
      </SocialLoginContainer>
      <EmailLoginContainer>
        <div>
          E-Mail
          <InputField
            type='email'
            value={userEmail}
            placeholder='이메일을 입력하세요'
            maxLength={30}
            onChange={inputHandler('userEmail')}
          ></InputField>
          Password
          <InputField
            type='password'
            value={password}
            placeholder='비밀번호를 입력하세요'
            maxLength={16}
            onChange={inputHandler('password')}
          />
          <HomeLogin type='submit' onClick={homeLoginHandler}>
            Login
          </HomeLogin>
          <HomeSignUp to='/signup' onClick={signupHandler}>
            Sign up
          </HomeSignUp>
          {errorMsg ? <ErrorMsg>{errorMsg}</ErrorMsg> : ''}
        </div>
      </EmailLoginContainer>
      <MyStoryContainer>
        나만의 기록
        <MyStoryList>로그인이 필요합니다.</MyStoryList>
      </MyStoryContainer>
    </LoginContainer>
  );
}

export default SidebarLogin;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 30px;
  height: 100vh;
  width: 300px;
  margin: 10px;
  top: 60px;
  overflow: scroll;
  position: fixed;
`;

const SocialLoginContainer = styled.div`
  font-size: 20px;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
  color: #fff;

  p {
    margin: 5px 0;
  }
`;

const SocialGoogle = styled(Link)`
  margin: 5px 0 5px 10px;
  font-size: 2em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const SocialNaver = styled.span`
  margin: 5px 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const SocialKakao = styled.span`
  margin: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const EmailLoginContainer = styled.div`
  font-size: 20px;
  color: #fff;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
`;

const InputField = styled.input`
  width: 90%;
  height: 40px;
  padding: 0.5rem;
  margin: 0.4rem;
  border: none;
  border-bottom: 2px solid #fff;
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
`;

const HomeLogin = styled.button`
  border-radius: 20px;
  background: rgba(6, 11, 38, 0.8);
  white-space: nowrap;
  width: 100px;
  padding: 10px 0;
  margin: 10px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(255, 255, 255, 0.8);
    color: #000;
  }
`;

const HomeSignUp = styled(Link)`
  border-radius: 20px;
  background: rgba(6, 11, 38, 0.8);
  white-space: nowrap;
  width: 100px;
  padding: 10px 25px;
  margin: 10px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: normal;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(255, 255, 255, 0.8);
    color: #000;
  }
`;

const MyStoryContainer = styled.div`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  height: 80px;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
`;

const MyStoryList = styled.div`
  color: #fff;
  margin: 10px 0;
  font-size: 15px;
  height: 30%;
`;

const ErrorMsg = styled.div`
  font-size: 15px;
`;
