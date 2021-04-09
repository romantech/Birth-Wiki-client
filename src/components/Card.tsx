import React, { useState } from 'react';
import styled from 'styled-components';

export default function Card() {
  const [show, setShow] = useState(true);

  return (
    <Style
      onClick={() => {
        setShow(!show);
      }}
    >
      <div className={'card ' + (show ? 'active' : 'noActive')}>
        <Title>Title</Title>
        <Screenshot />
        <Content />
      </div>
    </Style>
  );
}

const Title = styled.span`
  display: block;
  font-size: 1.25em;
  font-weight: 500;
  position: absolute;
  z-index: 101;
  transition: all 0.5s ease;
  color: #fff;
`;

const Screenshot = styled.figure`
  z-index: 100;
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 200px;
  background: url(https://source.unsplash.com/random/280x200) 0 0 no-repeat;
  background-size: cover;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  backface-visibility: hidden;
  transition: 0.5s ease;
`;

const Content = styled.div``;

const Style = styled.div`
  & .card {
    position: relative;
    bottom: -50px;
    flex-shrink: 0;
    width: 280px;
    margin: 0px 5px 0px 5px;
    text-algin: left;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.5s ease;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.12), 0 20px 20px -10px rgba(0, 0, 0, 0.125);

    &:hover {
      transform: translate(0px, -50px);

      ${Screenshot} {
        transform: translateY(4px) scale(0.8);
      }

      ${Title} {
        transform: translateX(30px);
        color: #000;
      }
    }
  }

  & .card.active {
    background: white;
  }
  & .card.noActive {
    background: black;
  }
`;
