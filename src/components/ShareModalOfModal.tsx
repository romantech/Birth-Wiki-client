import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled, { css } from 'styled-components';

interface ShareModalOfModal {
  shareModalOfModal: boolean;
  setShareModalOfModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModalOfModal = ({ ...props }: ShareModalOfModal): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null);

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: props.shareModalOfModal ? 1 : 0,
    transform: props.shareModalOfModal ? `translateX(0%)` : `translateX(100%)`,
  });

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      props.setShareModalOfModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && props.shareModalOfModal) {
        props.setShareModalOfModal(false);
      }
    },
    [props.setShareModalOfModal, props.shareModalOfModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {props.shareModalOfModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalWrapper>
              <ModalContent>
                <p>🚀 in development...</p>
                <ButtonWrapper>
                  <button onClick={() => props.setShareModalOfModal((prev) => !prev)}>확인</button>
                </ButtonWrapper>
              </ModalContent>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

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

export default ShareModalOfModal;
