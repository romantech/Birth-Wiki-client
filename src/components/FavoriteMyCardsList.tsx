import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FiHeart, FiShare, FiZoomIn } from 'react-icons/fi';
import FavoriteShareModalMain from './FavoriteShareModalMain';
import { RecordCard } from '../types/index';
import axios from 'axios';

const FavoriteMyCardsList = ({ ...props }: RecordCard): JSX.Element => {
  const [shareModalMain, setShareModalMain] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const fetchImage = (url: string) => {
    axios.get(url).then((res) => {
      if (res.status === 200) {
        setTimeout(() => {
          setFetchStatus(true);
        }, 500);
      }
    });
  };

  const category = 'mycards';
  const { id, date, cardImage, writer, cardDesc, privacy } = props;

  return (
    <>
      <FlipCard>
        <FlipCardInner fetchStatus={fetchStatus} imgPath={cardImage} category={category}>
          <FlipCardFront>
            <CategoryName>{category}</CategoryName>
            <CardYear>{date}</CardYear>
            {fetchStatus === false ? (
              <LoadingBackground category={category}>
                <Wave />
              </LoadingBackground>
            ) : (
              <img loading='lazy' src={cardImage} alt={category} />
            )}
          </FlipCardFront>
          <FlipCardBackGeneral>
            <IconWrapper>
              <IconCircle onClick={openModal}>
                <ZoomInIcon />
              </IconCircle>
            </IconWrapper>
            <ModalView onClick={openModal}>크게보기</ModalView>
          </FlipCardBackGeneral>
        </FlipCardInner>
      </FlipCard>
      {/* <FavoriteModal
        id={props.id}
        like={props.like}
        image={props.image}
        showModal={showModal}
        setShowModal={setShowModal}
        contents={contents as string[]}
        category={category}
        date={props.date}
        korea={props.korea}
        world={props.world}
        movieInfoKorean={movieInfoKorean}
        movieInfoWorld={movieInfoWorld}
        setUnlikeModal={setUnlikeModal}
        setShareModalMain={setShareModalMain}
      /> */}
      <FavoriteShareModalMain shareModalMain={shareModalMain} setShareModalMain={setShareModalMain} />
    </>
  );
};

const Wave = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  transition: all 1s;

  &:before {
    content: '';
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 100px;
    background-color: lightgray;
    top: 50px;
    left: 50%;
    transform: translate(-50%);
    animation: wave 5s infinite linear;
    transition: all 2s;
  }

  @keyframes wave {
    0% {
      transform: translate(-50%) rotate(-180deg);
    }
    100% {
      transform: translate(-50%) rotate(360deg);
    }
  }
`;

const LoadingBackground = styled.div<{ category: string }>`
  background: #e2e2e2;
  border-radius: 20px;
  border: none;
  height: ${(props) => {
    if (props.category === 'music') {
      return '250px';
    }
    return '350px';
  }};
  width: 100%;
  overflow: hidden;
`;

const ModalView = styled.button`
  min-width: 100px;
  min-height: 25px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  margin-bottom: 10px;
  background: #ffffffe3;
  &:hover {
    background: white;
  }
`;

export const IconCircle = styled.div<{ primary?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffffe3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6.2px;
  cursor: pointer;

  &:hover {
    background: white;
  }

  ${(props) =>
    props.primary &&
    css`
      transition: all 0.2s ease-in-out;
      background: none;
      width: 35px;
      height: 35px;
      margin: 0;
      &:hover {
        transition: all 0.2s ease-in-out;
        background: #e7e7e7;
      }
    `}
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  ${IconCircle}:nth-child(1) {
    margin-right: 5px;
  }
`;

const InnerCardIcon = css`
  font-size: 1rem;
  color: #000000;
`;

export const ShareIcon = styled(FiShare)`
  ${InnerCardIcon};
`;

const ZoomInIcon = styled(FiZoomIn)`
  ${InnerCardIcon}
`;

export const HeartIcon = styled(FiHeart)`
  ${InnerCardIcon};
  fill: black;
`;

const CardYear = styled.p`
  position: absolute;
  color: #ffffffb3;
  font-size: 80%;
  text-align: center;
  font-weight: 900;
  left: 25%;
  width: 40%;
  top: auto;
  bottom: -2.5%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: #00000029;
  border-radius: 18px;
  padding: 5px;
`;

const CategoryName = styled(CardYear)`
  left: 79%;
  width: 30%;
  top: 4%;
  bottom: auto;
`;

const FlipCardFront = styled.div`
  position: sticky; // 사파리에서 카드 플립시 요소 계속 보이는 문제 해결

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
    filter: contrast(0.8);
  }
`;

const FlipCardBackGeneral = styled.div`
  color: white;
  transform: rotateY(180deg);
  overflow: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: none;
    margin: 15px 0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #4e4e4e;
    border-radius: 20px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #868686;
  }
`;

const FlipCardInner = styled.div<{ imgPath: string; category: string; fetchStatus: boolean }>`
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transition-timing-function: ease-in-out;

  ${FlipCardBackGeneral}, ${FlipCardFront} {
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }
  ${FlipCardBackGeneral} {
    padding: 18px;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(rgba(0, 0, 0, 0.83), rgba(0, 0, 0, 0.83)), url(${(props) => props.imgPath});
    background-repeat: no-repeat;
    background-size: cover;
    /* background: #313131; */
    /* filter: contrast(0.1); */

    h2 {
      position: absolute;
      top: 5px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 900;
      font-size: 1.4rem;
    }

    li {
      display: block;
      border-bottom: 1px solid white;
      margin: 19px 0;
      ${(props) =>
        (props.category === 'music' || props.category === 'movie') &&
        css`
          margin: 40px 0 19px 0;
        `}
    }

    p {
      font-size: 90%;
    }

    ${CardYear} {
      display: none;
    }
  }
`;

const FlipCard = styled.div`
  perspective: 1000px;
  margin-bottom: 15px;

  &:hover {
    ${FlipCardInner} {
      transform: rotateY(180deg);
    }
  }
`;

export default FavoriteMyCardsList;
