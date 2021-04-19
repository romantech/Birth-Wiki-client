import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setIsLogin, setUserInfo, setIsSidbar, setIsSignup } from '../actions/index';
import { useHistory, Link } from 'react-router-dom';
import * as ColorIcon from 'react-icons/fc';
import {
  validateEmail,
  validatePassword,
  matchPassword,
  checkAllItems,
  validateNickName,
} from '../utils/validate';

function SidebarEdit() {
  const isSidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const dispatch = useDispatch();
  const history = useHistory();
  const [editUserInfo, setEditUserInfo] = useState(userInfo);
  const [showModal, setShowModal] = useState(true);

  const inputHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserInfo(Object.assign({}, editUserInfo, { [key]: e.target.value }));
  };

  const editSubmitHandler = () => {
    dispatch(setUserInfo(editUserInfo));
    dispatch(setIsSidbar(true));
    history.push('/');
  };

  const EidtRef: any = useRef<HTMLDivElement>(null);
  const closeEidt = (e: React.SyntheticEvent) => {
    if (EidtRef.current === (e.target as typeof e.target)) {
      dispatch(setIsSidbar(!isSidebar));
      history.goBack();
    }
  };
  return (
    <Background ref={EidtRef} onClick={closeEidt}>
      {showModal ? (
        <ModalWrapper>
          <Title>회원 정보 수정</Title>
          <SubTitle> 수정 사항을 입력하세요 </SubTitle>
          <EditContainer>
            <InputCatecory>프로필 변경</InputCatecory>
            <InputField type='file' onChange={inputHandler('profileImage')} />
            <InputCatecory>닉네임</InputCatecory>
            <InputField
              type='text'
              value={editUserInfo.userNickName}
              maxLength={10}
              placeholder='한글만 입력 가능합니다'
              onChange={inputHandler('userNickName')}
            />
            {validateNickName(editUserInfo.userNickName) ? (
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
              placeholder='숫자와 영문을 포함해 최소 8자리'
              maxLength={16}
              onChange={inputHandler('password')}
            />
            {validatePassword(editUserInfo.password) ? (
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
              onChange={inputHandler('password2')}
            />
            {/* {matchPassword(editUserInfo.password, editUserInfo.password2) ? (
              <Valid to='#'>
                <ColorIcon.FcApproval />
              </Valid>
            ) : (
              <Invalid to='#'>
                <ColorIcon.FcCancel />
              </Invalid>
            )} */}
            <EditSubmit type='submit' onClick={editSubmitHandler}>
              수정
            </EditSubmit>
          </EditContainer>
        </ModalWrapper>
      ) : null}
    </Background>
  );
}

export default SidebarEdit;

const Background = styled.div`
  background: rgb(245, 245, 245);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: #0e6973;
  border-radius: 20px;
  box-sizing: border-box;
  height: 530px;
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
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
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
  color: #eee;
`;

const InputField = styled.input`
  box-sizing: border-box;
  color: #eee;
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

const EditSubmit = styled.button`
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

const Valid = styled(Link)`
  font-size: 20px;

  padding: 10px;
`;

const Invalid = styled(Link)`
  font-size: 20px;

  padding: 10px;
`;
