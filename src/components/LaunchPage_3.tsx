import React from 'react';
import styled from 'styled-components';

export default function LaunchPage_3() {
  return (
    <LaunchPageContainer>
      <MainDescContainer>
        <Title data-aos='fade-up' data-aos-duration='1000'>
          마음에 드는 카드를 수집해보세요
          <br />
        </Title>
        <TextContainer data-aos='fade-up' data-aos-duration='1000'>
          <div className='text'>
            수집한 카드는 <span className='color'>마이페이지</span>에서 확인하세요. <br />
          </div>
        </TextContainer>
        <VideoContainer>
          {/* <video className='video' muted loop autoPlay={true}>
            <source src='../section_3.mp4' type='video/mp4'></source>
          </video> */}
          <img className='img' src={`${process.env.PUBLIC_URL}/section_3.gif`} />
        </VideoContainer>
      </MainDescContainer>
    </LaunchPageContainer>
  );
}

const LaunchPageContainer = styled.section`
  font-family: sans-serif;
  background: #f4f9f9;
  height: 100vh;
  width: 100vw;
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
