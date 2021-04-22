import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import HoverCard from '../components/HoverCard';
import CardLists from '../components/CardLists';
import Weather from '../components/Weather';
import CoverFlow from '../components/CoverFlow';

import clear from '../img/clear.jpg';
import rain from '../img/rain.jpg';
import snow from '../img/snow.jpg';
import cloud from '../img/cloud.jpg';
import solar from '../img/solar.jpg';
import lightning from '../img/lightning.jpg';

const Main = () => {
  const selectedDate = new URL(window.location.href).pathname;
  const [showCard, setShowCard] = useState(false);
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(clear);
  const [isHover, setIsHover] = useState(true);
  const [isFlow, setIsFlow] = useState(false);
  const [isHoriz, setisHoriz] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    Axios({
      url: 'https://server.birthwiki.space/data/date',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { date: `${selectedDate.split('/')[2]}` },
    }).then((res) => {
      res.data.data.weatherCard ? weatherSW(res.data.data.weatherCard.weather) : setWeather(clear);
      setData(res.data.data);
    });
  }, []);

  const weatherSW = (weather: string) => {
    switch (weather) {
      case '맑음':
        setWeather(clear);
        break;
      case '햇무리':
        setWeather(solar);
        break;
      case '비':
        setWeather(rain);
        break;
      case '눈':
      case '진눈깨비':
        setWeather(snow);
        break;
      case '안개':
        setWeather(cloud);
        break;
      case '뇌전':
        setWeather(lightning);
        break;
      case '우박':
        setWeather(snow);
        break;
    }
  };

  const Background = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 100%;
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
      font-size: 1.3rem;
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

  const WeatherDetail = styled.div`
    width: 35vw;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    background: rgba(0, 0, 0, 0.6);
    border-radius: 14px;
    color: #fff;
    text-align: center;
    padding: 20px;

    @media (max-width: 920px) {
      width: 45vw;
    }

    @media (max-width: 600px) {
      width: 90%;
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
            <input type='text' placeholder={selectedDate.split('/')[2]} />
          </DateInput>
          {isHover ? (
            <>
              <WeatherDetail>
                <Weather data={data} selectedDate={selectedDate} />
              </WeatherDetail>
              <HoverCard
                data={data}
                setSelected={setSelected}
                setIsFlow={setIsFlow}
                setIsHover={setIsHover}
              />
            </>
          ) : null}
          {isFlow ? <CoverFlow data={data} selected={selected} /> : null}
          {/* isHoriz?<HorizFlow data={data} /> : null */}
        </Background>
      ) : null}
    </>
  );
};

export default Main;
