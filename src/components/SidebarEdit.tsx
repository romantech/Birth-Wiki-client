import React, { useState } from 'react';
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

function SidebarEdit() {
  const sidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);
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
    dispatch(setisSidbar(true));
    history.push('/');
  };

  const inValid = <Far />;
  const valid = <Fas />;
  const optional = <i className='far fa-edit' aria-hidden='true' />;
  const inlineBlockStyle = { display: 'inline-block' };

  console.log('userInfo', userInfo);
  return (
    <Background>
      {showModal ? (
        <ModalWrapper>
          <h1>회원 정보 수정</h1>
          <EditContainer>
            <InputCatecory>프로필 변경</InputCatecory>
            <InputField type='file' onChange={inputHandler('profileImage')} />
            <InputCatecory>닉네임</InputCatecory>
            <InputField
              type='text'
              value={editUserInfo.userNickName}
              maxLength={10}
              onChange={inputHandler('userNickName')}
            />
            {validateKoreanName(editUserInfo.userNickName) ? valid : inValid}
            <InputCatecory>password</InputCatecory>
            <InputField
              type='password'
              value={editUserInfo.password}
              placeholder='숫자와 영문을 포함해 최소 8자리'
              maxLength={16}
              onChange={inputHandler('password')}
            />
            {validatePassword(editUserInfo.password) ? valid : inValid}
            <InputCatecory>password 확인 </InputCatecory>
            <InputField
              type='password'
              maxLength={16}
              placeholder='위와 동일한 비밀번호 입력'
              onChange={inputHandler('password2')}
            />
            {/* {matchPassword(editUserInfo.password, editUserInfo.password2) ? valid : inValid} */}
          </EditContainer>
          <EditSubmit type='submit' onClick={editSubmitHandler}>
            수정
          </EditSubmit>
          <CloseModalButton
            aria-label='Close modal'
            onClick={() => {
              setShowModal((prev: boolean) => !prev), history.push('/'), dispatch(setisSidbar(!sidebar));
            }}
          />
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
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
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

const EditContainer = styled.form`
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

const EditSubmit = styled.button`
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
