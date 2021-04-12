/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  item: {
    webformatURL: string;
    tags: string;
  };
}

const FlipCardFront = styled.div`
  img {
    max-width: 100%;
    border-radius: 20px;
  }
`;

const FlipCardBack = styled.div`
  background-color: black;
  color: white;
  transform: rotateY(180deg);
  overflow: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #000000;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #424242;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #868686;
  }
`;

const FlipCardInner = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transition-timing-function: ease-in-out;

  h1 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  ${FlipCardBack} {
    padding: 10px 15px 10px 15px;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    border-radius: 20px 0 0 20px;
  }
  ${FlipCardFront} {
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }
`;

const FlipCard = styled.div`
  background-color: transparent;
  perspective: 1000px;
  margin-bottom: 15px;

  &:hover {
    ${FlipCardInner} {
      transform: rotateY(180deg);
    }
  }
`;

const FavoriteCardList = ({ item }: Props): JSX.Element => {
  const { webformatURL, tags } = item;

  return (
    <FlipCard>
      <FlipCardInner>
        <FlipCardFront>
          <img src={webformatURL} alt={tags} />
        </FlipCardFront>
        <FlipCardBack>
          <h1>your birth</h1>
          <p>
            397년 - 호노리우스 황제에 의해 로마에서 야만인의 옷(barbarian
            clothing)을 입는 것이 금지되다.
          </p>
          <p>
            451년 - 훈족의 아틸라가 프랑스의 메스를 약탈하고 갈리아의 다른
            도시를 공격하다.
          </p>
          <p>
            529년 - 동로마 제국의 유스티니아누스 1세가 로마법 대전의 첫 번째
            초안을 편찬하다.
          </p>
          <p>
            1141년 - 마틸다 황후가 잉글랜드의 레이디(Lady of the English)로
            선출됨으로써 영국 최초의 여성 통치자가 되다.
          </p>
        </FlipCardBack>
      </FlipCardInner>
    </FlipCard>
  );
};

export default FavoriteCardList;
