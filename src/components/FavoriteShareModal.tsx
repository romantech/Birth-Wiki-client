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
  return <>{shareModal ? <ModalWrapper xyPosition={xyPosition}>in development...</ModalWrapper> : null}</>;
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
