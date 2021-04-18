import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

export default function LaunchPage() {
  const [date, setDate] = useState({ year: '0', month: '0', day: '0' });

  let curNow = new Date();
  let curDay = curNow.getDate();
  let curMonth = curNow.getMonth() + 1;
  let curYear = curNow.getFullYear();

  useEffect(() => {
    console.log(date);
  });

  const pressHandler = (e: any, here: string, next: string) => {
    if (here === 'year' && String(e.target.value).length > 4) {
      e.target.value = 2021;
      setDate({ ...date, year: '2021' });
      document.getElementById(next)!.focus();
    } else if (here === 'year' && String(e.target.value).length === 4) {
      if (curYear < Number(e.target.value)) {
        e.target.value = curYear;
      }
      setDate({ ...date, year: e.target.value });
      document.getElementById(next)!.focus();
    }

    if (here === 'month') {
      if (date.year === String(curYear)) {
        if (curMonth < Number(e.target.value)) {
          e.target.value = curMonth;
        }
        if (e.target.value > 1) {
          setDate({ ...date, month: String(curMonth) });
          document.getElementById(next)!.focus();
        }
      } else {
        if (e.target.value > 12) {
          e.target.value = 12;
          setDate({ ...date, month: '12' });
          document.getElementById(next)!.focus();
        } else if (e.target.value > 1) {
          setDate({ ...date, month: e.target.value });
          document.getElementById(next)!.focus();
        }
      }
    }

    if (here === 'day') {
      if (date.year === String(curYear) && date.month === String(curMonth)) {
        if (curDay <= Number(e.target.value)) {
          e.target.value = curDay - 1;
        }
        setDate({ ...date, day: String(curDay - 1) });
      }
      let lastDate = new Date(Number(date.year), Number(date.month), 0).getDate();
      if (e.target.value > lastDate) {
        e.target.value = lastDate;
        setDate({ ...date, day: String(lastDate) });
      } else {
        setDate({ ...date, day: e.target.value });
      }
    }
  };

  const blurHandler = (e: any, here: string, next: string) => {
    if (here === 'year') {
      setDate({ ...date, year: e.target.value });
    } else if (here === 'month') {
      if (Number(e.target.value) === 0 || Number(e.target.value) === 1) {
        setDate({ ...date, month: '1' });
      }
    } else if (here === 'day') {
      setDate({ ...date, day: e.target.value });
    }
  };

  const enterHandler = (e: any, here: string, next: string) => {
    if (e.key === 'Enter') {
      if (here === 'year') {
        setDate({ ...date, year: e.target.value });
        document.getElementById(next)!.focus();
      } else if (here === 'month') {
        setDate({ ...date, month: e.target.value });
        document.getElementById(next)!.focus();
      } else if (here === 'day') {
        let selectDate = date.year + '-' + date.month + '-' + date.day;
        console.log(selectDate);
        //페이지 이동하는 함수
      }
    }
  };

  const birthwikiHandler = () => {
    let selectDate = date.year + '-' + date.month + '-' + date.day;
    if (date.year !== '0' && date.month !== '0' && date.day !== '0') {
      window.location.href = `https://localhost:3000/weather/${selectDate}`;
    } else {
      console.log('모달로 에러메세지 띄우기');
    }
  };

  return (
    <LaunchScreen>
      <h1>What Happend</h1>
      <h1>on Your BirthDay!</h1>

      <form>
        <InputDate
          type='number'
          id='year'
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
        년
        <InputDate
          type='number'
          id='month'
          max='12'
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
        월
        <InputDate
          type='number'
          id='day'
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
        일
      </form>

      <BirthwikiBtn onClick={birthwikiHandler}>Birth Wiki!</BirthwikiBtn>
    </LaunchScreen>
  );
}

const LaunchScreen = styled.div`
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
  animation: movebg 3s linear infinite;

  @keyframes movebg {
    0% {
      background-position: 0 center;
    }
    100% {
      background-position: 500px center;
    }
  }
`;
const InputDate = styled.input`
  width: 266px;
  height: 30px;
  font-size: 1.7rem;
  padding: 0.5rem;
  margin: 0.4rem;
  text-align: center;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const BirthwikiBtn = styled.button`
  background: yellow;
  border-radius: 50px;
  white-space: nowrap;
  padding: 16px 64px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
