import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import HoverCard from '../components/HoverCard';
import Weather from '../components/Weather';
import CoverFlow from '../components/CoverFlow';
import BirthWikiSearch from '../components/BirthWikiSearch';

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
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const date = selectedDate.split('/')[2];
  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2200);

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
    justify-content: space-between;
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

    @media (max-width: 1400px) {
      height: auto;
    }
  `;

  const openCard = () => {
    setShowCard((prev) => !prev);
  };

  return (
    <>
      {isLoading ? (
        <LoadingImg>
          <div>
            <img src={`${process.env.PUBLIC_URL}/mainLoading2.gif`}></img>
          </div>
        </LoadingImg>
      ) : data ? (
        <Background>
          {isHover ? (
            <>
              <DateInput>
                <BirthWikiSearch year={year} month={month} day={day} />
              </DateInput>
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
          {isFlow ? (
            <CoverFlow
              data={data}
              selectedDate={selectedDate}
              selected={selected}
              setIsFlow={setIsFlow}
              setIsHover={setIsHover}
            />
          ) : null}
        </Background>
      ) : null}
    </>
  );
};

const LoadingImg = styled.div`
  width: 100vw;
  height: 100vh;
  & div {
    top: 25%;
    left: 25%;
    position: relative;
    height: 50%;
    width: 50%;
    & img {
      height: 100%;
      width: 100%;
    }
  }
`;

const DateInput = styled.div`
  padding: 10px 10px 10px 10;
  margin-top: 140px;
  margin-bottom: 20px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);

  input {
    display: block;
    font-size: 1.3rem;
    height: 25px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    outline: none;
    box-shadow: 0px 3px rgb(0 0 0 / 50%);
    -webkit-transition: 0.4s ease;
    transition: 0.4s ease;
    margin-bottom: 20px;

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
    width: 55vw;
  }

  @media (max-width: 600px) {
    width: 70%;
  }
`;

export default Main;
