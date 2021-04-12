import React, { useState } from 'react';
import styled from 'styled-components';
import CardClicked from './CardClicked';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

const Card = () => {
  const [showCard, setShowCard] = useState(false);

  const initData = useSelector((state: RootState) => state.dataReducer.data);

  const openCard = () => {
    setShowCard((prev) => !prev);
  };

  return (
    <CardLists>
      {initData.map((data) => (
        <CardContents
          key={data.id}
          onClick={() => {
            openCard();
          }}
        >
          <span>{data.category}</span>
          <img src={data.img} alt='' />
        </CardContents>
      ))}
      <CardClicked showCard={showCard} setShowCard={setShowCard} />
    </CardLists>
  );
};

const CardLists = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 4% 2% 0;
  box-sizing: border-box;
  height: 50vh;
`;

const CardContents = styled.div`
  flex: 1;
  overflow: hidden;
  transition: 0.8s;
  margin: 0 1%;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  line-height: 0;
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  top: 100px;
  cursor: pointer;

  & img {
    width: 200%;
    height: calc(80% - -5vh);
    object-fit: cover;
    transition: 0.6s;
  }

  & span {
    font-size: 3.2vh;
    display: block;
    text-align: center;
    height: 6vh;
    line-height: 1.6;
    color: #fff;
    text-transform: uppercase;
  }

  &:hover {
    flex: 0 0 35%;
    top: 0px;
  }

  & img:hover {
    width: 100%;
    height: 100%;
  }
`;

export default Card;
