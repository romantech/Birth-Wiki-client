import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { LikeCardsGeneral } from '../types/index';
import { IconCircle, ShareIcon, HeartIcon } from './FavoriteCardList';

interface Props extends LikeCardsGeneral {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUnlikeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShareModalOfModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

const FavoriteModal = ({ showModal, setShowModal, ...props }: Props): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null);
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(100%)`,
  });

  const contents = props.contents !== null ? props.contents : [];
  const category = props.category;

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
              <ModalImg src={props.image} alt='Selected Image' />
              <ModalContent category={category}>
                <div>
                  {category !== 'music' && category !== 'movie' ? (
                    <h1>{`${props.date.split('-')[0]}월 ${props.date.split('-')[1]}일`}</h1>
                  ) : (
                    <>
                      <h1>{`${props.date.split('-')[0]}년 ${props.date.split('-')[1]}주`}</h1>
                    </>
                  )}
                  <h3>{category}</h3>
                </div>
                <div>
                  {category !== 'music' && category !== 'movie' ? (
                    props.contents?.map((issue, index) => <p key={index}>{`${issue[0]} - ${issue[1]}`}</p>)
                  ) : category === 'movie' ? (
                    <>
                      <h4 style={{ marginBottom: '-10px' }}>한국 1위 영화</h4>
                      <p style={{ textAlign: 'center' }}>
                        {props.korea === undefined ? '정보가 없습니다 😢' : `<${props.korea?.title}>`}
                      </p>
                      <h4 style={{ marginBottom: '-10px' }}>해외 1위 영화</h4>
                      <p style={{ textAlign: 'center' }}>
                        {props.world === undefined ? '정보가 없습니다 😢' : `<${props.world?.title}>`}
                      </p>
                    </>
                  ) : (
                    <>
                      <h4 style={{ marginBottom: '-10px' }}>한국 1위 음악</h4>
                      <p style={{ textAlign: 'center' }}>
                        {props.korea === undefined ? '정보가 없습니다 😢' : `<${props.korea?.title}>`}
                        <br />
                        {props.korea === undefined ? '' : `— ${props.korea?.singer}`}
                      </p>
                      <h4 style={{ marginBottom: '-10px' }}>해외 1위 음악</h4>
                      <p style={{ textAlign: 'center' }}>
                        {props.world === undefined ? '정보가 없습니다 😢' : `<${props.world?.title}>`}
                        <br />
                        {props.world === undefined ? '' : `— ${props.world?.singer}`}
                      </p>
                    </>
                  )}
                </div>
                <IconWrapper>
                  <IconCircle
                    className='icon-circle first'
                    primary
                    onClick={() => props.setUnlikeModal((prev) => !prev)}
                  >
                    <HeartIcon style={{ fontSize: '1.2rem' }} />
                  </IconCircle>
                  <IconCircle
                    className='icon-circle second'
                    primary
                    onClick={() => props.setShareModalOfModal((prev) => !prev)}
                  >
                    <ShareIcon style={{ fontSize: '1.2rem' }} />
                  </IconCircle>
                  <IconCircle
                    className='icon-circle third'
                    primary
                    onClick={() => setShowModal((prev) => !prev)}
                  >
                    <MdClose aria-label='Close Modal' style={{ fontSize: '1.4rem' }} />
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
  background: #fff;
  color: #000;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  z-index: 3;
  position: relative;

  .icon-circle.first,
  .icon-circle.second {
    margin-right: 5px;
  }

  // 900px 이상일 때
  @media (min-width: 900px) {
    width: 80vw;
    max-width: 922px;
    height: 60vh;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
  }

  // 900px 이하일 때
  @media (max-width: 899px) {
    width: 80vw;
    max-width: 600px;
    height: 85vh;
    display: grid;
    grid-template-rows: 1fr 2fr;

    .icon-circle {
      background: white;
      border: none;
      &:hover {
        background: #dddddd;
      }
    }
  }
`;

const MediaImageWrapper = styled.div<{ korea: string; world: string }>``;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;

  @media (min-width: 900px) {
    border-radius: 15px 0 0 15px;
    object-fit: cover;
  }
  @media (max-width: 899px) {
    border-radius: 15px 15px 0 0;
    object-fit: cover;
    /* object-position: center center; */
  }
`;

const ModalContent = styled.div<{ category: string }>`
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
  h3,
  h4 {
    text-align: center;
    text-transform: uppercase;
  }

  h4 {
    font-size: 1.2rem;
  }

  h3:after {
    content: '';
    display: block;
    border-bottom: 2px solid black;
    width: 150px;
    margin: 20px 0 30px 0;
  }

  ${(props) =>
    (props.category === 'music' || props.category === 'movie') &&
    css`
      h3:after {
        content: '';
        display: block;
        border-bottom: 2px solid black;
        width: 180px;
        margin: 20px 0 30px 0;
      }
    `}

  h1 {
    margin-bottom: -30px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: none;
    margin: 15px 0;
  }

  ::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #868686;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 20px;
  right: 25px;
`;

export default FavoriteModal;
