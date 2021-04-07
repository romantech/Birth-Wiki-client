import React from 'react';
import styled from 'styled-components';

export default function CardLists() {
  return (
    <div>
      <CardContainer>
        <Cards>card1</Cards>
        <Cards>card2</Cards>
        <Cards>card3</Cards>
        <Cards>card4</Cards>
        <Cards>card5</Cards>
      </CardContainer>
    </div>
  );
}

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const Cards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 300px;
  margin: 10px;
  font-size: 1.5rem;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0px 0px 15px -5px;
  transition: 0.5s;
  position: relative;
  bottom: -180px;
  cursor: pointer;

  &:hover {
    transform: translate(0px, -100px);
  }
`;
