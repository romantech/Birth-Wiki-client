import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring'; //나중에 react-spring@next 설치 알리기..
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react'; //@types-swiper도 같이 설치...
import SwiperCore, { Navigation, Pagination, A11y, EffectCoverflow, EffectFade, Controller } from 'swiper';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

// Import Swiper styles
import 'swiper/swiper.scss'; // npm install node-sass
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Pagination, A11y, EffectCoverflow, EffectFade, Controller]);

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const CardWrapper = styled.div`
  width: 100vw;
  z-index: 130;

  & .swiper-container {
    height: 60vh;
  }

  & .swiper-slide {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    color: #fff;
    font-size: 1.2rem;
    border-radius: 10px;
  }

  & .swiper-slide .swiperContent {
    position: absolute;
  }

  & .swiper-slide h2 {
    margin: 2rem;
  }

  & #controller {
    position: fixed;
    left: 0;
    right: 0;
    bottom: -20vh;
    height: 100vh;
  }
`;
const CardClicked = ({ showCard, setShowCard }: { showCard: boolean; setShowCard: any }) => {
  const initData = useSelector((state: RootState) => state.dataReducer.data); //redux
  const [controlledSwiper, setControlledSwiper]: any = useState(null);

  const cardRef: any = useRef<HTMLDivElement>(null); //카드 off
  const animation: any = useSpring({
    config: {
      duration: 200,
    },
    opacity: showCard ? 1 : 0,
    transform: showCard ? `translateY(0%)` : `translateY(100%)`,
  }); //카드 클릭시 에니메이션 효과

  const closeCard = (e: React.SyntheticEvent) => {
    if (cardRef.current === (e.target as typeof e.target)) {
      setShowCard(false);
    }
  };

  return (
    <>
      {showCard ? (
        <Background ref={cardRef} onClick={closeCard}>
          <animated.div style={animation}>
            <CardWrapper>
              <Swiper
                effect='coverflow'
                controller={{ control: controlledSwiper }}
                spaceBetween={50}
                slidesPerView={3}
                mousewheel={true}
                loop={true}
                navigation
                pagination={{ clickable: true }}
              >
                {initData.map((data) => (
                  <SwiperSlide key={data.id}>
                    <div className='swiperContent'>
                      <h2>{data.title}</h2>
                      <ul>
                        {data.content.map((list) => (
                          <li key={list}>{list}</li>
                        ))}
                      </ul>
                    </div>
                    <img
                      style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover', borderRadius: '10px' }}
                      src={data.img}
                      alt={data.img}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </CardWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

export default CardClicked;
