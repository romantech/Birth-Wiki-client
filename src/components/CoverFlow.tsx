import { url } from 'node:inspector';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './CoverFlow.css';
import FavoriteButton from './FavoriteButton';
import CreateCard from './CardCreate';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

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
  const [isMove, setIsMove] = useState(false);

  const prevHandler = () => {
    const curCheck = checked.indexOf(true) === 0 ? 6 : checked.indexOf(true);
    const changeCheck = Array(6).fill(false);
    changeCheck[curCheck - 1] = true;
    setChecked(changeCheck);
    props.setSelected(curCheck - 1);
  };

  const nextHandler = () => {
    const curCheck = checked.indexOf(true) === 5 ? -1 : checked.indexOf(true);
    const changeCheck = Array(6).fill(false);
    changeCheck[curCheck + 1] = true;
    setChecked(changeCheck);
  };

  const clickHandler = (idx: number) => {
    if (!isMove) {
      const changeCheck = Array(6).fill(false);
      changeCheck[idx] = true;
      setChecked(changeCheck);
    }
    setIsMove(false);
  };

  const pressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      prevHandler();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      nextHandler();
    }
  };

  let prevArr: number[] = [];
  let nextArr: number[] = [];
  const wheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    // if (e.deltaY > 0) {
    //   prevArr.push(1);
    //   setTimeout(() => {
    //     if (prevArr[0]) {
    //       prevHandler();
    //       prevArr = [];
    //     }
    //   }, 100);
    // } else
    if (e.deltaY < 0) {
      nextArr.push(1);
      setTimeout(() => {
        if (nextArr[0]) {
          nextHandler();
          nextArr = [];
        }
      }, 100);
    }
  };

  let startP: number;
  let endP: number;
  function dragStart(e: any) {
    setIsMove(true);
    e.preventDefault();
    if (e.type === 'touchstart') {
      startP = e.touches[0].clientX;
    } else {
      startP = e.clientX;
    }
    document.onmousemove = dragAction;
    document.onmouseup = dragEnd;
  }

  function dragAction(e: any) {
    if (e.type === 'touchmove') {
      endP = e.touches[0].clientX;
    } else {
      endP = e.clientX;
    }
  }

  async function dragEnd(e: any) {
    if (startP - endP > 0) {
      await nextHandler();
    } else if (startP - endP < 0) {
      await prevHandler();
    }

    document.onmousemove = null;
    document.onmouseup = null;
  }

  return (
    <Container>
      <button onClick={prevHandler} className='moveBtn'>
        <FaRegArrowAltCircleLeft />
      </button>
      <div className='slider' tabIndex={0} onKeyUp={pressHandler} draggable='true' onDragStart={dragStart}>
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
                <label key={idx} className='item' htmlFor={`t-${idx + 1}`}>
                  {el.contents ? (
                    <div className='inner_item'>
                      <div className='sideImg'>
                        <img
                          src={`${el.image}`}
                          alt={`${el.category}`}
                          draggable='false'
                          onWheel={wheelHandler}
                        />
                      </div>
                      <div className='sideContent'>
                        <div>
                          <h2 className='cardTitle'>{cardTitle[idx]}</h2>
                        </div>
                        <div className='issueList'>
                          {el.contents.map((list: any, i: any) => {
                            return (
                              <p key={i}>
                                <span>{list[0]}</span> {list[1]}
                              </p>
                            );
                          })}
                        </div>
                        <div>
                          <FavoriteButton cardData={el} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='inner_item'>
                      <div className='sideImg'>
                        <img
                          src={`${el.image}`}
                          alt={`${el.category}`}
                          draggable='false'
                          onWheel={wheelHandler}
                        />
                      </div>
                      <div className='sideContent'>
                        <div>
                          <h2 className='cardTitle'>{cardTitle[idx]}</h2>
                        </div>
                        <div>
                          {el.world ? (
                            <>
                              <img
                                src={`${el.world.poster}`}
                                alt={`${el.world.title}`}
                                style={{ width: '100px', height: '100px' }}
                                draggable='false'
                              />
                              <h3>{el.world.title}</h3>
                            </>
                          ) : (
                            <div>자료없음</div>
                          )}
                          {el.world.singer ? <h4>{el.world.singer.replace('&amp;', '&')}</h4> : null}
                          <p>해외</p>
                          {el.korea ? (
                            <>
                              <img
                                src={`${el.korea.poster}`}
                                alt={`${el.korea.title}`}
                                style={{ width: '100px', height: '100px' }}
                                draggable='false'
                              />
                              <h4>{el.korea.title}</h4>
                            </>
                          ) : (
                            <div>자료없음</div>
                          )}
                          {el.korea.singer ? <h4>{el.korea.singer.replace('&amp;', '&')}</h4> : null}
                          <p>한국</p>
                        </div>
                        <div>
                          <FavoriteButton cardData={el} />
                        </div>
                      </div>
                    </div>
                  )}
                </label>
              );
            }
          })}
          <label htmlFor='t-6' className='item'>
            {checked[5] ? (
              <div className='inner_item'>
                <div className='sideImg'>
                  <img
                    src={`${recordCover}`}
                    alt={`${recordCover}`}
                    draggable='false'
                    onWheel={wheelHandler}
                  />
                </div>
                <div className='sideContent'>
                  <CreateCard setChecked={setChecked} />
                </div>
              </div>
            ) : (
              <div>
                <img
                  src={`${recordCover}`}
                  alt={`${recordCover}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
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
        <FaRegArrowAltCircleRight />
      </button>
      <div
        className='slideBG'
        draggable={true}
        onClick={() => {
          props.setIsFlow(false);
          props.setIsHover(true);
        }}
      ></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  min-width: 85vw;
  min-height: 100vh;
  z-index: 2;
  user-select: none;

  & .inner_item {
    display: flex;

    & .sideImg {
      width: 100%;
      background: #fff;
      color: #000;
      box-shadow: 0 5px 16px rgb(0 0 0 / 20%);
      border-radius: 15px;
      z-index: 3;
      position: relative;

      @media (max-width: 699px) {
        width: 100%;
      }
    }

    & .sideImg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & .sideContent {
      width: 100%;
      height: 430px;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.8;
      color: #141414;
      padding: 10px;
      overflow: auto;

      & img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 6px solid #eee;
      }

      @media (max-width: 699px) {
        width: 100%;
        padding: 0;
      }
    }

    & .sideContent p:after {
      content: '';
      display: block;
      border-bottom: 1px solid rgba(155, 155, 155, 0.13);
      margin-top: 10px;
    }

    & .sideContent::-webkit-scrollbar {
      width: 2px;
    }

    & .issueList p {
      word-break: keep-all;
      font-size: 1.1rem;
      font-weight: 600;

      & span {
        color: #333;
        padding: 5px 10px;
        border-radius: 15px;
        background: #eee;
      }

      @media (max-width: 699px) {
        font-size: 0.8rem;
      }
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
    font-size: 3rem;
    background: none;
    line-height: 90px;
    width: 100px;
    height: 80px;
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }

  & .moveBtn:active {
    color: #fff;
  }
`;

export default CoverFlow;
