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

  const CardLists = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 4% 2% 0;
    box-sizing: border-box;
    height: 60vh;
    background: linear-gradient(rgba(204, 255, 255, 0) 30%, rgba(248, 251, 233, 1) 60%);
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
    top: 100px;
    color: #fff;
    cursor: pointer;
    @media only screen and (width: 500px) {
      display: none;
    }
    & h2 {
      font-size: 3.2vh;
      display: block;
      text-align: center;
      height: 6vh;
      line-height: 1.6;
      color: #fff;
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

  const closeCard = (e: React.SyntheticEvent) => {
    //배경 클릭시 카드 off
    if (cardRef.current === (e.target as typeof e.target)) {
      setShowCard(false);
    }
  };

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

export default HoverCard;
