import React, { useRef, useEffect, useState, useCallback } from 'react';
import TMDB_API from '../utils/TMDB_API';
import { useSpring, animated } from 'react-spring';
import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { LikeCardsGeneral, MovieInfo } from '../types/index';
import { IconCircle, ShareIcon, HeartIcon } from './FavoriteCardList';
import { FaStar } from 'react-icons/fa';
import getMovieRateStar from '../utils/getMovieRateStar';

interface Props extends LikeCardsGeneral {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUnlikeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShareModalMain: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  movieInfoKorean?: MovieInfo;
  movieInfoWorld?: MovieInfo;
}

const FavoriteModal = ({ showModal, setShowModal, ...props }: Props): JSX.Element => {
  const [worldSingerImgPath, setWorldSingerImgPath] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(100%)`,
  });

  const getWorldSingerImg = (name: string) => {
    if (name) {
      TMDB_API.get('/person', {
        params: {
          query: name,
        },
      }).then((res) => {
        if (res.data.total_results !== 0 && res.data.results[0].profile_path) {
          const path = 'https://image.tmdb.org/t/p/w500' + res.data.results[0].profile_path;
          setWorldSingerImgPath(path);
        }
      });
    }
  };

  if (!worldSingerImgPath && props.world?.singer) {
    getWorldSingerImg(props.world.singer);
  }

  const { category } = props;
  const mediaImageKorea = props.korea?.poster
    ? props.korea?.poster
    : `${process.env.PUBLIC_URL}/img/question.png`;

  let mediaImageWorld = '';
  if (props.category === 'music') {
    mediaImageWorld = worldSingerImgPath ? worldSingerImgPath : `${process.env.PUBLIC_URL}/img/question.png`;
  } else {
    mediaImageWorld = props.world?.poster
      ? props.world?.poster
      : `${process.env.PUBLIC_URL}/img/question.png`;
  }

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
                    props.contents?.map((issue, index) => <p key={index}>{`${issue[0]} — ${issue[1]}`}</p>)
                  ) : category === 'movie' ? (
                    <>
                      <MediaImageKorea korea={mediaImageKorea} world={mediaImageWorld} />
                      <h4 style={{ marginBottom: '-10px' }}>한국 1위 영화</h4>
                      <p style={{ textAlign: 'center' }}>
                        {props.korea === null || props.korea === undefined
                          ? '정보가 없습니다 😢'
                          : `<${props.korea?.title}>`}
                        <br />
                        {props.movieInfoKorean !== undefined
                          ? getMovieRateStar(props.movieInfoKorean.vote_average).map((el, index) => {
                              if (el === 'black') {
                                return <MovieRateStarBlack key={index} />;
                              } else {
                                return <MovieRateStarGray key={index} />;
                              }
                            })
                          : ''}
                      </p>

                      <MediaImageWorld korea={mediaImageKorea} world={mediaImageWorld} />
                      <h4 style={{ marginBottom: '-10px' }}>해외 1위 영화</h4>
                      <p style={{ textAlign: 'center' }}>
                        {props.world === null || props.world === undefined
                          ? '정보가 없습니다 😢'
                          : `<${props.world?.title}>`}
                        <br />
                        {props.movieInfoWorld !== undefined
                          ? getMovieRateStar(props.movieInfoWorld.vote_average).map((el, index) => {
                              if (el === 'black') {
                                return <MovieRateStarBlack key={index} />;
                              } else {
                                return <MovieRateStarGray key={index} />;
                              }
                            })
                          : ''}
                      </p>
                    </>
                  ) : (
                    <>
                      <MediaImageKorea korea={mediaImageKorea} world={mediaImageWorld} />
                      <h4 style={{ marginBottom: '-10px' }}>한국 1위 음악</h4>
                      <p style={{ textAlign: 'center' }}>
                        {props.korea === null || props.korea === undefined
                          ? '정보가 없습니다 😢'
                          : `<${props.korea?.title}>`}
                        <br />
                        {props.korea === null || props.korea === undefined ? '' : `${props.korea?.singer}`}
                      </p>
                      <MediaImageWorld korea={mediaImageKorea} world={mediaImageWorld} />
                      <h4 style={{ marginBottom: '-10px' }}>해외 1위 음악</h4>
                      <p style={{ textAlign: 'center' }}>
                        {props.world === null || props.world === undefined
                          ? '정보가 없습니다 😢'
                          : `<${props.world?.title}>`}
                        <br />
                        {props.world === null || props.world === undefined ? '' : `${props.world?.singer}`}
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
                    onClick={() => props.setShareModalMain((prev) => !prev)}
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

export const MovieRateStarBlack = styled(FaStar)`
  color: black;
`;

export const MovieRateStarGray = styled(FaStar)`
  color: #b9b9b9;
`;

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
    margin-bottom: -4rem;
    width: 80vw;
    max-width: 500px;
    height: 80vh;
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

  @media (max-width: 375px) {
    width: 85vw;
    max-width: 600px;
    height: 70vh;
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

const MediaImageKorea = styled.div<{ korea: string; world: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: url(${(props) => props.korea});
  background-size: cover;
  margin: auto auto -15px auto;
`;

const MediaImageWorld = styled(MediaImageKorea)`
  background: url(${(props) => props.world});
  background-size: cover;
  margin: 20px auto -15px auto;
`;

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
