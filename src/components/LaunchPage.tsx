import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import BirthWikiSearch from './BirthWikiSearch';

export default function LaunchPage() {
  const [date, setDate] = useState({ year: '0', month: '0', day: '0' });
  const [warning, setWarning] = useState(false);

  let curNow = new Date();
  let curDay = curNow.getDate();
  let curMonth = curNow.getMonth() + 1;
  let curYear = curNow.getFullYear();

  const pressHandler = (e: any, here: string, next: string) => {
    setWarning(false);
    let numValue = Number(e.target.value);

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
      console.log(date.year + '-' + date.month + '-' + date.day);
    }
  };

  const birthwikiHandler = () => {
    let selectDate = date.year + '-' + date.month + '-' + date.day;
    if (date.year !== '0' && date.month !== '0' && date.day !== '0') {
      window.location.href = `https://localhost:3000/main/${selectDate}`;
    } else {
      setWarning(true);
    }
  };
  return (
    <LaunchScreen>
      <WordsContainner>
        <Words>What happened</Words>
        <Words>on Your BirthDay!</Words>
      </WordsContainner>
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
          ></InputDate>{' '}
          <span>일</span>
        </InputSubmit>
        {warning ? (
          <div className='warning'>날짜를 다시 입력해 주세요</div>
        ) : (
          <div className='warning'>&nbsp;</div>
        )}
        <BirthwikiBtn onClick={birthwikiHandler}>Birth Wiki!</BirthwikiBtn>
      </InputContiner>
    </LaunchScreen>
  );
}

const Words = styled.span`
  color: #000;
  text-transform: uppercase;
  display: block;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 30px;
  position: relative;
  animation: text 3s 1;

  @keyframes text {
    0% {
      color: black;
      margin-bottom: -10px;
    }
    30% {
      letter-spacing: 25px;
      margin-bottom: -10px;
    }
    85% {
      letter-spacing: 8px;
      margin-bottom: -15px;
    }
  }
`;
const WordsContainner = styled.div`
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const LaunchScreen = styled.div`
  font-family: sans-serif;
  background: #fff;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  background-repeat: repeat-x;
  /* background-image: url('../movie.png'); */
  background-position: x y;
  background-size: 100%;

  & .warning {
    margin: 10px;
  }
`;

const InputContiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputSubmit = styled.form`
  display: block;
  justify-content: space-between;
  padding: 5px;
`;

const InputDate = styled.input`
  box-sizing: border-box;
  color: #060b26;
  outline: 0;
  padding: 0 10px 0;
  border: none;
  border-bottom: 2px solid #060b26;
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
`;

const BirthwikiBtn = styled.button`
  background: #060b26;
  border-radius: 50px;
  padding: 16px 20px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  width: 120px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
