import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

function CardLists(props: any) {
  const [cardToShow, setCardToShow] = useState(null);
  const [cardDisplay, setCardDisplay] = useState(false);

  const data = props.data;
  // const dataArr = Object.entries(props.data);

  const items = Object.entries(data).map(([key, value]) => {
    <span>
      {key} {value}
    </span>;
  });

  console.log(items);

  // const cardDetail = dataArr.slice(0, dataArr.length - 1);
  // console.log(cardDetail);

  // const issue = data.issueCard;
  // const culture = data.movieCard;
  // const birth = data.birthCard;
  // const death = data.deathCard;
  // const music = data.musicCard;

  // const showCard = () => {
  //   setCardToShow();
  //   setCardDisplay(true);
  // };

  const CardLists = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    padding: 4% 2% 0;
    box-sizing: border-box;
    height: 40vh;
  `;

  const CardContents = styled.div`
    flex: 1;
    overflow: hidden;
    transition: 0.4s;
    margin: 0 1%;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.4);
    border-radius: 15px;
    background-size: cover;
    position: relative;
    top: 100px;
    color: #fff;
    cursor: pointer;

    @media only screen and (width: 500px) {
      display: none;
    }

    & h2 {
      font-size: 3.2vh;
      display: block;
      text-align: center;
      height: 6vh;
      line-height: 1.6;
      color: #fff;
      text-transform: uppercase;
    }

    &:hover {
      flex: 0 0 25%;
      top: 0px;
    }

    & img:hover {
      width: 100%;
      height: 100%;
    }
  `;

  const CardBg = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.7) 100%),
      url(${props.weather}) center center/cover no-repeat;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  `;

  return (
    <div>
      <CardLists>
        {/* <CardContents onClick={() => {}} style={{ backgroundImage: `url(${issue.image})` }}>
          <h2>문화</h2>
        </CardContents>
        <CardContents onClick={() => {}} style={{ backgroundImage: `url(${culture.image})` }}>
          <h2>이슈</h2>
        </CardContents>
        <CardContents onClick={() => {}} style={{ backgroundImage: `url(${birth.image})` }}>
          <h2>탄생</h2>
        </CardContents>
        <CardContents onClick={() => {}} style={{ backgroundImage: `url(${death.image})` }}>
          <h2>사망</h2>
        </CardContents> */}
        <CardContents
          onClick={() => {}}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1527345931282-806d3b11967f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80')`,
          }}
        >
          <h2>기록카드 작성</h2>
        </CardContents>
        {/* swiper_Modal */}
        {/* <CardBg>
          <SwiperCard issue={issue} music={music} culture={culture} birth={birth} death={death} />
        </CardBg> */}
        {/* swiper_Modal */}
      </CardLists>
    </div>
  );
}

export default CardLists;
