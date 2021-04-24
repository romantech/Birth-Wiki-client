import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import movieCover from '../img/subData/movieCover.jpg';
import musicCover from '../img/subData/musicCover.jpg';
import recordCover from '../img/subData/recordCover.jpeg';
import click from '../img/icons/click.jpg';

const HoverCard = (props: any) => {
  const data = props.data;
  const [showCard, setShowCard] = useState(false);

  const issue = data.issueCard;
  const birth = data.birthCard;
  const death = data.deathCard;
  const movie = data.movieCard ? data.movieCard : { image: movieCover };
  const music = data.musicCard ? data.musicCard : { image: musicCover };
  const cardData = [issue, birth, death, movie, music, { image: recordCover }];
  const cardTitle = ['ISSUE', 'BIRTH', 'DEATH', 'MOVIE', 'MUSIC', 'RECORD'];

  const openCard = () => {
    setShowCard((prev) => !prev);
  };

  const cardRef: any = useRef<HTMLDivElement>(null);
  const animation: any = useSpring({
    //카드 클릭시 에니메이션 효과
    config: {
      duration: 200,
    },
    opacity: showCard ? 1 : 0,
    transform: showCard ? `translateY(0%)` : `translateY(100%)`,
  });

  return (
    <CardLists>
      {cardData.map((el, idx) => {
        return (
          <CardContents
            key={idx}
            onClick={() => {
              props.setSelected(idx);
              props.setIsFlow(true);
              props.setIsHover(false);
            }}
            style={{ backgroundImage: `url(${el.image})` }}
          >
            <h2>{cardTitle[idx]}</h2>
          </CardContents>
        );
      })}
    </CardLists>
  );
};

const CardLists = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 4% 2% 0;
  box-sizing: border-box;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const CardContents = styled.div`
  flex: 1;
  overflow: hidden;
  transition: 0.4s;
  margin: 0 1%;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  background-size: cover;
  position: relative;
  height: 150px;
  top: 40px;
  color: #fff;
  cursor: pointer;

  @media (max-width: 800px) {
    top: 0px;
    width: 70%;
    margin: 0 auto 10px;
  }

  & h2 {
    font-size: 3.2vh;
    display: block;
    text-align: center;
    height: 6vh;
    line-height: 1.6;
    color: #fff;
    text-shadow: 2px 2px 14px rgba(0, 0, 0, 1);
    text-transform: uppercase;
  }
  &:hover {
    flex: 0 0 25%;
    top: 0px;
  }
  & img:hover {
    width: 100%;
    height: 100%;
  }
`;

export default HoverCard;
