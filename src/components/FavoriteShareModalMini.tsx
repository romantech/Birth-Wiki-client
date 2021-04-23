import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

interface Props {
  shareModalMini: boolean;
  setShareModalMini: React.Dispatch<React.SetStateAction<boolean>>;
  xyPosition: {
    pageX: number;
    pageY: number;
  };
}

const FavoriteShareModalMini = ({ shareModalMini, setShareModalMini, xyPosition }: Props) => {
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: shareModalMini ? 1 : 0,
  });

  return (
    <>
      {shareModalMini ? (
        <animated.div style={animation}>
          <ModalWrapper xyPosition={xyPosition} onMouseLeave={() => setShareModalMini((prev) => !prev)}>
            🚀 in development...
          </ModalWrapper>
        </animated.div>
      ) : null}
    </>
  );
};

const ModalWrapper = styled.div<{ xyPosition: { pageY: number; pageX: number } }>`
  width: 270px;
  height: 100px;
  background: #fff;
  color: #000;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  z-index: 5;
  position: absolute;
  top: ${(props) => props.xyPosition.pageY + -150 + 'px'};
  text-align: center;
  line-height: 100px;
`;

export default FavoriteShareModalMini;
