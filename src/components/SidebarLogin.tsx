import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import * as IconName from 'react-icons/fc';
import axios from 'axios';
import { setIsLogin, setUserInfo, setIsSidbar, setIsSignup } from '../actions/index';
import { RootState } from '../store/index';
import dotenv from 'dotenv';
dotenv.config();

function SidebarLogin() {
  const dispatch = useDispatch();

  const googleLoginHandler = () => {
    localStorage.setItem('source', 'google');
    const url = 'https://accounts.google.com/o/oauth2/auth';
    const client_id = `client_id=${process.env.REACT_APP_G_CLIENTID}`;
    const redirect_uri = `redirect_uri=https://localhost:3000`;
    const scope =
      'scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    const response_type = 'response_type=code';
    const access_type = 'access_type=offline';
    const GOOGLE_URL = `${url}?${client_id}&${redirect_uri}&${scope}&${response_type}&${access_type}`;

    window.location.assign(GOOGLE_URL);
  };
  const naverLoginHandler = () => {
    localStorage.setItem('source', 'naver');
    const url = 'https://nid.naver.com/oauth2.0/authorize';
    const client_id = `client_id=${process.env.REACT_APP_N_CLIENTID}`;
    const redirect_uri = `redirect_uri=${process.env.REACT_APP_URI_REDIRECT}`;
    const response_type = 'response_type=code';
    const NAVER_URL = `${url}?${client_id}&${redirect_uri}&${response_type}`;

    window.location.assign(NAVER_URL);
  };
  const kakaoLoginHandler = () => {
    localStorage.setItem('source', 'kakao');
    const url = 'https://kauth.kakao.com/oauth/authorize';
    const client_id = `client_id=${process.env.REACT_APP_K_CLIENTID}`;
    const redirect_uri = `redirect_uri=${process.env.REACT_APP_URI_REDIRECT}`;
    const response_type = 'response_type=code';
    const scope = 'scope=profile';

    const KAKAO_URL = `${url}?${client_id}&${redirect_uri}&${response_type}&${scope}`;
    window.location.assign(KAKAO_URL);
  };

  //input 관련
  const [loginInfo, setLoginInfo] = useState({
    userEmail: '',
    password: '',
    source: 'home',
    errorMsg: '',
  });

  const { userEmail, password, errorMsg, source } = loginInfo;

  const inputHandler = (category: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    localStorage.setItem('source', 'home');
    setLoginInfo({
      ...loginInfo,
      [category]: target.value,
      source: 'home',
    });

    if (e.key === 'Enter') {
      homeLoginHandler();
    }
  };

  const homeLoginHandler = async () => {
    localStorage.setItem('source', 'home');
    const birthwikiServer = 'https://server.birthwiki.space/user/login';
    if (!userEmail || !password) {
      return setLoginInfo({
        ...loginInfo,
        errorMsg: '❗️ 이메일과 비밀번호를 모두 입력하세요',
      });
    }

    try {
      const res = await axios.post(birthwikiServer, { userEmail, password, source });

      dispatch(setUserInfo(res.data.data));
      dispatch(setIsLogin(true));
    } catch (err) {
      console.log(err);
      return !err.response
        ? setLoginInfo({
            ...loginInfo,
            errorMsg: '❗️ 서버 오류, 잠시 후 다시 시도해주세요',
          })
        : setLoginInfo({
            ...loginInfo,
            errorMsg: '❗️ 이메일 혹은 비밀번호가 일치하지 않습니다',
          });
    }
  };

  const signupHandler = () => {
    dispatch(setIsSidbar(false));
    dispatch(setIsSignup(true));
  };

  return (
    <LoginContainer>
      Login
      <EmailLoginContainer>
        <div>
          E-Mail
          <InputField
            type='email'
            placeholder='이메일을 입력하세요'
            maxLength={30}
            onKeyUp={(e) => {
              inputHandler('userEmail', e);
            }}
          ></InputField>
          Password
          <InputField
            type='password'
            placeholder='비밀번호를 입력하세요'
            maxLength={16}
            onKeyUp={(e) => {
              inputHandler('password', e);
            }}
          />
          <HomeLogin type='submit' onClick={homeLoginHandler}>
            Login
          </HomeLogin>
          <HomeSignUp onClick={signupHandler}>Sign up</HomeSignUp>
          {errorMsg ? <ErrorMsg>{errorMsg}</ErrorMsg> : ''}
        </div>
        <SocialLoginContainer>
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
  position: fixed;
`;

const SocialLoginContainer = styled.div`
  margin-top: 10px;
  margin-left: 20px;
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
  background-color: rgba(255, 255, 255, 0);
  color: #fff;
  ::placeholder {
    color: #808080;
    font-style: italic;
  }
`;

const HomeLogin = styled.button`
  border-radius: 12px;
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

const HomeSignUp = styled.button`
  border-radius: 12px;
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
