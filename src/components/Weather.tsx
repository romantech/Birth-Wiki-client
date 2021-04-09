import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardLists from './CardList';
import WikiCulture from './WikiCulture';
import clear from '../img/clear.png';
import rain from '../img/rain.png';
import snow from '../img/snow.png';
import cloud from '../img/cloud.png';

export default function Weather() {
  const [weather, setWeather] = useState(clear);
  const [text, setText] = useState('화창한');

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

  const Background = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    object-fit: contain;
    background: url(${weather}) center center/cover no-repeat;
    transition: 0.5s ease;
  `;

  const [show, setShow] = useState(true);

  return (
    <Background>
      <DateInput>
        <input type='text' onKeyPress={typeWeather} placeholder='Search...' />
      </DateInput>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? '블랙' : '화이트'}
      </button>
      <WeatherText>
        <p>{`${text} 날씨에 태어나셨습니다.`}</p>
        <div className={'culture ' + (show ? 'culture-dark' : 'culture-light')}></div>
      </WeatherText>
      <WikiCulture />
      <CardLists />
    </Background>
  );
}

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
    background-color: rgba(255, 255, 255, 0.5);
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

  & .culture {
    width: 100%;
    height: 50px;
    background: red;
  }

  & .culture-dark {
    background: black;
  }
  & .culture-light {
    background: white;
  }
`;
