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
    align-items: flex-end;
    background: linear-gradient(rgba(204, 255, 255, 0) 30%, rgba(248, 251, 233, 1) 60%);
  `;

  const CardContents = styled.div`
    color: #fff;
    background-size: cover;
    margin: 0 1%;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
    top: 40px;
    height: 50%;
    overflow: hidden;
    border-radius: 15px;
    position: relative;
    flex: 1;
    transition: 0.3s ease-out;
    cursor: pointer;

    & h2 {
      font-size: 3.2vh;
      display: block;
      text-align: center;
      height: 3vh;
      line-height: 0;
      text-transform: uppercase;
      transition: 0.3s;
      opacity: 0;
      z-index: 3;
      top: 50px;
      position: relative;
    }

    &:hover {
      top: 10px;
      &:before {
        opacity: 1;
      }
      & h2 {
        opacity: 1;
        color: rga(0, 0, 0);
        top: 0px;
      }
    }

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      transition: 0.5s;
      z-index: 2;
      opacity: 0;
    }

    @media only screen and (max-width: 500px) {
      display: none;
    }
  `;

  const Icon = styled.div`
    position: relative;
    opacity: 1;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    animation: fadeout 5s;
    -moz-animation: fadeout 5s;
    -webkit-animation: fadeout 5s;
    -o-animation: fadeout 5s;
    animation-fill-mode: forwards;

    & img {
      width: 50px;
      height: 50px;
    }

    @keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-moz-keyframes fadeout {
      /* Firefox */
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-webkit-keyframes fadeout {
      /* Safari and Chrome */
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-o-keyframes fadeout {
      /* Opera */
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
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
        if (idx === 0) {
          return (
            <>
              <Icon>
                <img src={click}></img>
              </Icon>
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
            </>
          );
        } else {
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
        }
      })}
    </CardLists>
  );
};

export default HoverCard;
