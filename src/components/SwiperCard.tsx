import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react'; //@types-swiper도 같이 설치...
import SwiperCore, { A11y, EffectCoverflow } from 'swiper';
import Media from 'react-media';
import CardCreate from './CardCreate';

//redux
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Import Swiper styles
import 'swiper/swiper.scss'; // npm install node-sass
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([A11y, EffectCoverflow]);

const SwiperCard = () => {
  const initData = useSelector((state: RootState) => state.dataReducer.data);

  const [cardInfo, setCardInfo] = useState({
    cardDesc: '',
    image_urls: '',
  });

  const CardWrapper = styled.div`
    width: 85vw;
    transition: all 0.5s ease;

    & .swiper-container {
      overflow: visible;
      perspective: 2000px;
    }

    & .swiper-slide {
      width: 100%;
      background: #000;
      color: #fff;
      font-size: 0.8rem;
      border-radius: 15px;
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

  const Slide = styled.div`
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

    & .imgBx img {
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
      background: linear-gradient(180deg, #000, #000);
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
      height: 150px;

      ::-webkit-scrollbar {
        width: 2px;
      }
    }
  `;

  return (
    <CardWrapper>
      <Media query='(min-width: 700px)'>
        {(matches) => {
          return matches ? (
            <Swiper spaceBetween={30} slidesPerView={3} loop={true} effect='coverflow'>
              {initData.map((data) => (
                <SwiperSlide className='SwipierSlide' key={data.id}>
                  <Slide>
                    <div className='box'>
                      <div className='imgBx'>
                        <img src={data.img} alt='' />
                      </div>
                      <div className='content'>
                        <div>
                          <h2>{data.title}</h2>
                          <p>
                            <ul>
                              {data.content.map((list) => (
                                <li key={list}>{list}</li>
                              ))}
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Slide>
                </SwiperSlide>
              ))}{' '}
              <SwiperSlide className='SwipierSlide'>
                <Slide>
                  {/* 기록카드 만들기 component */}
                  <CardCreate />
                </Slide>
              </SwiperSlide>
            </Swiper>
          ) : (
            <Swiper spaceBetween={50} slidesPerView={1} direction='vertical' loop={true}>
              {initData.map((data) => (
                <SwiperSlide className='SwipierSlide' key={data.id}>
                  <Slide>
                    <div className='box'>
                      <div className='imgBx'>
                        <img src={data.img} alt='' />
                      </div>
                      <div className='content'>
                        <div>
                          <h2>{data.title}</h2>
                          <ul>
                            {data.content.map((list) => (
                              <li key={list}>{list}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Slide>
                </SwiperSlide>
              ))}
            </Swiper>
          );
        }}
      </Media>
    </CardWrapper>
  );
};

export default SwiperCard;
