import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FiHeart, FiShare } from 'react-icons/fi';
import FavoriteModal from '../components/FavoriteModal';

const dummyIssue = [
  '1월 17일 - 다국적군, 이라크에 공격을 개시하다. (걸프전 발발)',
  '2월 27일 - 걸프전 종전. 쿠웨이트 해방.',
  '2월 20일 - 현대자동차에서 2세대 뉴쏘나타를 출시하다.',
  '3월 5일 - 제1호 태풍 샤론이 발생 하였다.',
  '3월 11일 - KBS 라디오 서울 폐국',
  '3월 20일 - SBS 라디오 방송 개국.',
  '4월 3일 - 대한민국, 화성연쇄살인사건이 마지막 열 번째 사건이 발생하다.',
  '5월 7일 - 현대자동차에서 4도어 뉴엑셀을 출시하다',
  '6월 3일 - 대우자동차(한국GM의 전신)에서 프린스 시판',
  '6월 12일 - 보리스 옐친이 러시아의 대통령으로 당선되다.',
  '6월 20일 - 지방선거 광역의회 의원 선거',
  '8월 6일 - 팀 버너스리가 월드 와이드 웹을 공개하다',
  '9월 25일 - 현대정공(현대모비스의 전신)에서 갤로퍼 시판.',
];

interface Props {
  item: {
    webformatURL: string;
    tags: string;
  };
}

const FavoriteCardList = ({ item }: Props): JSX.Element => {
  const { webformatURL, tags } = item;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <FlipCard>
        <FlipCardInner imagePath={webformatURL}>
          <FlipCardFront>
            {/* <CardYear>1984</CardYear> */}
            <CategoryName>Births</CategoryName>
            <img src={webformatURL} alt={tags} />
          </FlipCardFront>
          <FlipCardBack>
            <IconWrapper>
              <IconCircle>
                <HeartIcon />
              </IconCircle>
              <IconCircle>
                <ShareIcon />
              </IconCircle>
            </IconWrapper>
            <h2>1984</h2>
            <li />
            {dummyIssue.map((issue) => (
              <p key={issue.split('-')[0].trim()}>{issue}</p>
            ))}
            <ModalView onClick={openModal}>크게보기</ModalView>
          </FlipCardBack>
        </FlipCardInner>
      </FlipCard>
      <FavoriteModal
        imagePath={webformatURL}
        showModal={showModal}
        setShowModal={setShowModal}
        issue={dummyIssue}
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
    height: 100%;
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

const FlipCardInner = styled.div<{ imagePath: string }>`
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transition-timing-function: ease-in-out;
  ${(props) =>
    !props.imagePath &&
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
    background: linear-gradient(rgba(0, 0, 0, 0.83), rgba(0, 0, 0, 0.83)), url(${(props) => props.imagePath});
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
