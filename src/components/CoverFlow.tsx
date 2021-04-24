import { url } from 'node:inspector';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './CoverFlow.css';
import FavoriteButton from './FavoriteButton';
import CreateCard from './CardCreate';

import movieCover from '../img/subData/movieCover.jpg';
import musicCover from '../img/subData/musicCover.jpg';
import recordCover from '../img/subData/recordCover.jpeg';
import { check } from 'prettier';

function CoverFlow(props: any) {
  const subMovie = {
    image: movieCover,
    korea: { title: '정보 없음', poster: '정보 없음' },
    world: { title: '정보 없음', poster: '정보 없음' },
  };
  const subMusic = {
    image: musicCover,
    korea: { title: '정보 없음', poster: '정보 없음', singer: '정보 없음' },
    world: { title: '정보 없음', poster: '정보 없음', singer: '정보 없음' },
  };

  const data = props.data;
  const issue = data.issueCard;
  const death = data.deathCard;
  const birth = data.birthCard;
  const movie = data.movieCard ? data.movieCard : subMovie;
  const music = data.musicCard ? data.musicCard : subMusic;

  const cardData = [issue, birth, death, movie, music, 0];
  const cardTitle = [
    '그날, 있었던 이슈',
    '그날, 누군가의 탄생',
    '그날, 누군가의 사망',
    '그때, 가장 핫한 영화',
    '그때, 가장 핫한 음악',
  ];

  const initCheck = Array(6).fill(false);
  initCheck[props.selected] = true;
  const [checked, setChecked] = useState(initCheck);

  const prevHandler = () => {
    const curCheck = checked.indexOf(true) === 0 ? 6 : checked.indexOf(true);
    const changeCheck = Array(6).fill(false);
    changeCheck[curCheck - 1] = true;
    setChecked(changeCheck);
  };

  const nextHandler = () => {
    const curCheck = checked.indexOf(true) === 5 ? -1 : checked.indexOf(true);
    const changeCheck = Array(6).fill(false);
    changeCheck[curCheck + 1] = true;
    setChecked(changeCheck);
  };

  const clickHandler = (idx: number) => {
    const changeCheck = Array(6).fill(false);
    changeCheck[idx] = true;
    setChecked(changeCheck);
  };

  const pressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      prevHandler();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      nextHandler();
    }
  };

  // let prevX: number[] = [];
  // const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
  //   prevX.push(e.clientX);
  //   if (prevX[0] > 0) {
  //     if (prevX[0] - e.clientX > 0) {
  //       setTimeout(() => {
  //         prevHandler();
  //         prevX = [];
  //       }, 100);
  //     } else if (prevX[0] - e.clientX < 0) {
  //       setTimeout(() => {
  //         nextHandler();
  //         prevX = [];
  //       }, 100);
  //     }
  //   }
  // };

  let prevArr: number[] = [];
  let nextArr: number[] = [];
  const wheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      prevArr.push(1);
      setTimeout(() => {
        if (prevArr[0]) {
          prevHandler();
          prevArr = [];
        }
      }, 100);
    } else if (e.deltaY < 0) {
      nextArr.push(1);
      setTimeout(() => {
        if (nextArr[0]) {
          nextHandler();
          nextArr = [];
        }
      }, 100);
    }
  };

  return (
    <Container
    // onDrag={(e) => {
    //   dragHandler(e);
    // }}
    >
      <button onClick={prevHandler} className='moveBtn'>
        테스형!
      </button>
      <div className='slider' tabIndex={0} onKeyUp={pressHandler}>
        {cardData.map((el, idx: any) => {
          return (
            <input
              key={idx}
              type='checkbox'
              className='slideInput'
              name='testimonial'
              id={`t-${idx + 1}`}
              checked={checked[idx]}
              onClick={() => {
                clickHandler(idx);
              }}
            />
          );
        })}
        <div className='testimonials'>
          {cardData.map((el, idx) => {
            if (idx < 5) {
              return (
                <label
                  key={idx}
                  className='item'
                  htmlFor={`t-${idx + 1}`}
                  style={{
                    backgroundImage: `url(${el.image})`,
                    backgroundSize: 'cover',
                  }}
                >
                  <FavoriteButton cardData={el} />
                  <h2 className='cardTitle'>{cardTitle[idx]}</h2>
                  <ul className='card_content'>
                    {el.contents ? (
                      el.contents.map((list: any, i: any) => {
                        return (
                          <li key={i}>
                            <span>{list[0]}</span> {list[1]}
                          </li>
                        );
                      })
                    ) : (
                      <div className='culture'>
                        <div>
                          <h3>
                            해외 : <span>{el.world.title}</span>
                            <p>{el.world.singer}</p>
                          </h3>

                          <img src={`${el.world.poster}`} alt={el.world.title} />
                        </div>
                        {el.korea ? (
                          <div>
                            <h3>
                              한국 : <span>{el.korea.title}</span>
                            </h3>
                            <img src={`${el.korea.poster}`} alt={el.korea.title} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </ul>
                </label>
              );
            }
          })}
          <label htmlFor='t-6' className='item'>
            {checked[5] ? (
              <CreateCard setIsFlow={props.setIsFlow} setIsHover={props.setIsHover} />
            ) : (
              <div>꺄라라라</div>
            )}
          </label>
        </div>
        <div className='dots' onWheel={wheelHandler}>
          {cardData.map((el, idx) => {
            return <label key={idx} htmlFor={`t-${idx + 1}`}></label>;
          })}
        </div>
      </div>
      <button onClick={nextHandler} className='moveBtn'>
        테스형!
      </button>
      <div
        className='slideBG'
        onClick={() => {
          //props.setIsFlow(false);
          //props.setIsHover(true);
        }}
        onWheel={wheelHandler}
      ></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  min-width: 100vw;
  min-height: 79vh;
  z-index: 2;

  & .cardTitle {
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    margin: 0;
    padding: 10px;
    border-radius: 10px 10px 0 0;
  }

  & .card_content {
    height: 270px;
    overflow-y: scroll;
    margin: 0;
    padding: 0;
    background: rgba(0, 0, 0, 0.1);
    position: relative;

    &::-webkit-scrollbar {
      width: 2px;
    }

    &::hover li {
      opacity: 0.2;
    }

    & li {
      list-style: none;
      padding: 10px;
      width: 100%;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
      transition: transform 0.5s;
      color: #fff;
      word-break: keep-all;
    }

    & li:hover {
      transform: scale(1.05);
      z-index: 100;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      font-weight: 700;
    }

    & li span {
      width: 20%;
      height: 22px;
      text-align: center;
      line-height: 22px;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      display: inline-block;
      border-radius: 15px;
      margin-right: 10px;
      font-size: 15px;
      font-weight: 700;
      transform: translateY(-2px);
    }

    & li:hover span {
      background: rgba(255, 255, 255, 0.8);
      color: #f20;
    }
  }

  & .culture {
    display: flex;
    flex-direction: column-reverse;

    & h3 {
      color: #fff;
      margin-bottom: 4px;
    }

    & h3 span {
      font-size: 1.5rem;
    }

    & img {
      border-radius: 10px;
      display: inline-block;
      width: 50%;
      height: 100%;
      object-fit: contain;
    }
  }

  & .slideBG {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  & .slider {
    outline: none;
  }

  & .moveBtn {
    position: relative;
    z-index: 2;
  }
`;

export default CoverFlow;
