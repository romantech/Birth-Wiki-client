import { url } from 'node:inspector';
import React from 'react';
import styled from 'styled-components';
import './CoverFlow.css';

function CoverFlow(props: any) {
  const data = props.data;
  const issue = data.issueCard;
  const death = data.deathCard;
  const birth = data.birthCard;
  const music = data.musicCard;
  const movie = data.movieCard;

  //const cardData = [issue, birth, death, movie, music, { image: recordCover }];
  //const cardTitle = ['이슈', '탄생', '사망', '영화', '음악', '기록카드 작성'];

  const Container = styled.div`
    display: flex;
    align-items: center;
    min-width: 100vw;
  `;

  return (
    <Container>
      <div className='slider'>
        {/* {map((el, idx)=>{
            if(props.selected === idx) {
              return <input type='radio' name='testimonial' id={`t-${idx+1}`} checked/>
            } else {
              return <input type='radio' name='testimonial' id={`t-${idx+1}`} />
            }
        })} */}
        <input type='radio' name='testimonial' id='t-1' />
        <input type='radio' name='testimonial' id='t-2' />
        <input type='radio' name='testimonial' id='t-3' />
        <input type='radio' name='testimonial' id='t-4' />
        <input type='radio' name='testimonial' id='t-5' />

        <div className='testimonials'>
          {/* {map((el, idx)=>{
           return <label className='item' htmlFor={`t-${idx+1}`} style={{ background: `url(${el.image})` }}></label>
          })} */}
          <label className='item' htmlFor='t-1' style={{ background: `url(${issue.image})` }}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit, amet, impedit neque et ipsa
              itaque fuga iste eum voluptate maiores molestias voluptas, mollitia reiciendis a omnis vero
              earum! Expedita?
            </p>
            <h2>- Princy, Web Developer</h2>
          </label>
          <label className='item' htmlFor='t-2' style={{ background: `url(${birth.image})` }}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit, amet, impedit neque et ipsa
              itaque fuga iste eum voluptate maiores molestias voluptas, mollitia reiciendis a omnis vero
              earum! Expedita?
            </p>
            <h2>- Princy, Web Developer</h2>
          </label>
          <label className='item' htmlFor='t-3' style={{ background: `url(${death.image})` }}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit, amet, impedit neque et ipsa
              itaque fuga iste eum voluptate maiores molestias voluptas, mollitia reiciendis a omnis vero
              earum! Expedita?
            </p>
            <h2>- Princy, Web Developer</h2>
          </label>
          <label className='item' htmlFor='t-4' style={{ background: `url(${movie.image})` }}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit, amet, impedit neque et ipsa
              itaque fuga iste eum voluptate maiores molestias voluptas, mollitia reiciendis a omnis vero
              earum! Expedita?
            </p>
            <h2>- Princy, Web Developer</h2>
          </label>
          <label className='item' htmlFor='t-5' style={{ background: `url(${music.image})` }}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit, amet, impedit neque et ipsa
              itaque fuga iste eum voluptate maiores molestias voluptas, mollitia reiciendis a omnis vero
              earum! Expedita?
            </p>
            <h2>- Princy, Web Developer</h2>
          </label>
        </div>

        <div className='dots'>
          <label htmlFor='t-1'></label>
          <label htmlFor='t-2'></label>
          <label htmlFor='t-3'></label>
          <label htmlFor='t-4'></label>
          <label htmlFor='t-5'></label>
        </div>
      </div>
    </Container>
  );
}

export default CoverFlow;
