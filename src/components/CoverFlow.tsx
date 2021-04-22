import { url } from 'node:inspector';
import React from 'react';
import styled from 'styled-components';
import './CoverFlow.css';

function CoverFlow(props: any) {
  const data = props;
  const issue = data.issue;
  const death = data.death;
  const birth = data.birth;
  const music = data.music;
  const movie = data.culture;

  const Container = styled.div`
    display: flex;
    align-items: center;
    min-width: 100vw;
  `;

  return (
    <Container>
      <div className='slider'>
        <input type='radio' name='testimonial' id='t-1' />
        <input type='radio' name='testimonial' id='t-2' />
        <input type='radio' name='testimonial' id='t-3' />
        <input type='radio' name='testimonial' id='t-4' />
        <input type='radio' name='testimonial' id='t-5' />

        <div className='testimonials'>
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
