import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  imagePath: string;
}

const FavoriteModal = ({ showModal, setShowModal, imagePath }: Props): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null);
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(100%)`,
  });

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalWrapper>
              <ModalImg src={imagePath} alt='ModalImage' />
              <ModalContent>
                <h1>1984</h1>
                <li />
                <p>
                  397년 - 호노리우스 황제에 의해 로마에서 야만인의 옷(barbarian clothing)을 입는 것이
                  금지되다.
                </p>
                <p>451년 - 훈족의 아틸라가 프랑스의 메스를 약탈하고 갈리아의 다른 도시를 공격하다.</p>
                <p>529년 - 동로마 제국의 유스티니아누스 1세가 로마법 대전의 첫 번째 초안을 편찬하다.</p>
                <p>
                  1141년 - 마틸다 황후가 잉글랜드의 레이디(Lady of the English)로 선출됨으로써 영국 최초의
                  여성 통치자가 되다.
                </p>
              </ModalContent>
              <CloseModalButton
                aria-label='Close Modal'
                onClick={() => setShowModal((prev) => !prev)}
              ></CloseModalButton>
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
  background: rgba(0, 0, 0, 0.8);
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
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  position: relative;
  z-index: 3;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
  object-fit: cover;
  overflow: hidden;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  padding: 35px;
  overflow: auto;

  li {
    display: block;
    border-bottom: 1px solid black;
    /* margin: 19px 0; */
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
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

export default FavoriteModal;
