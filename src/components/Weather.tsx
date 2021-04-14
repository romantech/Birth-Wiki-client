import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import SwiperCard from './SwiperCard';

import { useSelector } from 'react-redux';
import { RootState } from '../store';

// 배경 이미지
import clear from '../img/clear.jpg';
import rain from '../img/rain.jpg';
import snow from '../img/snow.jpg';
import cloud from '../img/cloud.jpg';

export default function Weather() {
  const [weather, setWeather] = useState(clear);
  const [text, setText] = useState('화창한');
  const [showCard, setShowCard] = useState(false);
  const initData = useSelector((state: RootState) => state.dataReducer.data);
  const typeWeather = (e: any) => {
    if (e.key === 'Enter') {
      if (e.target.value === 'rain') {
        setWeather(rain);
        setText('축축한');
      } else if (e.target.value === 'snow') {
        setWeather(snow);
        setText('매서운');
      } else if (e.target.value === 'cloud') {
        setWeather(cloud);
        setText('우울한');
      } else if (e.target.value === 'clear') {
        setWeather(clear);
        setText('화창한');
      }
    }
  };

  const openCard = () => {
    setShowCard((prev) => !prev);
  };

  const Background = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    object-fit: contain;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0.3) 100%
      ),
      url(${weather}) center center/cover no-repeat;
    transition: 0.5s ease;
  `;

  const DateInput = styled.div`
    width: 100%;
    margin: 0 auto 35px;
    display: flex;
    justify-content: center;

    input {
      display: block;
      font-size: 20px;
      padding: 10px;
      background: none;
      appearance: none;
      border: none;
      outline: none;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 0 0 16px 16px;
      box-shadow: 0px 5px rgba(0, 0, 0, 0.2);
      transition: 0.4s ease;

      &:focus {
        background-color: rgba(255, 255, 255, 0.75);
      }
    }
  `;

  const WeatherText = styled.div`
    border-radius: 25px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      font-size: 1.4rem;
      font-weight: 800;
    }
  `;

  const TopCulture = styled.div`
    min-width: 600px;
    height: 400px;
    margin: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 16px;
  `;

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
    transition: 0.5s;
    margin: 0 1%;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    line-height: 0;
    background: rgba(0, 0, 0, 0.7);
    position: relative;
    top: 120px;
    cursor: pointer;

    & img {
      width: 150%;
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
      flex: 0 0 20%;
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
      url(${weather}) center center/cover no-repeat;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  `;

  const CardWrapper = styled.div`
    width: 90vw;
    transition: all 0.5s ease;

    & .swiper-container {
      overflow: visible;
      perspective: 2000px;
    }

    & .swiper-slide {
      width: 100%;
      background: #000;
      color: #fff;
      font-size: 0.8rem;
      border-radius: 15px;
    }

    & .swiper-slide.swiper-slide-next {
      transform: scale(1.2) !important;
      z-index: 1;
    }

    & .swiper-slide .swiperContent {
      display: flex;
      justify-content: space-beside;
      align-content: center;
      height: 150px;
    }
    & .swiper-slide .swiperContent ul {
      overflow-y: scroll;
      margin: 0;

      ::-webkit-scrollbar {
        width: 2px;
      }
    }

    & .swiper-slide h3 {
      margin: 0.5rem;
    }
  `;

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

  const cardRef: any = useRef<HTMLDivElement>(null); //카드 off
  const animation: any = useSpring({
    config: {
      duration: 200,
    },
    opacity: showCard ? 1 : 0,
    transform: showCard ? `translateY(0%)` : `translateY(100%)`,
  }); //카드 클릭시 에니메이션 효과

  const closeCard = (e: React.SyntheticEvent) => {
    if (cardRef.current === (e.target as typeof e.target)) {
      setShowCard(false);
    }
  };

  return (
    <Background>
      <DateInput>
        <input type='text' onKeyPress={typeWeather} placeholder='1991-11-29' />
      </DateInput>
      <WeatherText>
        <p>{`${text} 날씨에 태어나셨습니다.`}</p>
      </WeatherText>
      <TopCulture />
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
        <CardContents>
          <CardCreate>
            <span style={{ fontSize: '1.2rem' }}>찜한카드</span>
            <img
              src='https://images.unsplash.com/photo-1527345931282-806d3b11967f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
              alt=''
            />
          </CardCreate>
        </CardContents>
        {showCard ? (
          <CardBg ref={cardRef} onClick={closeCard}>
            <animated.div style={animation}>
              <CardWrapper>
                <SwiperCard />
              </CardWrapper>
            </animated.div>
          </CardBg>
        ) : null}
      </CardLists>
    </Background>
  );
}
