import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { FiHeart, FiShare } from 'react-icons/fi';
import FavoriteModal from '../components/FavoriteModal';
import FavoriteShareModal from '../components/FavoriteShareModal';
import { LikeCards } from '../types/index';
import getVerticalImg from '../utils/resizeImage';

const FavoriteCardList = ({ category, image: imgPath, contents, date }: LikeCards): JSX.Element => {
  const shareRef = useRef<HTMLDivElement>(null);

  // const { webformatURL, tags } = item;
  const [showModal, setShowModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [xyPosition, setXYPosition] = useState({
    pageX: 0,
    pageY: 0,
  });

  console.log(contents);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const openShareModal = (e: { pageX: number; pageY: number }) => {
    // const clientRect = e.target.getBoundingClientRect();
    // const relativeTop = clientRect.top;
    // const scrolledTopLength = window.pageYOffset;
    // const absoluteTop = scrolledTopLength + relativeTop;

    setShareModal((prev) => !prev);
    setXYPosition({
      pageX: e.pageX,
      pageY: e.pageY,
    });
  };

  imgPath.includes('unsplash') ? (imgPath = getVerticalImg(imgPath)) : imgPath;

  return (
    <>
      <FlipCard>
        <FlipCardInner imgPath={imgPath}>
          <FlipCardFront>
            <CategoryName>{category}</CategoryName>
            <img src={imgPath} alt={category} />
          </FlipCardFront>
          <FlipCardBack>
            <IconWrapper>
              <IconCircle>
                <HeartIcon />
              </IconCircle>
              <IconCircle onClick={openShareModal} ref={shareRef}>
                <ShareIcon />
              </IconCircle>
            </IconWrapper>
            <h2>{date.split('-')[0] + '월' + date.split('-')[1] + '일'}</h2>
            <li />
            {contents.map((issue, index) => (
              <p key={index}>{`${issue[0]} - ${issue[1]}`}</p>
            ))}
            <ModalView onClick={openModal}>크게보기</ModalView>
          </FlipCardBack>
        </FlipCardInner>
      </FlipCard>
      <FavoriteShareModal
        shareModal={shareModal}
        setShareModal={setShareModal}
        xyPosition={xyPosition}
      ></FavoriteShareModal>
      <FavoriteModal
        imgPath={imgPath}
        showModal={showModal}
        setShowModal={setShowModal}
        issue={contents}
        category={category}
        date={date}
      />
    </>
  );
};

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
  left: 48%;
  width: 30%;
  top: 3%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: #00000029;
  border-radius: 18px;
  padding: 5px;
`;

const CategoryName = styled(CardYear)`
  left: 81%;
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

const FlipCardBack = styled.div`
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

const FlipCardInner = styled.div<{ imgPath: string }>`
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transition-timing-function: ease-in-out;
  ${(props) =>
    !props.imgPath &&
    css`
      background: lightgray;
      border-radius: 20px;
    `}

  ${FlipCardBack}, ${FlipCardFront} {
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }
  ${FlipCardBack} {
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
      top: 3px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 900;
    }

    li {
      display: block;
      border-bottom: 1px solid white;
      margin: 19px 0;
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

export default FavoriteCardList;
