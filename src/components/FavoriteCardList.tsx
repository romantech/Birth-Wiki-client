import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { FiHeart, FiShare } from 'react-icons/fi';
import FavoriteModal from '../components/FavoriteModal';
import FavoriteShareModal from '../components/FavoriteShareModal';
import UnlikeConfirmModal from '../components/UnlikeConfirmModal';
import ShareModalOfModal from '../components/ShareModalOfModal';
import { LikeCardsGeneral } from '../types/index';
import getVerticalImg from '../utils/resizeImage';

interface SetFilteredArray extends LikeCardsGeneral {
  setFilteredArray: React.Dispatch<React.SetStateAction<LikeCardsGeneral[]>>;
  filteredArray: LikeCardsGeneral[];
}

const FavoriteCardList = ({ ...props }: SetFilteredArray): JSX.Element => {
  const shareRef = useRef<HTMLDivElement>(null);
  const contents = props.contents !== null ? props.contents : [];
  const category = props.category;

  const [shareModalOfModal, setShareModalOfModal] = useState(false);
  const [unLikeModal, setUnlikeModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [xyPosition, setXYPosition] = useState({
    pageX: 0,
    pageY: 0,
  });

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

  props.image.includes('unsplash') ? (props.image = getVerticalImg(props.image)) : props.image;

  return (
    <>
      <FlipCard>
        <FlipCardInner imgPath={props.image} category={category}>
          <FlipCardFront>
            <CategoryName>{category}</CategoryName>
            <img src={props.image} alt={category} />
          </FlipCardFront>
          <FlipCardBackGeneral>
            <IconWrapper>
              <IconCircle onClick={() => setUnlikeModal((prev) => !prev)}>
                <HeartIcon />
              </IconCircle>
              <IconCircle onClick={openShareModal} ref={shareRef}>
                <ShareIcon />
              </IconCircle>
            </IconWrapper>
            {category !== 'music' && category !== 'movie' ? (
              <h2>{`${props.date.split('-')[0]}월${props.date.split('-')[1]}일`}</h2>
            ) : (
              <>
                <h2>{`${props.date.split('-')[0]}년`}</h2>
                <br />
                <h4 style={{ margin: '-18px 0 -25px 0' }}>{`${props.date.split('-')[1]}주`}</h4>
              </>
            )}
            <li />
            {category !== 'music' && category !== 'movie' ? (
              props.contents?.map((issue, index) => <p key={index}>{`${issue[0]} - ${issue[1]}`}</p>)
            ) : category === 'movie' ? (
              <>
                <h3 style={{ marginBottom: '-10px' }}>한국 1위 영화</h3>
                <p>{props.korea === undefined ? '정보가 없습니다 😢' : `<${props.korea?.title}>`}</p>
                <h3 style={{ marginBottom: '-10px' }}>해외 1위 영화</h3>
                <p style={{ marginBottom: '20px' }}>
                  {props.world === undefined ? '정보가 없습니다 😢' : `<${props.world?.title}>`}
                </p>
              </>
            ) : (
              <>
                <h3 style={{ marginBottom: '-10px' }}>한국 1위 음악</h3>
                <p>
                  {props.korea === undefined ? '정보가 없습니다 😢' : `<${props.korea?.title}>`}
                  <br />
                  {props.korea === undefined ? '' : `— ${props.korea?.singer}`}
                </p>
                <h3 style={{ marginBottom: '-10px' }}>해외 1위 음악</h3>
                <p style={{ marginBottom: '20px' }}>
                  {props.world === undefined ? '정보가 없습니다 😢' : `<${props.world?.title}>`}
                  <br />
                  {props.world === undefined ? '' : `— ${props.world?.singer}`}
                </p>
              </>
            )}
            <ModalView onClick={openModal}>크게보기</ModalView>
          </FlipCardBackGeneral>
        </FlipCardInner>
      </FlipCard>
      <FavoriteShareModal
        shareModal={shareModal}
        setShareModal={setShareModal}
        xyPosition={xyPosition}
      ></FavoriteShareModal>
      <FavoriteModal
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
        setUnlikeModal={setUnlikeModal}
        setShareModalOfModal={setShareModalOfModal}
      />
      <UnlikeConfirmModal
        id={props.id}
        unLikeModal={unLikeModal}
        filteredArray={props.filteredArray}
        setFilteredArray={props.setFilteredArray}
        setUnlikeModal={setUnlikeModal}
      />
      <ShareModalOfModal shareModalOfModal={shareModalOfModal} setShareModalOfModal={setShareModalOfModal} />
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

const FlipCardInner = styled.div<{ imgPath: string; category: string }>`
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

export default FavoriteCardList;
