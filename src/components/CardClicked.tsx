import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring'; //나중에 react-spring@next 설치 알리기..
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react'; //@types-swiper도 같이 설치...
import SwiperCore, { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.scss'; // npm install node-sass
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Pagination, A11y, EffectCoverflow]);

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
  width: 1000px;
  z-index: 130;
`;

const CardClicked = ({ showCard, setShowCard }: { showCard: boolean; setShowCard: any }) => {
  const cardRef: any = useRef<HTMLDivElement>(null);

  const animation: any = useSpring({
    config: {
      duration: 200,
    },
    opacity: showCard ? 1 : 0,
    transform: showCard ? `translateY(0%)` : `translateY(100%)`,
  });

  const closeCard = (e: React.SyntheticEvent) => {
    if (cardRef.current === (e.target as typeof e.target)) {
      setShowCard(false);
    }
  };

  const data = [
    {
      id: 1,
      username: 'jake',
      img: 'https://images.unsplash.com/photo-1527239441953-caffd968d952',
    },
    {
      id: 2,
      username: 'jake',
      img: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91',
    },
    {
      id: 3,
      username: 'jake',
      img: 'https://images.unsplash.com/photo-1557180295-76eee20ae8aa',
    },
    {
      id: 4,
      username: 'jake',
      img: 'https://images.unsplash.com/photo-1535043205849-513fe27db33e',
    },
    {
      id: 5,
      username: 'jake',
      img: 'https://images.unsplash.com/photo-1554866585-cd94860890b7',
    },
    {
      id: 6,
      username: 'jake',
      img: 'https://images.unsplash.com/photo-1493612276216-ee3925520721',
    },
  ];

  return (
    <>
      {showCard ? (
        <Background ref={cardRef} onClick={closeCard}>
          <animated.div style={animation}>
            <CardWrapper>
              <Swiper
                effect='coverflow'
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {data.map((image) => (
                  <SwiperSlide style={{ width: '500px' }} key={image.id}>
                    <img style={{ width: '300px', height: '400px' }} src={image.img} alt='' />
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
