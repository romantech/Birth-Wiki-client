import React, { useState } from 'react';
import styled from 'styled-components';
import CardClicked from './CardClicked';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

const Card = () => {
  const [showCard, setShowCard] = useState(false);

  const initData = useSelector((state: RootState) => state.dataReducer.data);
  const isLogin = useSelector((state: RootState) => state.loginReducer);

  const openCard = () => {
    setShowCard((prev) => !prev);
  };

  const cardlists = initData.map((data) => (
    <CardContents
      key={data.id}
      onClick={() => {
        openCard();
      }}
    >
      <span>{data.category}</span>
      <img src={data.img} alt='' />
    </CardContents>
  ));

  if (isLogin) {
    return (
      <CardLists>
        {cardlists}
        <CardContents>
          <CardCreate>
            <span style={{ fontSize: '1.2rem' }}>기록카드 만들기</span>
            <img
              src='https://images.unsplash.com/photo-1527345931282-806d3b11967f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
              alt=''
            />
          </CardCreate>
        </CardContents>
        <CardClicked showCard={showCard} setShowCard={setShowCard} />
      </CardLists>
    );
  } else {
    return (
      <CardLists>
        {cardlists}
        <CardClicked showCard={showCard} setShowCard={setShowCard} />
      </CardLists>
    );
  }
};

const CardCreate = styled.div``;

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
