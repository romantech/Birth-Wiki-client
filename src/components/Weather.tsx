import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WiDaySunny } from 'react-icons/wi';
import sun from '../img/icons/sun.png';
import rain from '../img/icons/rain.png';
import cloud from '../img/icons/cloud.png';
import lightning from '../img/icons/lightning.png';
import snow from '../img/icons/snow.png';
import iridescence from '../img/icons/iridescence.png';
import noData from '../img/icons/noData.png';

interface tempOBJ {
  평균기온?: string;
  최고기온?: string;
  최저기온?: string;
}

const Weather = ({ data, selectedDate }: any) => {
  interface weatherIcon {
    sun: string;
    rain: string;
    cloud: string;
    snow: string;
    lightning: string;
    moon: string;
  }

  const weatherData = data.weatherCard ? data.weatherCard : null;
  const temprature: tempOBJ = weatherData
    ? Object.assign({}, weatherData.temperature[0], weatherData.temperature[1], weatherData.temperature[2])
    : { 평균기온: '0.0 ℃', 최고기온: '0.0 ℃', 최저기온: '0.0 ℃' };

  const [iconUp, setIconUp] = useState<weatherIcon | null>(null) as any;
  const [text, setText] = useState('날씨 정보가 없습니다.');

  useEffect(() => {
    if (weatherData) {
      switch (weatherData.weather) {
        case '맑음':
          setText('화창한 날입니다.');
          setIconUp(sun);
          break;
        case '햇무리':
          setText('햇무리가 진 날입니다.');
          setIconUp(sun);
          break;
        case '비':
          setText('비가 내리는 날입니다.');
          setIconUp(rain);
          break;
        case '눈':
        case '진눈깨비':
          setText('눈이 내리는 날입니다.');
          setIconUp(snow);
          break;
        case '안개':
          setText('안개가 많이 낀 날입니다.');
          setIconUp(cloud);
          break;
        case '뇌전':
          setText('번개가 치는 날입니다.');
          setIconUp(lightning);
          break;
        case '채운':
          setText('채운이 지는 날입니다.');
          setIconUp(iridescence);
          break;
        case '우박':
          setText('우박이 내린 날입니다.');
          setIconUp(rain); //우박 아이콘이 없을까요?
          break;
      }
    }
  }, []);

  const WeatherText = styled.div`
    padding: 1.2rem;
    font-size: 1.1rem;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);

    & h3 {
      margin: 0;
    }
  `;

  return (
    <TopCulture>
      <div>
        <WeatherText>
          <h3>
            {`${selectedDate.split('/')[2]}`} <br /> {text}
          </h3>
        </WeatherText>

        <div className='container'>
          <div className='temp'>
            <p>
              평균기온 : <span>{temprature['평균기온']}</span>
            </p>
            <p>
              최고기온 : <span>{temprature['최고기온']}</span>
            </p>
            <p>
              최저기온 : <span>{temprature['최저기온']}</span>
            </p>
          </div>
          <div className='icon'>
            <WeatherImg>
              <img src={`${iconUp}`} alt='' style={{ width: '9.5rem' }} />
            </WeatherImg>
            <h2>
              {weatherData ? (
                weatherData.weather
              ) : (
                <img src={noData} alt='noWeatherData' style={{ width: '60%', height: '60%' }} />
              )}
            </h2>
          </div>
        </div>
      </div>
    </TopCulture>
  );
};

const TopCulture = styled.div`
  & .container {
    display: flex;
    margin-top: 20px;

    @media (max-width: 920px) {
      flex-flow: column-reverse;

      & h2 {
        margin: 0;
      }
    }
  }

  & .icon {
    flex: 1;
  }

  & .temp {
    flex: 1;
    font-size: 1.1rem;
    font-weight: 700;

    @media (max-width: 920px) {
      & p {
        margin: 0;
      }
    }

    & p {
      margin-bottom: 0;
    }
    & span {
      padding-left: 10px;
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;

const WeatherImg = styled.div``;

export default Weather;
