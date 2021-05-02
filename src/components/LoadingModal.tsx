import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function LoadingModal() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? (
    <Background>
      <LoadingImg>
        <div>
          <img src={`${process.env.PUBLIC_URL}/mainLoading2.gif`}></img>
        </div>
      </LoadingImg>
    </Background>
  ) : null;
}

export default LoadingModal;

const LoadingImg = styled.div`
  width: 100%;
  height: 100%;
  & div {
    position: relative;
    height: 100%;
    width: 100%;
    & img {
      height: 100%;
      width: 100%;
    }
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.342);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;
