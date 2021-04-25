import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import 'dotenv/config';

export default function BirthWikiSearch({ year, month, day }: any) {
  const [date, setDate] = useState({ year: year, month: month, day: day });
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
      console.log(date.year + '-' + date.month + '-' + date.day);
    }
  };

  const birthwikiHandler = () => {
    let selectDate = date.year + '-' + date.month + '-' + date.day;
    if (date.year !== '0' && date.month !== '0' && date.day !== '0') {
      window.location.href = `${process.env.REACT_APP_CLIENT_URL}/main/${selectDate}`;
    } else {
      setWarning(true);
    }
  };

  return (
    <BirthwikiSearch>
      <InputContiner>
        <InputDate
          type='number'
          id='year'
          min='1'
          max={curYear}
          defaultValue={year}
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
          defaultValue={month}
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
          defaultValue={day}
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
      </InputContiner>
      <BirthwikiBtn onClick={birthwikiHandler}>Birth Wiki!</BirthwikiBtn>
      {warning ? (
        <span className='warning'>날짜를 다시 입력해 주세요</span>
      ) : (
        <span className='warning'></span>
      )}
    </BirthwikiSearch>
  );
}
const BirthwikiSearch = styled.div`
  font-family: sans-serif;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-repeat: repeat-x;
  /* background-image: url('../movie.png'); */
  background-position: x y;
  background-size: 100%;

  & .warning {
    margin: 10px;
  }
`;

const InputContiner = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputDate = styled.input`
  box-sizing: border-box;
  color: #060b26;
  outline: 0;
  padding: 0 20px 0;
  border: none;
  border-bottom: 2px solid #060b26;
  background-color: rgba(255, 255, 255, 0);
  margin: 5px;
  width: 100px;
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
  white-space: nowrap;
  padding: 16px 64px;
  color: #fff;
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
