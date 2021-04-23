import { url } from 'node:inspector';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './CoverFlow.css';
import FavoriteButton from './FavoriteButton';
import CreateCard from './CardCreate';

import movieCover from '../img/subData/movieCover.jpg';
import musicCover from '../img/subData/musicCover.jpg';

function CoverFlow(props: any) {
  const data = props.data;
  const issue = data.issueCard;
  const death = data.deathCard;
  const birth = data.birthCard;
  const movie = data.movieCard ? data.movieCard : { image: movieCover };
  const music = data.musicCard ? data.musicCard : { image: musicCover };

  const cardData = [issue, birth, death, movie, music];
  const cardTitle = [
    '그날, 있었던 이슈',
    '그날, 누군가의 탄생',
    '그날, 누군가의 사망',
    '그때, 가장 핫한 영화',
    '그때, 가장 핫한 음악',
  ];

  console.log(movie);

  return (
    <Container>
      <div className='slider'>
        {cardData.map((el, idx) => {
          if (props.selected === idx) {
            return (
              <input key={idx} type='radio' className='slideInput' name='testimonial' id={`t-${idx + 1}`} />
            );
          } else {
            return (
              <input key={idx} type='radio' className='slideInput' name='testimonial' id={`t-${idx + 1}`} />
            );
          }
        })}
        <input type='radio' className='slideInput' name='testimonial' id='t-6' />

        <div className='testimonials'>
          {cardData.map((el, idx) => {
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
          })}
          <label htmlFor='t-6' className='item'>
            <CreateCard />
          </label>
        </div>
        <div className='dots'>
          {cardData.map((el, idx) => {
            return <label key={idx} htmlFor={`t-${idx + 1}`}></label>;
          })}
          <label htmlFor='t-6'></label>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;

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
      width: 60px;
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
`;

export default CoverFlow;
