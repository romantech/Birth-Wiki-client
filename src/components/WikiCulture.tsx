import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WiDaySunny } from 'react-icons/wi';
import sun from '../img/icons/sun.png';
import rain from '../img/icons/rain.png';
import cloud from '../img/icons/cloud.png';
import lightning from '../img/icons/lightning.png';
import snow from '../img/icons/snow.png';

const WikiCulture = (props: any) => {
  interface weatherIcon {
    sun: string;
    rain: string;
    cloud: string;
    snow: string;
    lightning: string;
    moon: string;
  }

  const weatherData = props.data.weatherCard;
  const weatherTemp = weatherData.temperature;
  const avgTemp = weatherTemp[0];
  const maxTemp = weatherTemp[1];
  const lowTemp = weatherTemp[2];

  const [wIcon, setWIcon] = useState(weatherData.weather);
  const [iconUp, setIconUp] = useState<weatherIcon | null>(null) as any;
  console.log(wIcon);

  useEffect(() => {
    if (wIcon === '햇무리' || wIcon === '맑음') {
      setIconUp(sun);
    } else if (wIcon === '비') {
      setIconUp(rain);
    } else if (wIcon === '안개') {
      setIconUp(cloud);
    } else if (wIcon === '눈' || wIcon === '진눈깨비') {
      setIconUp(snow);
    } else if (wIcon === '뇌전') {
      setIconUp(lightning);
    } else {
      setIconUp(null);
    }
  }, [wIcon]);
  // 햇무리 / 달무리 / 채운 / 우박 / 진눈깨비 / 눈 / 뇌전 / 비 / 안개 / 맑음
  return (
    <TopCulture>
      {weatherData ? (
        <div className='container'>
          <div className='temp'>
            <p>
              평균기온 : <span>{avgTemp['평균기온']}</span>
            </p>
            <p>
              최고기온 : <span>{maxTemp['최고기온']}</span>
            </p>
            <p>
              최저기온 : <span>{lowTemp['최저기온']}</span>
            </p>
          </div>
          <div className='icon'>
            <WeatherImg>
              <img src={`${iconUp}`} alt='' style={{ width: '9.5rem' }} />
              {/* <WiDaySunny style={{ fontSize: '10rem' }} /> */}
            </WeatherImg>
            <h2>{weatherData.weather}</h2>
          </div>
        </div>
      ) : (
        <div>날씨 자료가 없습니다.</div>
      )}
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

export default WikiCulture;
