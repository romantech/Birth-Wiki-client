import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { IconCircle, ShareIcon, HeartIcon } from './FavoriteCardList';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  imagePath: string;
  issue: string[];
}

const FavoriteModal = ({ showModal, setShowModal, imagePath, issue }: Props): JSX.Element => {
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
              <ModalImg src={imagePath} alt='Selected Image' />
              <ModalContent>
                <div>
                  <h1>1984</h1>
                  <h3>Births</h3>
                </div>
                <div>
                  {issue.map((issue) => (
                    <p key={issue.split('-')[0].trim()}>{issue}</p>
                  ))}
                </div>
                <IconWrapper>
                  <IconCircle primary>
                    <HeartIcon style={{ fontSize: '1.2rem' }} />
                  </IconCircle>
                  <IconCircle primary>
                    <ShareIcon style={{ fontSize: '1.2rem' }} />
                  </IconCircle>
                  <IconCircle primary>
                    <MdClose
                      aria-label='Close Modal'
                      onClick={() => setShowModal((prev) => !prev)}
                      style={{ fontSize: '1.4rem' }}
                    />
                  </IconCircle>
                </IconWrapper>
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
  align-items: center;
  line-height: 1.8;
  color: #141414;
  padding: 35px;
  overflow: auto;

  p:after {
    content: '';
    display: block;
    border-bottom: 1px solid rgba(155, 155, 155, 0.13);
    margin-top: 10px;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }

  h1,
  h3 {
    text-align: center;
    text-transform: uppercase;
  }

  h3:after {
    content: '';
    display: block;
    border-bottom: 2px solid black;
    width: 150px;
    margin: 20px 0 30px 0;
  }

  h1 {
    margin-bottom: -30px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 20px;
  right: 40px;
`;

export default FavoriteModal;
