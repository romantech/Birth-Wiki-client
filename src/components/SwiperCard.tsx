import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react'; //@types-swiper도 같이 설치...
import SwiperCore, { A11y, EffectCoverflow, Navigation } from 'swiper';
import CardCreate from './CardCreate';
import FavoriteButton from './FavoriteButton';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';

// Import Swiper styles
import 'swiper/swiper.scss'; // npm install node-sass
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { url } from 'node:inspector';

SwiperCore.use([A11y, EffectCoverflow, Navigation]);
//data

const SwiperCard = (props: any) => {
  // { issue, death, birth, music, culture }
  const data = props;
  const issue = data.issue;
  const death = data.death;
  const birth = data.birth;
  const music = data.music;
  const movie = data.culture;

  const CardWrapper = styled.div`
    width: 85vw;
    transition: all 0.5s ease;

    & .swiper-container {
      overflow: visible;
      perspective: 2000px;
    }

    & .swiper-slide {
      width: 100%;
      height: 275px;
      color: #fff;
      font-size: 0.8rem;
      border-radius: 15px;
      background-size: cover;
    }

    & .swiper-slide-next {
      transform: scale(1.2) !important;
      z-index: 1;
    }

    & .swiper-slide-next .box:hover .imgBx:before {
      opacity: 1;
    }

    & .swiper-slide-next .box:hover .content h2 {
      transform: translateY(0px);
    }

    & .swiper-slide-next .box:hover .content p {
      transform: translateY(0px);
    }

    & @media only screen and (min-width: 700px) {
      & .swiper-slide-active .box:hover .imgBx:before {
        opacity: 1;
      }
    }

    & @media only screen and (min-width: 700px) {
      & .swiper-slide-active .box:hover .content h2 {
        transform: translateY(0px);
      }
    }

    & @media only screen and (min-width: 700px) {
      & .swiper-slide-active .box:hover .content p {
        transform: translateY(0px);
      }
    }
  `;

  const SlideCard = styled.div`
    & .box {
      position: relative;
      width: 100%;
      height: 275px;
      background: #000;
      transition: 0.5s;
      overflow: hidden;
      border-radius: 15px;
    }
    & .imgBx {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    & .imgBx > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    & .imgBx:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
      z-index: 1;
      opacity: 0;
      transition: 0.5s;
    }
    & .box .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      padding: 20px;
      align-items: felx-end;
      box-sizing: border-box;
    }
    & .box .content h2 {
      color: #fff;
      transition: 0.5s;
      text-transform: uppercase;
      margin-bottom: 5px;
      font-size: 20px;
      transform: translateY(200px);
    }
    & .box .content p {
      color: #fff;
      transition: 0.5s;
      font-size: 14px;
      transform: translateY(200px);
    }
    & .content ul {
      overflow-y: scroll;
      margin: 0;
      padding: 0;
      height: 170px;
      ::-webkit-scrollbar {
        width: 2px;
      }
    }

    & .content ul li:before {
      content: '';
      position: absolute;
      left: 6px;
      top: 2px;
      width: 5px;
      height: 90%;
      border-radius: 10px;
      background: #eee;
    }

    & .content ul li {
      list-style: none;
      margin-top: 5px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      border-radius: 5px;
      padding: 7px 7px 7px 14px;
      position: relative;
      font-size: 0.8rem;
      font-weight: 600;
      line-height: 0.8rem;
    }
    & .content ul li .year {
      color: red;
      font-size: 0.9rem;
    }

    & .content .cultureContent {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: row;
    }

    & .content .cultureContent .cultureList {
      flex: 1;
      width: 100%;
      height: auto;
      background: none;

      & h4 {
        margin-bottom: 0;
      }

      &::before {
        display: none;
      }

      & img {
        display: block;
        object-fit: contain;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  `;

  return (
    <CardWrapper>
      <Swiper spaceBetween={30} slidesPerView={3} loop={true} effect='coverflow' navigation>
        <SwiperSlide className='SwipierSlide'>
          <SlideCard>
            <div className='box'>
              <div className='imgBx'>
                <img src={`${issue.image}`} alt='' />
              </div>
              <div className='content'>
                <div>
                  <FavoriteButton cardData={issue} />
                  <h2>이날, 이때 사건들</h2>
                  <p>
                    <ul>
                      {issue.contents.map((list: any, i: any) => {
                        return (
                          <li key={i}>
                            <span className='year'>{list[0]}</span> : <span>{list[1]}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </SlideCard>
        </SwiperSlide>
        <SwiperSlide className='SwipierSlide'>
          <SlideCard>
            <div className='box'>
              <div className='imgBx'>
                <img src={`${birth.image}`} alt='' />
              </div>
              <div className='content'>
                <div>
                  <FavoriteButton cardData={birth} />
                  <h2>이날, 이때 태어난 사람들</h2>
                  <p>
                    <ul>
                      {birth.contents.map((list: any, i: any) => {
                        return (
                          <li key={i}>
                            <span className='year'>{list[0]}</span> : <span>{list[1]}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </SlideCard>
        </SwiperSlide>
        <SwiperSlide className='SwipierSlide'>
          <SlideCard>
            <div className='box'>
              <div className='imgBx'>
                <img src={`${movie.image}`} alt='' />
              </div>
              <div className='content'>
                <div>
                  <FavoriteButton cardData={movie} />
                  <h2>그달의 영화</h2>
                  <p>
                    <ul className='cultureContent'>
                      <li className='cultureList'>
                        <h4>{movie.world.title}</h4>
                        <img src={`${movie.world.poster}`} alt={`${movie.world.title}`} />
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </SlideCard>
        </SwiperSlide>
        <SwiperSlide className='SwipierSlide'>
          <SlideCard>
            <div className='box'>
              <div className='imgBx'>
                {music.image ? (
                  <img src={`${music.image}`} alt={`${music.world.title}`} />
                ) : (
                  <img
                    src='https://www.musicaroma.kr/img/no_img_s.png'
                    style={{ width: '100%' }}
                    alt={`${music.world.title}`}
                  />
                )}
                {/* <img src={`${music.image}`} alt='' /> */}
              </div>
              <div className='content'>
                <div>
                  <FavoriteButton cardData={music} />
                  <h2>그달의 음악</h2>
                  <p>
                    <ul className='cultureContent'>
                      <li className='cultureList'>
                        <h4>
                          {music.world.title}, <br /> {music.world.singer}
                        </h4>
                        <span></span>
                        <img src={`${music.world.poster}`} alt={music.world.title} />
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </SlideCard>
        </SwiperSlide>
        <SwiperSlide className='SwipierSlide'>
          <SlideCard>
            <div className='box'>
              <div className='imgBx'>
                <img src={`${death.image}`} alt='' />
              </div>
              <div className='content'>
                <div>
                  <FavoriteButton cardData={death} />
                  <h2>이날, 이때 돌아가신 사람들</h2>
                  <p>
                    <ul>
                      {death.contents.map((list: any, i: any) => {
                        return (
                          <li key={i}>
                            <span className='year'>{list[0]}</span> : <span>{list[1]}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </SlideCard>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperSlide>
            <CardCreate />
          </SwiperSlide>
        </SwiperSlide>
      </Swiper>
    </CardWrapper>
  );
};

export default SwiperCard;
