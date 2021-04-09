import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring'; //나중에 react-spring@next 설치 알리기..
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

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
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 130;
  border-radius: 10px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseCardButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const CardClicked = ({ showCard, setShowCard }: { showCard: boolean; setShowCard: any }) => {
  const cardRef: any = useRef<HTMLDivElement>(null);

  const animation: any = useSpring({
    config: {
      duration: 250,
    },
    opacity: showCard ? 1 : 0,
    transform: showCard ? `translateY(0%)` : `translateY(100%)`,
  });

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
              {/* <CardImg src={require('../img/clear.png')} alt='Card_BG' />
              <CardContent>
                <h1>Are you ready</h1>
                <p>Get exclusive access to our next launch</p>
                <button>Join Now</button>
              </CardContent>
              <CloseCardButton aria-label='Close card' onClick={() => setShowCard((prev: any) => !prev)} /> */}
            </CardWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

export default CardClicked;
