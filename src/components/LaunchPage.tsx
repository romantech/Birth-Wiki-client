import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function LaunchPage() {
  const [data, setData] = useState('');
  const handleInputValue = (key: string) => (e: any) => {
    setData(Object.assign({}, data, { [key]: e.target.value }));
  };

  let now = new Date();
  let nowData = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}`;
  console.log(nowData);

  return (
    <LaunchScreen>
      <h1>What Happend</h1>
      <InputDate type='date' max={nowData} onChange={handleInputValue('date')}></InputDate>

      <h1>on Your BirthDay!</h1>
      <BirthwikiBtn to='/weather'>Birth Wiki!</BirthwikiBtn>
    </LaunchScreen>
  );
}

const LaunchScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
  padding: 10px;
  width: 100%;
  height: 100vh;
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
