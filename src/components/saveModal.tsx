import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setSaveModal } from '../actions';

function SaveModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(setSaveModal(false));
  };

  return (
    <Background ref={modalRef} onClick={close}>
      <ModalWrapper>
        <ModalContent>
          <p>저장되었습니다!</p>
          <ButtonWrapper>
            <button onClick={close}>확인!</button>
          </ButtonWrapper>
        </ModalContent>
      </ModalWrapper>
    </Background>
  );
}

export default SaveModal;

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
  position: relative;
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #141414;
  padding: 35px;
  overflow: auto;
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
