import React from 'react';
import styled from 'styled-components';
import './CoverFlow.css';

// const Container = styled.div`
//   width: 100%;
//   height: 35vw;
//   position: relative;
//   perspective: 1000px;
//   transform-style: preserve-3d;

//   * {
//     margin: 0;
//     padding: 0;
//   }

//   & input[type='radio'] {
//     display: none;
//   }

//   label {
//     margin: auto;
//     width: 50%;
//     height: 100%;
//     border-radius: 10px;
//     position: absolute;
//     left: 0;
//     right: 0;
//     cursor: pointer;
//     transition: transform 0.4s ease;
//   }

//   // 첫번쨰
//   & #s1:checked ~ #slide4,
//   #s2:checked ~ #slide5,
//   #s3:checked ~ #slide1,
//   #s4:checked ~ #slide2,
//   #s5:checked ~ #slide3 {
//     box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
//     transform: translate3d(-30%, 0, -200px);
//   }
//   //두번째
//   & #s1:checked ~ #slide5,
//   #s2:checked ~ #slide1,
//   #s3:checked ~ #slide2,
//   #s4:checked ~ #slide3,
//   #s5:checked ~ #slide4 {
//     box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2);
//     transform: translate3d(-15%, 0, -100px);
//   }
//   //세번째
//   & #s1:checked ~ #slide1,
//   #s2:checked ~ #slide2,
//   #s3:checked ~ #slide2,
//   #s4:checked ~ #slide4,
//   #s5:checked ~ #slide5 {
//     box-shadow: 0 13px 25px 0 rgba(0, 0, 0, 0.3), 0 11px 7px 0 rgba(0, 0, 0, 0.19);
//     transform: translate3d(0, 0, 0);
//   }
//   //네번째
//   & #s1:checked ~ #slide2,
//   #s2:checked ~ #slide3,
//   #s3:checked ~ #slide3,
//   #s4:checked ~ #slide5,
//   #s5:checked ~ #slide1 {
//     box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2);
//     transform: translate3d(-15%, 0, -100px);
//   }

//   & #s1:checked ~ #slide3,
//   #s2:checked ~ #slide4,
//   #s3:checked ~ #slide5,
//   #s4:checked ~ #slide1,
//   #s5:checked ~ #slide2 {
//     box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
//     transform: translate3d(30%, 0, -200px);
//   }
// `;

function CoverFlow(props: any) {
  const data = props;
  const issue = data.issue;
  const death = data.death;
  const birth = data.birth;
  const music = data.music;
  const movie = data.culture;

  return (
    <section className='container' id='slider'>
      <input type='radio' name='slider' id='s1' />
      <input type='radio' name='slider' id='s2' />
      <input type='radio' name='slider' id='s3' checked />
      <input type='radio' name='slider' id='s4' />
      <input type='radio' name='slider' id='s5' />

      <label htmlFor='s1' id='slide1'>
        <img src={`${issue.image}`} alt={`${issue.category}`} height='100%' width='100%' />
      </label>
      <label htmlFor='s2' id='slide2'>
        <img src={`${movie.image}`} alt={`${movie.category}`} height='100%' width='100%' />
      </label>
      <label htmlFor='s3' id='slide3'>
        <img src={`${music.image}`} alt={`${music.category}`} height='100%' width='100%' />
      </label>
      <label htmlFor='s4' id='slide4'>
        <img src={`${birth.image}`} alt={`${birth.category}`} height='100%' width='100%' />
      </label>
      <label htmlFor='s5' id='slide5'>
        <img src={`${death.image}`} alt={`${death.category}`} height='100%' width='100%' />
      </label>
    </section>
  );
}

export default CoverFlow;
