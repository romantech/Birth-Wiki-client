import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setIsLogin, setUserInfo, setIsSidbar, setIsSignup } from '../actions/index';
import { useHistory, Link } from 'react-router-dom';
import * as ColorIcon from 'react-icons/fc';
import { validateEmail, validatePassword, matchPassword, validateNickName } from '../utils/validate';
import axios from 'axios';

function SidebarSignUp() {
  const sidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);
  const dispatch = useDispatch();

  const [check, setCheck] = useState({
    userEmail: false,
    password: false,
    password2: false,
    nickName: false,
  });

  const [signUpInfo, setSignUpInfo] = useState({
    userEmail: '',
    password: '',
    password2: '',
    nickName: '',
    profileImage: '',
    errorMsg: '',
  });

  const { password, password2, errorMsg } = signUpInfo;

  const inputHandler = async (key: string, e: any) => {
    setSignUpInfo({
      ...signUpInfo,
      [key]: e.target.value,
    });
    if (key === 'userEmail') {
      if (validateEmail(e.target.value)) {
        await setCheck({ ...check, userEmail: true });
      } else {
        await setCheck({ ...check, userEmail: false });
      }
    } else if (key === 'password') {
      if (password2.length === 0) {
        if (validatePassword(e.target.value)) {
          setCheck({ ...check, password: true });
        } else {
          setCheck({ ...check, password: false });
        }
      } else if (password2.length > 0) {
        if (matchPassword(password2, e.target.value)) {
          if (validatePassword(e.target.value)) {
            setCheck({ ...check, password: true, password2: true });
          } else {
            setCheck({ ...check, password: false, password2: true });
          }
        } else {
          if (validatePassword(e.target.value)) {
            setCheck({ ...check, password: true, password2: false });
          } else {
            setCheck({ ...check, password: false, password2: false });
          }
        }
      }
    } else if (key === 'password2') {
      if (matchPassword(password, e.target.value)) {
        setCheck({ ...check, password2: true });
      } else {
        setCheck({ ...check, password2: false });
      }
    } else if (key === 'nickName') {
      if (validateNickName(e.target.value)) {
        setCheck({ ...check, nickName: true });
      } else {
        setCheck({ ...check, nickName: false });
      }
    }
  };

  const SigninRef: any = useRef<HTMLDivElement>(null);
  const closeSignin = (e: React.SyntheticEvent) => {
    if (SigninRef.current === (e.target as typeof e.target)) {
      dispatch(setIsSidbar(!sidebar));
      dispatch(setIsSignup(false));
    }
  };

  const checkedEmail = () => {
    if (check.userEmail) {
      axios({
        url: 'https://server.birthwiki.space/user/exist',
        params: {
          userEmail: signUpInfo.userEmail,
        },
      })
        .then((res) => {
          setSignUpInfo({
            ...signUpInfo,
            errorMsg: '',
          });
        })
        .catch((err) => {
          return !err.response
            ? setSignUpInfo({
                ...signUpInfo,
                errorMsg: '❗️ 서버 오류, 잠시 후 다시 시도해주세요',
              })
            : setSignUpInfo({
                ...signUpInfo,
                errorMsg: '❗️ 이미 가입된 이메일입니다',
              });
        });
    }
  };
  const checkedNickName = () => {
    if (check.nickName) {
      axios({
        url: 'https://server.birthwiki.space/user/exist',
        params: {
          nickName: signUpInfo.nickName,
        },
      })
        .then((res) => {
          setSignUpInfo({
            ...signUpInfo,
            errorMsg: '',
          });
        })
        .catch((err) => {
          console.log(err);
          return !err.response
            ? setSignUpInfo({
                ...signUpInfo,
                errorMsg: '❗️ 서버 오류, 잠시 후 다시 시도해주세요',
              })
            : setSignUpInfo({
                ...signUpInfo,
                errorMsg: '❗️ 이미 사용중인 닉네임입니다',
              });
        });
    }
  };

  return (
    <Background ref={SigninRef} onClick={closeSignin}>
      <ModalWrapper>
        <Title>Welcome!</Title>
        <SubTitle>필수 사항</SubTitle>
        <iframe name='frAttachFiles' className='invisable'></iframe>
        {errorMsg ? <div className='alert-box'>{errorMsg}</div> : ''}
        <SignUpContainer
          action='https://server.birthwiki.space/user/signup'
          method='post'
          target='frAttachFiles'
          encType='multipart/form-data'
        >
          <InputCatecory>E-mail</InputCatecory>
          <InputField
            type='email'
            name='userEmail'
            placeholder='수신 가능한 이메일 주소 입력'
            maxLength={30}
            onKeyUp={(e) => {
              inputHandler('userEmail', e);
            }}
            onBlur={checkedEmail}
          />
          {check.userEmail ? (
            <Valid to='#'>
              <ColorIcon.FcApproval />
            </Valid>
          ) : (
            <Invalid to='#'>
              <ColorIcon.FcCancel />
            </Invalid>
          )}
          <InputCatecory>password</InputCatecory>
          <InputField
            type='password'
            name='password'
            placeholder='숫자와 영문을 포함해 최소 8자리'
            maxLength={16}
            onKeyUp={(e) => {
              inputHandler('password', e);
            }}
          />
          {check.password ? (
            <Valid to='#'>
              <ColorIcon.FcApproval />
            </Valid>
          ) : (
            <Invalid to='#'>
              <ColorIcon.FcCancel />
            </Invalid>
          )}
          <InputCatecory>password 확인 </InputCatecory>
          <InputField
            type='password'
            maxLength={16}
            placeholder='위와 동일한 비밀번호 입력'
            onKeyUp={(e) => {
              inputHandler('password2', e);
            }}
          />
          {check.password2 ? (
            <Valid to='#'>
              <ColorIcon.FcApproval />
            </Valid>
          ) : (
            <Invalid to='#'>
              <ColorIcon.FcCancel />
            </Invalid>
          )}
          <InputCatecory>닉네임</InputCatecory>
          <InputField
            type='text'
            name='nickName'
            maxLength={10}
            placeholder='한글, 숫자, 영어를 포함 최소 2자리'
            onKeyUp={(e) => {
              inputHandler('nickName', e);
            }}
            onBlur={checkedNickName}
          />
          {check.nickName ? (
            <Valid to='#'>
              <ColorIcon.FcApproval />
            </Valid>
          ) : (
            <Invalid to='#'>
              <ColorIcon.FcCancel />
            </Invalid>
          )}
          <SubTitle>선택사항</SubTitle>
          <InputCatecory>프로필 이미지 등록</InputCatecory>
          <InputField type='file' name='profileImage' />

          {check.userEmail && check.password && check.password2 && check.nickName ? (
            <SignUpSubmit
              type='submit'
              value='회원가입'
              onClick={() => {
                setTimeout(() => {
                  dispatch(setIsSignup(false));
                }, 10000);
              }}
            ></SignUpSubmit>
          ) : (
            <SignUpSubmitDiv>회원가입</SignUpSubmitDiv>
          )}
        </SignUpContainer>
      </ModalWrapper>
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
  height: 680px;
  padding: 20px 25px;
  width: 400px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  z-index: 10;
  position: relative;
  & .invisable {
    display: none;
  }
  & .alert-box {
    color: #eee;
  }
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
  font-weight: bold;
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
  width: 88%;
  border: none;
  border-bottom: 2px solid #fff;
  background-color: rgba(255, 255, 255, 0);
  ::placeholder {
    color: #87ceea;
    font-style: italic;
  }
`;

const SignUpSubmit = styled.input`
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
const SignUpSubmitDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #292929;
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
`;

const Valid = styled(Link)`
  font-size: 20px;

  padding: 10px;
`;

const Invalid = styled(Link)`
  font-size: 20px;

  padding: 10px;
`;
