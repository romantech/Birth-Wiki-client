import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

interface Props {
  shareModal: boolean;
  setShareModal: React.Dispatch<React.SetStateAction<boolean>>;
  xyPosition: {
    pageX: number;
    pageY: number;
  };
}

const FavoriteShareModal = ({ shareModal, setShareModal, xyPosition }: Props) => {
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: shareModal ? 1 : 0,
  });

  return (
    <>
      {shareModal ? (
        <animated.div style={animation}>
          <ModalWrapper xyPosition={xyPosition} onMouseLeave={() => setShareModal((prev) => !prev)}>
            in development...
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

export default FavoriteShareModal;
