import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import Card from './Card';
import WikiCulture from './WikiCulture';

// 배경 이미지
import clear from '../img/clear.jpg';
import rain from '../img/rain.jpg';
import snow from '../img/snow.jpg';
import cloud from '../img/cloud.jpg';

const Weather: React.FC = ({ match }: any) => {
  const selectedDate = match.params.date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
  const selectedDate2 = new URL(window.location.href).pathname;
  console.log(selectedDate);
  const [weather, setWeather] = useState(clear);
  const [text, setText] = useState('화창한');
  const [showCard, setShowCard] = useState(false);
  const initData = useSelector((state: RootState) => state.dataReducer.data);
  const [data, setData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  //data.weatherCard[0]
  useEffect(() => {
    console.log(selectedDate2.split('/')[2]);

    const fetchData = async () => {
      await Axios({
        url: 'https://server.birthwiki.space/data/date',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: { date: `${selectedDate2.split('/')[2]}` },
      }).then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
        setWeatherData(response.data.data.weatherCard[0]);
        console.log(response.data.data.weatherCard[0]);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (weatherData === '맑음') {
      setWeather(clear);
      setText('화창한');
    } else if (weatherData === '비') {
      setWeather(rain);
      setText('비 내리는');
    } else if (weatherData === '눈') {
      setWeather(snow);
      setText('눈 내리는');
    } else if (weatherData === '안개') {
      setWeather(cloud);
      setText('안개 끼는');
    }
  }, [weatherData]);

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

  const openCard = () => {
    setShowCard((prev) => !prev);
  };

  const cardRef: any = useRef<HTMLDivElement>(null);
  const animation: any = useSpring({
    //카드 클릭시 에니메이션 효과
    config: {
      duration: 200,
    },
    opacity: showCard ? 1 : 0,
    transform: showCard ? `translateY(0%)` : `translateY(100%)`,
  });

  const closeCard = (e: React.SyntheticEvent) => {
    //배경 클릭시 카드 off
    if (cardRef.current === (e.target as typeof e.target)) {
      setShowCard(false);
    }
  };

  return (
    <>
      {data ? (
        <Background>
          <DateInput>
            <input type='text' placeholder={selectedDate} />
          </DateInput>
          <WeatherText>
            <p>{`${text} 날씨에 태어나셨습니다.`}</p>
          </WeatherText>
          <WikiCulture data={data} />
          {/* 카드 리스트 start */}
          <Card data={data} weather={weather} />
          {/* 카드 리스트 end */}
        </Background>
      ) : null}
    </>
  );
};

export default Weather;
