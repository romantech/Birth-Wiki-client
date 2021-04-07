import React from 'react';
import styled from 'styled-components';

export default function LaunchPage() {
  return (
    <div>
      <LaunchScreen>
        <h1>What Happend</h1>
        <InputDate type='date'></InputDate>

        <h1>on Your BirthDay!</h1>
      </LaunchScreen>
    </div>
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
`;
const InputDate = styled.input`
  width: 266px;
  height: 30px;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.4rem;
  text-align: center;
`;
