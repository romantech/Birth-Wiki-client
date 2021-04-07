import React, { useState } from 'react';
import styled from 'styled-components';

function SidebarLogin() {
  const [userSignInInfo, setUserSignInInfo] = useState({
    userEmail: '',
    password: '',
    isLogin: false,
    errorMsg: '',
  });

  const { userEmail, password, errorMsg, isLogin } = userSignInInfo;

  const inputHandler = (key: any) => (e: any) => {
    setUserSignInInfo({
      ...userSignInInfo,
      [key]: e.target.value,
    });
  };

  return (
    <div>
      <LoginContainer>
        <SocialLoginContainer>
          소셜 로그인
          <div>
            <SocialGoogle>구글 로그인</SocialGoogle>
            <SocialNaver>네이버 로그인</SocialNaver>
            <SocialKakao>카카오 로그인</SocialKakao>
          </div>
        </SocialLoginContainer>
        <EmailLoginContainer>
          Email 로그인
          <div>
            <InputField
              type='email'
              value={userEmail}
              placeholder='이메일을 입력하세요'
              // maxLength='30'
              onChange={inputHandler('userEmail')}
            />
            <InputField
              type='password'
              value={password}
              placeholder='비밀번호를 입력하세요'
              // maxLength='16'
              onChange={inputHandler('password')}
            />
          </div>
        </EmailLoginContainer>
      </LoginContainer>
    </div>
  );
}

export default SidebarLogin;

const LoginContainer = styled.div`
  background: #060b26;
  height: 100vh;
  width: 250px;
  top: 100px;
  overflow: scroll;
  position: fixed;
`;

const SocialLoginContainer = styled.div`
  background: #060b26;
  border: red 1px solid;
  color: #fff;
`;

const SocialGoogle = styled.button`
  border-radius: 50px;
  background: #016f71;
  white-space: nowrap;
  padding: 16px 64px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

const SocialNaver = styled.button`
  border-radius: 50px;
  background: #016f71;
  white-space: nowrap;
  padding: 16px 64px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

const SocialKakao = styled.button`
  border-radius: 50px;
  background: #016f71;
  white-space: nowrap;
  padding: 16px 64px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

const EmailLoginContainer = styled.div`
  color: #fff;
  border: red 1px solid;
`;

const InputField = styled.input``;
