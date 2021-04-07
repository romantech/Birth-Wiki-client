import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardLists from './CardList';
import WikiCulture from './WikiCulture';

const api = {
  keys: 'fdc351b8fee958abbcb8b3c4dcb156e1',
  base: 'https://api.openweathermap.org/data/2.5',
};

export default function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e: any) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.keys}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };
  return (
    <>
      <Background>
        <DateInput>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
            placeholder='Search...'
          />
        </DateInput>
        <WeatherText>
          <p>{`맑은 날씨에 태어나셨습니다.`}</p>
        </WeatherText>
        <WikiCulture />
        <CardLists />
      </Background>
    </>
  );
}

const Background = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url(https://source.unsplash.com/1920x1028/?nature,clear);

  & .rain {
    background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0.1) 20%,
        rgba(20, 20, 20, 0.7) 80%,
        rgba(20, 20, 20, 1)
      ),
      url(https://source.unsplash.com/1600x900/?nature,rain);
  }
  & .clear {
    background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0.1) 20%,
        rgba(20, 20, 20, 0.7) 80%,
        rgba(20, 20, 20, 1)
      ),
      url(https://source.unsplash.com/1600x900/?nature,clear);
  }
  & .cloud {
    background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0.1) 20%,
        rgba(20, 20, 20, 0.7) 80%,
        rgba(20, 20, 20, 1)
      ),
      url(https://source.unsplash.com/1600x900/?nature,cloud);
  }
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
`;
