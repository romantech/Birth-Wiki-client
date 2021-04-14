import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react'; //@types-swiper도 같이 설치...
import SwiperCore, { A11y, EffectCoverflow } from 'swiper';

import clear from '../img/clear.jpg';

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
      background: linear-gradient(180deg, #f00, #000);
      z-index: 1;
      opacity: 0;
      transition: 0.5s;
    }

    & .box:hover .imgBx:before {
      opacity: 1;
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
    & .box:hover .content h2 {
      transform: translateY(0px);
    }

    & .box:hover .content p {
      transform: translateY(0px);
    }

    & .content ul {
      height: 150px;
    }

    & .content ul {
      overflow-y: scroll;
      margin: 0;

      ::-webkit-scrollbar {
        width: 2px;
      }
    }
  `;

  return (
    <>
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
        ))}
      </Swiper>
    </>
  );
};

export default SwiperCard;
