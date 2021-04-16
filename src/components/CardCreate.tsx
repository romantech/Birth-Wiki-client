import React, { useState } from 'react';
import styled from 'styled-components';
import Dropzone, { IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader';

const CreateCard = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 300px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
    url('https://images.unsplash.com/photo-1527345931282-806d3b11967f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  & .box.create {
    color: #fff;
    background: none;
  }
  & .create {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
  }

  & .create .drop-zone {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justfiy-content: center;
    text-align: center;
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    color: #ccc;
    border: 3px dashed #f2f2f2;
    border-radius: 10px;
  }

  & .create .drop-zone img {
    width: 100%;
    height: 100%;
  }

  & .create .card-desc {
    width: 100%;
    height: 70px;
    border: none;
    border-radius: 10px;
    padding: 13px;
    margin-bottom: 20px;
  }
`;

const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: ILayoutProps) => {
  return (
    <div>
      {previews}

      <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

      {files.length > 0 && submitButton}
    </div>
  );
};

function CardCreate() {
  return (
    <CreateCard>
      <div className='box create'>
        <h2>나의 기록카드 만들기</h2>
        <form action='https://server.bitrhwiki.com/record/create' method='post'>
          <div className='crtCard'>
            {/* <div className='drop-zone'>
              <Dropzone LayoutComponent={Layout} styles={{ dropzone: { minHeight: 100, maxHeight: 150 } }} />
            </div> */}
            <span className='crtLeft'>이미지</span>
            <input type='file' name='imgFile' />
          </div>
          <div className='crtCard'>
            <span className='crtLeft'> 카드 내용</span>
            <input className='card-desc' placeholder='내용을 입력하세요' name='cardDesc' />
          </div>
          <div>
            <input type='submit' value='카드 생성' className='createbtn' />
          </div>
        </form>
      </div>
    </CreateCard>
  );
}

export default CardCreate;
