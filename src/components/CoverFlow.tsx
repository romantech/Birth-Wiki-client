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
                <label key={idx} className='item' htmlFor={`t-${idx + 1}`}>
                  {/* 이슈 버스 데스 */}
                  {el.contents ? (
                    <div className='inner_item'>
                      <div className='sideImg'>
                        <img src={`${el.image}`} alt={`${el.category}`} />
                      </div>
                      <div className='sideContent'>
                        <div>
                          <h1>날짜</h1>
                          <h3 className='cardTitle'>{cardTitle[idx]}</h3>
                        </div>
                        <div className='issueList'>
                          {el.contents.map((list: any, i: any) => {
                            return (
                              <p key={i}>
                                <span>{list[0]}</span> <br /> {list[1]}
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
                        <img src={`${el.world.poster}`} alt={`${el.world.title}`} />
                      </div>
                      <div className='sideContent'>
                        <div>
                          <h1>날짜</h1>
                          <h3 className='cardTitle'>{cardTitle[idx]}</h3>
                        </div>
                        <div>
                          {el.world ? (
                            <>
                              <img
                                src={`${el.world.poster}`}
                                alt={`${el.world.title}`}
                                style={{ width: '100px', height: '100px' }}
                              />
                              <h4>{el.world.title}</h4>
                            </>
                          ) : (
                            <div>자료없음</div>
                          )}
                          <p>해외</p>
                          {el.korea ? (
                            <>
                              <img
                                src={`${el.korea.poster}`}
                                alt={`${el.korea.title}`}
                                style={{ width: '100px', height: '100px' }}
                              />
                              <h4>{el.korea.title}</h4>
                            </>
                          ) : (
                            <div>자료없음</div>
                          )}
                          <p>한국</p>
                        </div>
                        <div>
                          <FavoriteButton cardData={el} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 영화 뮤직 */}
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
          props.setIsFlow(false);
          props.setIsHover(true);
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
  min-height: 100vh;
  z-index: 2;

  & .inner_item {
    display: flex;

    & .sideImg {
      width: 50%;
      background: #fff;
      color: #000;
      box-shadow: 0 5px 16px rgb(0 0 0 / 20%);
      border-radius: 15px;
      z-index: 3;
      position: relative;
    }

    & .sideImg img {
      width: 100%;
      min-height: 70vh;
      object-fit: cover;
    }

    & .sideContent {
      width: 50%;
      height: 430px;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.8;
      color: #141414;
      padding: 35px;
      overflow: auto;
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

      & span {
        color: #f20;
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
  }
`;

export default CoverFlow;
