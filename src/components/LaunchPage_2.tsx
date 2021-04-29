import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function LaunchPage_2() {
  return (
    <LaunchPageContainer>
      <MainDescContainer>
        <Title>생일 검색해 보세요</Title>
      </MainDescContainer>

      <DescContainer>
        <TextContainer>
          <div className='text'>내 생일의 날씨정보</div>
          <div className='text'>내 생일에 발생했던 이슈</div>
          <div className='text'>나와 생일 같은 유명인</div>
          <div className='text'>내 생일이 기일인 유명인</div>
          <div className='text'>내 생일의 1위 영화 </div>
          <div className='text'>내 생일의 1위 음악</div>
        </TextContainer>
        <VideoContainer>
          <video className='video' muted loop autoPlay={true}>
            <source src='../background.mp4' type='video/mp4'></source>
          </video>
        </VideoContainer>
      </DescContainer>
    </LaunchPageContainer>
  );
}

const LaunchPageContainer = styled.section`
  font-family: sans-serif;
  background: #f1f0f6;
  height: 100vh;
  background-size: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  text-align: center;
`;

const MainDescContainer = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.1rem;
  line-height: 3.5rem;
  color: #2b2e4a;

  @media (max-width: 970px) {
    flex-direction: column;
    line-height: 3rem;
  }
`;

const DescContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.3rem;
  line-height: 3rem;
  padding: 5px;
  font-weight: 400;
  color: #09015f;
  margin-right: 20px;

  @media (max-width: 970px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    line-height: 2rem;
  }

  & .text {
    margin: 0 5px;

    & .color {
      color: #325288;
      font-weight: 700;
    }
  }
`;

const VideoContainer = styled.div`
  background: #060b26;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  width: 700px;
  position: relative;
  z-index: 1;
  @media (max-width: 970px) {
    width: 100%;
  }

  & .video {
    width: 100%;
    height: 100%;
  }
`;
