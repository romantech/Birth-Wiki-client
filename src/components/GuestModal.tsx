import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setGuest, setUserInfo, setGuestModal } from '../actions';
import guestState from '../reducers/guestState';

function GuestModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const accept = () => {
    console.log('수락');
    dispatch(setGuest(true));
    dispatch(setUserInfo(guestState));
    dispatch(setGuestModal(false));
  };

  const reject = () => {
    console.log('거절');
    dispatch(setGuestModal(false));
  };

  useEffect(() => {
    console.log('모달오픈');
  }, []);

  return (
    <Background ref={modalRef} onClick={reject}>
      <ModalWrapper>
        <ModalContent>
          <p>
            게스트 모드에서는
            <br />
            변경 사항이 저장되지 않습니다 🥺
          </p>
          <ButtonWrapper>
            <button onClick={accept} style={{ marginRight: '10px' }}>
              확인!
            </button>
            <button onClick={reject}>취소</button>
          </ButtonWrapper>
        </ModalContent>
      </ModalWrapper>
    </Background>
  );
}

export default GuestModal;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.342);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const ModalWrapper = styled.div`
  width: 350px;
  height: 180px;
  background: #fff;
  color: #000;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  z-index: 3;
  position: relative;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #141414;
  padding: 35px;
  overflow: auto;
  z-index: 5;
  p {
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;

  button {
    width: 60px;
    height: 35px;
    border-radius: 10px;
    outline: none;
    border: 0.5px solid #9e9e9e;
    cursor: pointer;
    background: #e7e7e7;

    &:hover {
      background: #e2dbdb;
    }
  }
`;
