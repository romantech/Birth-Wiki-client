import React, { useState } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useHistory, Link } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
  matchPassword,
  checkAllItems,
  validateKoreanName,
} from '../utils/validate';

function SidebarSignUp() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(true);
  const [signUpInfo, setSignUpInfo] = useState({
    userEmail: '',
    password: '',
    password2: '',
    userNickName: '',
    isLogin: false,
    errorMsg: '',
  });

  const { userEmail, password, password2, userNickName, isLogin, errorMsg } = signUpInfo;

  const inputHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpInfo({
      ...signUpInfo,
      [key]: e.target.value,
    });
  };

  const signUpSubmitHandler = () => {
    console.log(signUpInfo);
  };
  const inValid = <Far />;
  const valid = <Fas />;
  const optional = <i className='far fa-edit' aria-hidden='true' />;
  const inlineBlockStyle = { display: 'inline-block' };

  console.log('signUpInfo', signUpInfo);
  return (
    <div>
      {showModal ? (
        <Background>
          <ModalWrapper>
            {/* <ModalImg src={require('../FLOWERS.jpeg')} alt='flowers' /> */}
            <h1>회원가입</h1>
            <SignUpContainer>
              <InputCatecory>E-mail</InputCatecory>
              <InputField
                type='email'
                value={userEmail}
                placeholder='수신 가능한 이메일 주소 입력'
                maxLength={30}
                onChange={inputHandler('userEmail')}
              ></InputField>
              {validateEmail(userEmail) ? valid : inValid}
              <InputCatecory>password</InputCatecory>
              <InputField
                type='password'
                value={password}
                placeholder='숫자와 영문을 포함해 최소 8자리'
                maxLength={16}
                onChange={inputHandler('password')}
              ></InputField>
              {validatePassword(password) ? valid : inValid}
              <InputCatecory>password 확인 </InputCatecory>
              <InputField
                type='password'
                value={password2}
                maxLength={16}
                placeholder='위와 동일한 비밀번호 입력'
                onChange={inputHandler('password2')}
              ></InputField>
              {matchPassword(password, password2) ? valid : inValid}
              <InputCatecory>닉네임</InputCatecory>
              <InputField
                type='text'
                value={userNickName}
                maxLength={10}
                placeholder='한글만 입력 가능합니다'
                onChange={inputHandler('userNickName')}
              ></InputField>
              {validateKoreanName(userNickName) ? valid : inValid}
            </SignUpContainer>
            <SignUpSubmit type='submit' onClick={signUpSubmitHandler}>
              회원가입
            </SignUpSubmit>
            <CloseModalButton
              aria-label='Close modal'
              onClick={() => {
                setShowModal((prev: boolean) => !prev), history.push('/');
              }}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </div>
  );
}

export default SidebarSignUp;

const Background = styled.div`
  width: 600px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const SignUpContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 2.5fr 0.3fr;
  line-height: 1.8;
  color: #141414;
`;

const InputCatecory = styled.div`
  width: 90%;
  height: 30px;
  padding: 0.5rem;
  margin: 0.4rem;
`;

const InputField = styled.input`
  height: 30px;
  padding: 0.5rem;
  margin: 0.4rem;
`;

const SignUpSubmit = styled.button`
  border-radius: 50px;
  background: yellow;
  white-space: nowrap;
  width: 100px;
  padding: 10px 0;
  margin: 10px;
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

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const Fas = styled.span.attrs({
  'aria-hidden': true,
})`
  color: rgb(51, 173, 51);
`;

const Far = styled.span.attrs({
  'aria-hidden': true,
})`
  color: rgb(194, 194, 194);
`;
