import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

export default function LaunchPage() {
  const [date, setDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [test, setTest] = useState(true);

  const handleInputValue = (e: any) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  let now = new Date();
  let day = ('0' + now.getDate()).slice(-2);
  let month = ('0' + (now.getMonth() + 1)).slice(-2);
  let year = now.getFullYear();
  let nowData = `${year}${month}${day}`;

  const inputHandler = (e: any) => {
    setSelectedDate(e.target.value);
    console.log('input', selectedDate);
    // 유효성 검사
    if (selectedDate.length > 8) {
    }
  };
  const testHandler = () => {
    // 유효성검사
    if (test) {
      window.location.href = `https://localhost:3000/weather/${selectedDate}`;
    }
  };

  return (
    <LaunchScreen>
      <h1>What Happend</h1>

      <div>
        <InputDate type='number' placeholder='입력예시: 19900101' onChange={inputHandler}></InputDate>
      </div>

      <h1>on Your BirthDay!</h1>

      <InputDate
        id='datepicker'
        type='date'
        min={'1920-01-01'}
        max={nowData}
        onChange={handleInputValue}
      ></InputDate>
      <div>
        <input type='text' maxLength={4} className='c_year' />년
        <input type='text' maxLength={2} className='c_month' />월
        <input type='text' maxLength={2} className='c_day' />일
      </div>
      <button onClick={testHandler}>test2</button>

      <BirthwikiBtnT to={`/weather/${date}`}>test</BirthwikiBtnT>
      <BirthwikiBtn to={`/weather/${selectedDate}`}>Birth Wiki!</BirthwikiBtn>
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
`;

const BirthwikiBtn = styled(Link)`
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
const BirthwikiBtnT = styled(Link)`
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
