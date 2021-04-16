import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setIsLogin, setUserInfo, setisSidbar } from '../actions/index';
import { useHistory, Link } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
  matchPassword,
  checkAllItems,
  validateKoreanName,
} from '../utils/validate';

function SidebarSignUp() {
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const sidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(true);
  const [signUpInfo, setSignUpInfo] = useState({
    userEmail: '',
    password: '',
    password2: '',
    userNickName: '',
    profileImage: '' || `${process.env.PUBLIC_URL}/img/profile.png`,
    errorMsg: '',
  });

  const { userEmail, password, password2, userNickName, profileImage, errorMsg } = signUpInfo;

  const inputHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpInfo({
      ...signUpInfo,
      [key]: e.target.value,
    });
  };

  const signUpSubmitHandler = () => {
    console.log('가입전', userInfo);

    dispatch(
      setUserInfo({
        ...userInfo,
        userEmail: signUpInfo.userEmail,
        password: signUpInfo.password,
        userNickName: signUpInfo.userNickName,
        profileImage: signUpInfo.profileImage,
        source: 'Home',
      }),
    );
    dispatch(setisSidbar(true));
    console.log('회원가입 후', userInfo);
    history.push('/');
  };

  const inValid = <Far />;
  const valid = <Fas />;
  const optional = <i className='far fa-edit' aria-hidden='true' />;
  const inlineBlockStyle = { display: 'inline-block' };
  const SigninRef: any = useRef<HTMLDivElement>(null);
  const closeSignin = (e: React.SyntheticEvent) => {
    if (SigninRef.current === (e.target as typeof e.target)) {
      dispatch(setisSidbar(!sidebar));
      history.goBack();
    }
  };

  return (
    <Background ref={SigninRef} onClick={closeSignin}>
      {showModal ? (
        <ModalWrapper>
          <Title>Welcome!</Title>
          <SubTitle>필수 사항</SubTitle>
          <SignUpContainer>
            <InputCatecory>E-mail</InputCatecory>
            <InputField
              type='email'
              value={userEmail}
              placeholder='수신 가능한 이메일 주소 입력'
              maxLength={30}
              onChange={inputHandler('userEmail')}
            />
            {validateEmail(userEmail) ? valid : inValid}
            <InputCatecory>password</InputCatecory>
            <InputField
              type='password'
              value={password}
              placeholder='숫자와 영문을 포함해 최소 8자리'
              maxLength={16}
              onChange={inputHandler('password')}
            />
            {validatePassword(password) ? valid : inValid}
            <InputCatecory>password 확인 </InputCatecory>
            <InputField
              type='password'
              value={password2}
              maxLength={16}
              placeholder='위와 동일한 비밀번호 입력'
              onChange={inputHandler('password2')}
            />
            {matchPassword(password, password2) ? valid : inValid}
            <InputCatecory>닉네임</InputCatecory>
            <InputField
              type='text'
              value={userNickName}
              maxLength={10}
              placeholder='한글만 입력 가능합니다'
              onChange={inputHandler('userNickName')}
            />
            <SubTitle>선택사항</SubTitle>
            <InputCatecory>프로필 이미지 등록</InputCatecory>
            <InputField type='file' onChange={inputHandler('profileImage')} />
            {validateKoreanName(userNickName) ? valid : inValid}
            <SignUpSubmit type='submit' onClick={signUpSubmitHandler}>
              회원가입
            </SignUpSubmit>
          </SignUpContainer>
        </ModalWrapper>
      ) : null}
    </Background>
  );
}

export default SidebarSignUp;

const Background = styled.div`
  background: rgb(245, 245, 245);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 660px;
  padding: 20px 25px;
  width: 400px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  z-index: 10;
  position: relative;
`;

const Title = styled.div`
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 10px;
`;

const SubTitle = styled.div`
  color: #eee;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-top: 15px;
`;

const SignUpContainer = styled.form`
  height: 50px;
  position: relative;
  width: 100%;
`;

const InputCatecory = styled.div`
  width: 90%;
  height: 30px;
  padding: 0.5rem;
  margin: 5px;
  color: #eee;
`;

const InputField = styled.input`
  box-sizing: border-box;
  color: #eee;
  font-size: 15px;
  height: 80%;
  outline: 0;
  padding: 0 20px 0;
  width: 100%;
  border: none;
  border-bottom: 2px solid #fff;
  background-color: rgba(255, 255, 255, 0);
  ::placeholder {
    color: #87ceea;
    font-style: italic;
  }
`;

const SignUpSubmit = styled.button`
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 30px;
  text-align: center;
  width: 100%;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #eee;
    color: #15172b;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  color: #eee;
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
