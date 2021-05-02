import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function LaunchPage_2() {
  return (
    <LaunchPageContainer>
      <MainDescContainer>
        <Title data-aos='fade-up' data-aos-duration='1000'>
          생일을 입력해보세요
        </Title>
        <br />
        <TextContainer data-aos='fade-up' data-aos-duration='1000'>
          <div className='text'>
            자신의 생일에 대한 <span className='color'>흥미</span>롭고 <span className='color'>재미</span>
            있는 사실을 발견하세요.
          </div>
          {/* <div className='text'>내 생일의 날씨정보 / </div>
          <div className='text'>내 생일에 발생했던 이슈 / </div>
          <div className='text'>나와 생일 같은 유명인 / </div>
          <br />
          <div className='text'>내 생일이 기일인 유명인 / </div>
          <div className='text'>내 생일의 1위 영화 / </div>
          <div className='text'>내 생일의 1위 음악</div> */}
        </TextContainer>
        <VideoContainer>
          <img className='img' src={`${process.env.PUBLIC_URL}/section_2.gif`} />
        </VideoContainer>
      </MainDescContainer>
    </LaunchPageContainer>
  );
}

const LaunchPageContainer = styled.section`
  font-family: sans-serif;
  background: #f5f7b2;
  background: #f4eeed;
  height: 100vh;
  width: 100vw;
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
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 3em;
  font-weight: 800;
  letter-spacing: 0.1rem;
  line-height: 4.5rem;
  color: #000;
  text-align: start;
  margin: 0 30px;
  transform: translateY(0);
  opacity: 1;
  transition: all 1s 0.2s;

  @media (max-width: 699px) {
    flex-direction: column;
    line-height: 4rem;
  }
  @media (max-width: 499px) {
    font-size: 2rem;
    line-height: 3rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 1.3rem;
  line-height: 3rem;
  padding: 5px;
  font-weight: 400;
  color: #2b2e4a;
  margin: 0 30px 20px;

  @media (max-width: 970px) {
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
  width: 60%;
  position: relative;
  z-index: 1;

  & .img {
    width: 100%;
    height: 100%;
  }
`;
