import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { CgMouse } from 'react-icons/cg';

import 'dotenv/config';

export default function LaunchPage_1({ setIsLoading }: any) {
  const [date, setDate] = useState({ year: '0', month: '0', day: '0' });
  const [warning, setWarning] = useState(false);

  let curNow = new Date();
  let curDay = curNow.getDate();
  let curMonth = curNow.getMonth() + 1;
  let curYear = curNow.getFullYear();

  const pressHandler = (e: any, here: string, next: string) => {
    setWarning(false);
    let numValue = Number(e.target.value) === 0 ? '' : Number(e.target.value);

    if (here === 'year') {
      e.target.value = numValue > curYear ? String(curYear) : String(numValue);
      setDate({ ...date, year: e.target.value });
      if (e.target.value.length === 4) {
        document.getElementById(next)!.focus();
      }
    }

    if (here === 'month') {
      if (date.year === String(curYear)) {
        e.target.value = numValue > curMonth ? String(curMonth) : String(numValue);
      } else {
        e.target.value = numValue > 12 ? '12' : String(numValue);
      }
      setDate({ ...date, month: e.target.value });

      if (Number(e.target.value) > 1) {
        document.getElementById(next)!.focus();
      }
    }

    if (here === 'day') {
      let lastDate: number = new Date(Number(date.year), Number(date.month), 0).getDate();

      if (date.year === String(curYear) && date.month === String(curMonth)) {
        e.target.value = numValue >= curDay ? String(curDay - 1) : String(numValue);
      } else {
        e.target.value = numValue > lastDate ? String(lastDate) : String(numValue);
      }
      setDate({ ...date, day: e.target.value });
    }
  };

  const blurHandler = (e: any, here: string, next: string) => {
    let numValue = Number(e.target.value);

    if (here === 'year') {
      e.target.value = numValue > curYear ? String(curYear) : String(numValue);
      setDate({ ...date, year: e.target.value });
    }

    if (here === 'month') {
      if (date.year === String(curYear)) {
        e.target.value = numValue > curMonth ? String(curMonth) : String(numValue);
      } else {
        e.target.value = numValue > 12 ? '12' : String(numValue);
      }
      setDate({ ...date, month: e.target.value });
    }

    if (here === 'day') {
      let lastDate: number = new Date(Number(date.year), Number(date.month), 0).getDate();

      if (date.year === String(curYear) && date.month === String(curMonth)) {
        e.target.value = numValue >= curDay ? String(curDay - 1) : String(numValue);
      } else {
        e.target.value = numValue > lastDate ? String(lastDate) : String(numValue);
      }
      setDate({ ...date, day: e.target.value });
    }
  };

  const enterHandler = (e: any, here: string, next: string) => {
    if (e.key === 'Enter') {
      if (here !== 'day') {
        document.getElementById(next)!.focus();
      } else {
        birthwikiHandler();
      }
    }
  };

  const birthwikiHandler = () => {
    let selectDate = date.year + '-' + date.month + '-' + date.day;
    if (date.year !== '0' && date.month !== '0' && date.day !== '0') {
      setIsLoading(true);
      //setTimeout(() => {}, 1000);
      window.location.replace(`${process.env.REACT_APP_CLIENT_URL}/main/${selectDate}`);
    } else {
      setWarning(true);
    }
  };

  return (
    <>
      <LaunchScreen>
        <img className='img' src={`${process.env.PUBLIC_URL}/section1.png`} />
        <MainDescContainer>
          <SubTitle>Welcome!</SubTitle>
          <Title>
            내 생일에 어떤 일이 있었는지 <br />
            궁금하지 않으신가요?
          </Title>
          <SubTitle>생일을 입력해보세요</SubTitle>
        </MainDescContainer>
        <InputContiner>
          <InputSubmit>
            <InputDate
              type='number'
              id='year'
              min='1'
              max={curYear}
              placeholder='1990'
              onKeyUp={(e) => {
                pressHandler(e, 'year', 'month');
              }}
              onBlur={(e) => {
                blurHandler(e, 'year', 'month');
              }}
              onKeyPress={(e) => {
                enterHandler(e, 'year', 'month');
              }}
              onFocus={(e) => {
                e.target.value = '';
              }}
            ></InputDate>{' '}
            <span>년</span>
            <InputDate
              type='number'
              id='month'
              max='12'
              min='1'
              placeholder='1'
              onKeyUp={(e) => {
                pressHandler(e, 'month', 'day');
              }}
              onBlur={(e) => {
                blurHandler(e, 'month', 'day');
              }}
              onKeyPress={(e) => {
                enterHandler(e, 'month', 'day');
              }}
              onFocus={(e) => {
                e.target.value = '';
              }}
            ></InputDate>{' '}
            <span>월</span>
            <InputDate
              type='number'
              id='day'
              min='1'
              max='31'
              placeholder='1'
              onKeyUp={(e) => {
                pressHandler(e, 'day', '');
              }}
              onBlur={(e) => {
                blurHandler(e, 'day', '');
              }}
              onKeyPress={(e) => {
                enterHandler(e, 'day', '');
              }}
              onFocus={(e) => {
                e.target.value = '';
              }}
            ></InputDate>{' '}
            <span>일</span>
          </InputSubmit>
          {warning ? (
            <WarningMsg className='warning'>날짜를 다시 입력해 주세요</WarningMsg>
          ) : (
            <WarningMsg className='warning'>&nbsp;</WarningMsg>
          )}
          <BirthwikiBtn onClick={birthwikiHandler}>Birth Wiki!</BirthwikiBtn>
        </InputContiner>
        <Nextbtn></Nextbtn>
      </LaunchScreen>
    </>
  );
}

const LaunchScreen = styled.section`
  font-family: sans-serif;
  background: rgba(246, 246, 240, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;
  background-repeat: repeat-x;
  background-size: 100%;

  & .warning {
    margin: 10px;
  }
  & .img {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
`;

const MainDescContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 100px;
  @media (max-width: 699px) {
    left: 50px;
  }
`;

const Title = styled.div`
  font-size: 3em;
  font-weight: 800;
  letter-spacing: 0.1rem;
  line-height: 4.5rem;
  color: #2b2e4a;
  margin-bottom: 20px;

  @media (max-width: 699px) {
    flex-direction: column;
    line-height: 4rem;
  }
  @media (max-width: 499px) {
    font-size: 2rem;
    line-height: 3rem;
  }
`;

const SubTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  line-height: 3rem;
  color: #2b2e4a;

  @media (max-width: 699px) {
    flex-direction: column;
    line-height: 3rem;
  }
  @media (max-width: 499px) {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

const InputContiner = styled.div`
  position: absolute;
  left: 100px;
  top: 65%;
  display: flex;

  @media (max-width: 699px) {
    left: 50px;
  }

  @media screen and (max-width: 499px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InputSubmit = styled.form`
  display: inline-block;
  justify-content: space-between;
  padding: 5px;
  @media screen and (max-width: 499px) {
    flex-direction: column;
  }
`;

const InputDate = styled.input`
  box-sizing: border-box;
  color: #2b2e4a;
  outline: 0;
  padding: 0 10px 0;
  border: none;
  border-bottom: 2px solid #2b2e4a;
  background-color: rgba(255, 255, 255, 0);
  margin: 5px;
  height: 30px;
  font-size: 1.7rem;
  text-align: center;
  ::-webkit-inner-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media screen and (max-width: 499px) {
    font-size: 1.5rem;
    height: 25px;
    padding: 0;
  }
`;

const BirthwikiBtn = styled.button`
  background: #2b2e4a;
  border-radius: 50px;
  padding: 10px 20px;
  color: rgb(246, 246, 240);
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  width: 120px;
  margin-left: 10px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgb(246, 246, 240);
    box-shadow: 0 4px 15px 0 rgb(0 0 0 / 30%);
    color: #2b2e4a;
  }
  @media screen and (max-width: 499px) {
    margin: 10px;
  }
`;

const Nextbtn = styled(CgMouse)`
  position: absolute;
  width: 3vw;
  height: 3vh;
  left: 48.5vw;
  animation: down_ani 1.5s ease-in-out infinite;

  @keyframes down_ani {
    0% {
      top: 93vh;
    }
    50% {
      top: 90vh;
    }
    100% {
      top: 93vh;
    }
  }
  @media screen and (max-width: 499px) {
    width: 5vw;
    height: 5vh;
  }
`;

const WarningMsg = styled.div`
  position: absolute;
  left: 20px;
  top: 82%;
  font-size: 1rem;
  font-weight: 500;

  @media (max-width: 499px) {
    top: 100%;
  }
`;
