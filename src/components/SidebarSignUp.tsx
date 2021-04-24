import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setIsLogin, setUserInfo, setIsSidbar, setIsSignup } from '../actions/index';
import { Link } from 'react-router-dom';
import * as ColorIcon from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import { validateEmail, validatePassword, matchPassword, validateNickName } from '../utils/validate';
import axios from 'axios';

function SidebarSignUp() {
  const dispatch = useDispatch();

  const [signUpInfo, setSignUpInfo] = useState({
    userEmail: '',
    password: '',
    password2: '',
  });

  const [check, setCheck] = useState({
    userEmail: false,
    password: false,
    password2: false,
    nickName: false,
  });

  const [duple, setduple] = useState({
    userEmail: false,
    nickName: false,
  });

  const { password, password2 } = signUpInfo;

  const inputHandler = async (key: string, e: any) => {
    setSignUpInfo({
      ...signUpInfo,
      [key]: e.target.value,
    });

    if (key === 'userEmail') {
      validateEmail(e.target.value)
        ? await dupleCheck(key, e.target.value)
        : setCheck({ ...check, userEmail: false });
    }

    if (key === 'password') {
      if (password2.length === 0) {
        validatePassword(e.target.value)
          ? setCheck({ ...check, password: true })
          : setCheck({ ...check, password: false });
      } else {
        if (!validatePassword(e.target.value)) {
          setCheck({ ...check, password: false, password2: false });
        } else {
          matchPassword(password2, e.target.value)
            ? setCheck({ ...check, password: true, password2: true })
            : setCheck({ ...check, password: true, password2: false });
        }
      }
    }

    if (key === 'password2') {
      matchPassword(password, e.target.value)
        ? setCheck({ ...check, password2: true })
        : setCheck({ ...check, password2: false });
    }

    if (key === 'nickName') {
      validateNickName(e.target.value)
        ? await dupleCheck(key, e.target.value)
        : setCheck({ ...check, nickName: false });
    }
  };

  const dupleCheck = async (event: string, value: string) => {
    if (event === 'userEmail') {
      setCheck({ ...check, userEmail: true });
      await axios({
        url: 'https://server.birthwiki.space/user/exist',
        params: {
          userEmail: value,
        },
      })
        .then(() => {
          setduple({ ...duple, userEmail: true });
        })
        .catch((err) => {
          setduple({ ...duple, userEmail: false });
        });
    }

    if (event === 'nickName') {
      setCheck({ ...check, nickName: true });
      await axios({
        url: 'https://server.birthwiki.space/user/exist',
        params: {
          nickName: value,
        },
      })
        .then(() => {
          setduple({ ...duple, nickName: true });
        })
        .catch((err) => {
          setduple({ ...duple, nickName: false });
        });
    }
  };

  const closeSignin = () => {
    dispatch(setIsSidbar(true));
    dispatch(setIsSignup(false));
  };

  return (
    <Background>
      <SignUpWrapper>
        <SigninClose onClick={closeSignin} />

        <Title>Welcome!</Title>
        <SubTitle>필수 사항</SubTitle>
        <iframe
          name='frAttachFiles'
          className='invisable'
          onLoad={async () => {
            dispatch(setIsSignup(false));
            const birthwikiServer = 'https://server.birthwiki.space/user/login';
            const res = await axios.post(birthwikiServer, {
              userEmail: signUpInfo.userEmail,
              password: signUpInfo.password,
              source: 'home',
            });
            dispatch(setUserInfo(res.data.data));
            dispatch(setIsLogin(true));
          }}
        ></iframe>
        <SignUpContainer
          action='https://server.birthwiki.space/user/signup'
          method='post'
          target='frAttachFiles'
          encType='multipart/form-data'
        >
          <InputCatecory>E-mail</InputCatecory>
          <SignUpInput
            className='email'
            type='email'
            name='userEmail'
            placeholder='수신 가능한 이메일 주소 입력'
            maxLength={30}
            onKeyUp={(e) => {
              inputHandler('userEmail', e);
            }}
          />
          {!check.userEmail ? (
            <div className='default'> 올바른 이메일을 입력해주세요.</div>
          ) : !duple.userEmail ? (
            <div className='invalid'> 이미 사용 중인 이메일입니다.</div>
          ) : (
            <div className='ok'>사용 가능한 이메일 입니다.</div>
          )}
          <InputCatecory>닉네임</InputCatecory>
          <SignUpInput
            type='text'
            name='nickName'
            maxLength={10}
            placeholder='한글, 숫자, 영어를 포함 최소 2자리'
            onKeyUp={(e) => {
              inputHandler('nickName', e);
            }}
          />
          {!check.nickName ? (
            <div className='default'> 닉네임을 입력해주세요.</div>
          ) : !duple.nickName ? (
            <div className='invalid'> 이미 사용 중인 닉네임입니다.</div>
          ) : (
            <div className='ok'>사용 가능한 닉네임입니다.</div>
          )}
          <InputCatecory>password</InputCatecory>
          <SignUpInput
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
          <SignUpInput
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

          <SubTitle>선택사항</SubTitle>
          <InputCatecory>프로필 이미지 등록</InputCatecory>
          <SignUpInput type='file' name='profileImage' accept='image/*' />

          {check.userEmail && check.password && check.password2 && check.nickName ? (
            <SignUpSubmit type='submit' value='회원가입'></SignUpSubmit>
          ) : (
            <SubmitDiv>회원가입</SubmitDiv>
          )}
        </SignUpContainer>
      </SignUpWrapper>
    </Background>
  );
}

export default SidebarSignUp;

const TestDiv = styled.div`
  color: white;
`;

const Background = styled.div`
  background: rgb(245, 245, 245);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpWrapper = styled.div`
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 700px;
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
    color: #fff;
  }
`;

const Title = styled.div`
  color: #fff;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 10px;
`;
const SigninClose = styled(AiOutlineClose)`
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
`;
const SubTitle = styled.div`
  color: #fff;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
`;

const SignUpContainer = styled.form`
  height: 50px;
  position: relative;
  width: 100%;
  & .invalid {
    font-size: 12px;
    color: orange;
    padding: 5px 0 0 10px;
  }
  & .ok {
    font-size: 12px;
    color: pink;
    padding: 5px 0 0 10px;
  }
  & .default {
    font-size: 12px;
    color: #fff;
    padding: 5px 0 0 10px;
  }
`;
const EditContainer = styled.form`
  height: 50px;
  position: relative;
  width: 100%;
`;

const InputCatecory = styled.div`
  width: 90%;
  height: 30px;
  padding: 0.5rem;
  margin: 5px;
  color: #fff;
`;

const ErrorMsg = styled.div``;

const SignUpInput = styled.input`
  box-sizing: border-box;
  color: #fff;
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

  & .email {
    width: 50%;
  }
`;

const EditInput = styled.input`
  box-sizing: border-box;
  color: #fff;
  font-size: 15px;
  height: 80%;
  outline: 0;
  padding: 4px 20px 0;
  width: 88%;
  border: none;
  border-bottom: 2px solid #fff;
  background-color: rgba(255, 255, 255, 0.1);
  ::placeholder {
    color: #8fbc8f;
    font-style: italic;
  }
`;

const SignUpSubmit = styled.input`
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #fff;
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
    background-color: #fff;
    color: #15172b;
  }
`;

const EditSubmit = styled.input`
  background-color: #e4fff7;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #000;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 33px;
  text-align: center;
  width: 100%;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #04bfbf;
    color: #15172b;
  }
`;

const SubmitDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #292929;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #fff;
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
