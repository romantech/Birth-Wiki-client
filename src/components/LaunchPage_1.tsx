import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { CgMouse } from 'react-icons/cg';

import 'dotenv/config';

export default function LaunchPage_1({ setIsLoading }: any) {
  const [date, setDate] = useState({ year: '0', month: '0', day: '0' });
  const [warning, setWarning] = useState(false);

  let curNow = new Date();
  let curDay = curNow.getDate();
  let curMonth = curNow.getMonth() + 1;
  let curYear = curNow.getFullYear();

  const pressHandler = (e: any, here: string, next: string) => {
    setWarning(false);
    let numValue = Number(e.target.value) === 0 ? '' : Number(e.target.value);

    if (here === 'year') {
      e.target.value = numValue > curYear ? String(curYear) : String(numValue);
      setDate({ ...date, year: e.target.value });
      if (e.target.value.length === 4) {
        document.getElementById(next)!.focus();
      }
    }

    if (here === 'month') {
      if (date.year === String(curYear)) {
        e.target.value = numValue > curMonth ? String(curMonth) : String(numValue);
      } else {
        e.target.value = numValue > 12 ? '12' : String(numValue);
      }
      setDate({ ...date, month: e.target.value });

      if (Number(e.target.value) > 1) {
        document.getElementById(next)!.focus();
      }
    }

    if (here === 'day') {
      let lastDate: number = new Date(Number(date.year), Number(date.month), 0).getDate();

      if (date.year === String(curYear) && date.month === String(curMonth)) {
        e.target.value = numValue >= curDay ? String(curDay - 1) : String(numValue);
      } else {
        e.target.value = numValue > lastDate ? String(lastDate) : String(numValue);
      }
      setDate({ ...date, day: e.target.value });
    }
  };

  const blurHandler = (e: any, here: string, next: string) => {
    let numValue = Number(e.target.value);

    if (here === 'year') {
      e.target.value = numValue > curYear ? String(curYear) : String(numValue);
      setDate({ ...date, year: e.target.value });
    }

    if (here === 'month') {
      if (date.year === String(curYear)) {
        e.target.value = numValue > curMonth ? String(curMonth) : String(numValue);
      } else {
        e.target.value = numValue > 12 ? '12' : String(numValue);
      }
      setDate({ ...date, month: e.target.value });
    }

    if (here === 'day') {
      let lastDate: number = new Date(Number(date.year), Number(date.month), 0).getDate();

      if (date.year === String(curYear) && date.month === String(curMonth)) {
        e.target.value = numValue >= curDay ? String(curDay - 1) : String(numValue);
      } else {
        e.target.value = numValue > lastDate ? String(lastDate) : String(numValue);
      }
      setDate({ ...date, day: e.target.value });
    }
  };

  const enterHandler = (e: any, here: string, next: string) => {
    if (e.key === 'Enter') {
      if (here !== 'day') {
        document.getElementById(next)!.focus();
      } else {
        birthwikiHandler();
      }
    }
  };

  const birthwikiHandler = () => {
    let selectDate = date.year + '-' + date.month + '-' + date.day;
    if (date.year !== '0' && date.month !== '0' && date.day !== '0') {
      setIsLoading(true);
      //setTimeout(() => {}, 1000);
      window.location.replace(`${process.env.REACT_APP_CLIENT_URL}/main/${selectDate}`);
    } else {
      setWarning(true);
    }
  };

  return (
    <>
      <LaunchScreen>
        {/* <BGVideoContiner>
          <video className='video' muted loop autoPlay={true}>
            <source src='../background1.mp4' type='video/mp4'></source>
          </video>
        </BGVideoContiner> */}
        {/* <WordsContainner>
          <Words>What happened</Words>
          <Words>on Your BirthDay!</Words>
          <Words1>생일을 입력해보세요</Words1>
        </WordsContainner> */}
        <img className='img' src={`${process.env.PUBLIC_URL}/section1.png`} />
        <MainDescContainer>
          <h1>Welcome!</h1>
          <Title>
            내 생일에 어떤 일이 있었는지 <br />
            궁금하지 않으신가요?
          </Title>
          <SubTitle>생일을 입력해보세요</SubTitle>
        </MainDescContainer>
        <InputContiner>
          <InputSubmit>
            <InputDate
              type='number'
              id='year'
              min='1'
              max={curYear}
              placeholder='1990'
              onKeyUp={(e) => {
                pressHandler(e, 'year', 'month');
              }}
              onBlur={(e) => {
                blurHandler(e, 'year', 'month');
              }}
              onKeyPress={(e) => {
                enterHandler(e, 'year', 'month');
              }}
              onFocus={(e) => {
                e.target.value = '';
              }}
            ></InputDate>{' '}
            <span>년</span>
            <InputDate
              type='number'
              id='month'
              max='12'
              min='1'
              placeholder='1'
              onKeyUp={(e) => {
                pressHandler(e, 'month', 'day');
              }}
              onBlur={(e) => {
                blurHandler(e, 'month', 'day');
              }}
              onKeyPress={(e) => {
                enterHandler(e, 'month', 'day');
              }}
              onFocus={(e) => {
                e.target.value = '';
              }}
            ></InputDate>{' '}
            <span>월</span>
            <InputDate
              type='number'
              id='day'
              min='1'
              max='31'
              placeholder='1'
              onKeyUp={(e) => {
                pressHandler(e, 'day', '');
              }}
              onBlur={(e) => {
                blurHandler(e, 'day', '');
              }}
              onKeyPress={(e) => {
                enterHandler(e, 'day', '');
              }}
              onFocus={(e) => {
                e.target.value = '';
              }}
            ></InputDate>{' '}
            <span>일</span>
          </InputSubmit>
          {warning ? (
            <WarningMsg className='warning'>날짜를 다시 입력해 주세요</WarningMsg>
          ) : (
            <WarningMsg className='warning'>&nbsp;</WarningMsg>
          )}
          <BirthwikiBtn onClick={birthwikiHandler}>Birth Wiki!</BirthwikiBtn>
        </InputContiner>
        <Nextbtn></Nextbtn>
      </LaunchScreen>
    </>
  );
}

// const BGVideoContiner = styled.div`
//   display: flex;
//   padding: 0;
//   height: 100%;
//   width: 100%;
//   position: relative;
//   z-index: 1;

//   & img {
//     position: relative;
//     width: 100%;
//     top: 10%;
//     -o-object-fit: cover;
//     object-fit: cover;
//   }

//   & .videoContiner {
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     overflow: hidden;
//   }

//   & .video {
//     width: 100%;
//     height: 100%;
//     -o-object-fit: cover;
//     object-fit: cover;
//   }
// `;

// const Words = styled.span`
//   color: #eee;
//   opacity: 0.5;
//   text-transform: uppercase;
//   display: block;
//   font-size: 40px;
//   font-weight: 700;
//   letter-spacing: 3px;
//   margin-bottom: 30px;
//   position: relative;
//   animation: text 3s 1;

//   @keyframes text {
//     0% {
//       color: black;
//       margin-bottom: -10px;
//     }
//     30% {
//       letter-spacing: 25px;
//       margin-bottom: -10px;
//     }
//     85% {
//       letter-spacing: 8px;
//       margin-bottom: -15px;
//     }
//   }
//   @media (max-width: 425px) {
//     font-size: 30px;
//     letter-spacing: 1px;
//     margin-bottom: 20px;
//   } ;
// `;
// const Words1 = styled.span`
//   color: #eee;
//   opacity: 0.5;
//   text-transform: uppercase;
//   display: block;
//   font-size: 20px;
//   font-weight: 700;
//   letter-spacing: 3px;
//   margin-bottom: 30px;
//   position: relative;
//   animation: text 3s 1;

//   @keyframes text {
//     0% {
//       color: black;
//       margin-bottom: -10px;
//     }
//     30% {
//       letter-spacing: 25px;
//       margin-bottom: -10px;
//     }
//     85% {
//       letter-spacing: 8px;
//       margin-bottom: -15px;
//     }
//   }
//   @media (max-width: 425px) {
//     font-size: 20px;
//     letter-spacing: 1px;
//     margin-bottom: 20px;
//   } ;
// `;
// const WordsContainner = styled.div`
//   text-align: center;
//   position: absolute;
//   top: 40%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 100%;
//   z-index: 2;
// `;

const LaunchScreen = styled.section`
  font-family: sans-serif;
  background: rgba(246, 246, 240, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100vh;
  background-repeat: repeat-x;
  background-size: 100%;

  & .warning {
    margin: 10px;
  }
  & .img {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
`;

const MainDescContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 30px;
`;

const Title = styled.div`
  font-size: 3em;
  font-weight: 800;
  letter-spacing: 0.1rem;
  line-height: 4.5rem;
  color: #2b2e4a;
  margin-bottom: 20px;

  @media (max-width: 699px) {
    flex-direction: column;
    line-height: 4rem;
  }
  @media (max-width: 499px) {
    font-size: 2rem;
    line-height: 3rem;
  }
`;

const SubTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  line-height: 3rem;
  color: #2b2e4a;

  @media (max-width: 699px) {
    flex-direction: column;
    line-height: 3rem;
  }
  @media (max-width: 499px) {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

const InputContiner = styled.div`
  position: absolute;
  left: 30px;
  top: 65%;

  display: flex;
  /* 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  z-index: 2;
  bottom: 20%;
  background: rgb(255, 255, 255, 0.3);

  height: 200px; */
  /* transform: translate(-50%, -50%); */
  @media screen and (max-width: 699px) {
    top: 70%;
  }
  @media screen and (max-width: 499px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InputSubmit = styled.form`
  display: inline-block;
  justify-content: space-between;
  padding: 5px;
  @media screen and (max-width: 499px) {
    flex-direction: column;
  }
`;

const InputDate = styled.input`
  box-sizing: border-box;
  color: #060b26;
  outline: 0;
  padding: 0 10px 0;
  border: none;
  border-bottom: 2px solid #060b26;
  background-color: rgba(255, 255, 255, 0);
  margin: 5px;
  height: 30px;
  font-size: 1.7rem;
  text-align: center;
  ::-webkit-inner-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media screen and (max-width: 499px) {
    font-size: 1.5rem;
    height: 25px;
    padding: 0;
  }
`;

const BirthwikiBtn = styled.button`
  background: black;
  border-radius: 50px;
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  width: 120px;
  margin-left: 10px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgb(246, 246, 240);
    box-shadow: 0 4px 15px 0 rgb(0 0 0 / 30%);
    color: #010606;
  }
  @media screen and (max-width: 499px) {
    margin: 10px;
  }
`;

const Nextbtn = styled(CgMouse)`
  position: absolute;
  width: 3vw;
  height: 3vh;
  left: 48.5vw;
  animation: down_ani 1.5s ease-in-out infinite;

  @keyframes down_ani {
    0% {
      top: 93vh;
    }
    50% {
      top: 90vh;
    }
    100% {
      top: 93vh;
    }
  }
`;

const WarningMsg = styled.div`
  position: absolute;
  left: 20px;
  top: 82%;
  font-size: 1rem;
  font-weight: 500;

  @media (max-width: 499px) {
    top: 100%;
  }
`;
