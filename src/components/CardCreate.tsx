import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setGuestModal, setGuestReject, setUserInfo, setSaveModal } from '../actions';
import axios from 'axios';

function CardCreate({ setChecked }: any) {
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const isGuest = useSelector((state: RootState) => state.guestReducer.isGuest);
  const dispatch = useDispatch();
  const selectedDate = new URL(window.location.href).pathname.split('/')[2];
  const isSave = useSelector((state: RootState) => state.saveReducer.isSave);

  useEffect(() => {}, [isSave]);

  const guestCreate = () => {
    if (isGuest) {
      dispatch(setGuestReject(true));
    } else {
      dispatch(setGuestModal(true));
    }
  };

  const changeInfo = () => {
    axios({
      url: 'https://server.birthwiki.space/record/look',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        nickName: userInfo.nickName,
        accessToken: `Bearer ${userInfo.accessToken}`,
      },
    }).then((res) => {
      let newInfo = Object.assign({}, userInfo, { recordCards: res.data.data.recordCards });
      dispatch(setUserInfo(newInfo));
      dispatch(setSaveModal(true));
      setChecked([false, false, false, false, false, true]);
    });
  };

  return (
    <CreateCard>
      <div className='create'>
        <h2>나만의 기록</h2>
        <iframe name='frAttachFiles' className='invisable' onLoad={changeInfo}></iframe>
        <form
          target='frAttachFiles'
          action='https://server.birthwiki.space/record/create'
          name='record-form'
          method='POST'
          encType='multipart/form-data'
          id='formData'
          noValidate={true}
        >
          <input
            className='access'
            name='accessToken'
            type='text'
            value={`Bearer ${userInfo.accessToken}`}
            style={{ display: 'none' }}
          />
          <input type='text' name='nickName' value={`${userInfo.nickName}`} style={{ display: 'none' }} />
          <input type='text' name='date' value={`${selectedDate}`} style={{ display: 'none' }} />

          <div className='custom-file'>
            <input
              type='file'
              className='custom-file_input'
              id='field-upload'
              name='cardImage'
              style={{ display: 'none' }}
              required
            />
            <label className='custom-file_label' htmlFor='field-upload'>
              사진 업로드
            </label>
          </div>

          <div className='crtCard'>
            <textarea className='card-desc' name='cardDesc' placeholder='내용을 입력하세요' />
          </div>
          <div>
            {isLogin ? (
              <input type='submit' value='카드 생성' className='createBtn' />
            ) : (
              <button className='createBtn' onClick={guestCreate}>
                기록하기
              </button>
            )}
          </div>
        </form>
      </div>
    </CreateCard>
  );
}

const CreateCard = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;

  & h2 {
    color: black;
  }

  & .create {
    color: #fff;
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
  }

  .input-file-button {
    padding: 6px 20px;
    background-color: #f2f2f2;
    border-radius: 4px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
  }

  & .crtCard {
    margin-top: 20px;
  }

  & .create .card-desc {
    width: 270px;
    height: 170px;
    padding: 10px 10px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border: 0;
    border-radius: 15px;
    background-color: #f8f8f8;
    resize: none;

    @media (max-width: 699px) {
      width: 370px;
    }
  }

  & .createBtn {
    margin-top: 10px;
    background: #f2f2f2;
    font-size: 1rem;
    width: 40%;
    border: none;
    padding: 8px 20px;
    border-radius: 4px;
    font-weight: 700;
  }

  & .invisable {
    display: none;
  }

  & .custom-file_input {
    display: none;
    position: absolute;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    z-index: -1;
  }
  & .custom-file_label {
    position: relative;
    display: block;
    width: 100%;
    min-width: 335px;
    min-height: 45px;
    margin: 10px 0;
    padding: 0;
    background: #ffffff;
    border: 1px solid #dfdfdf;
    color: #666666;
    border-radius: 15px;
    line-height: 45px;
    text-align: center;
    text-transform: none;
    cursor: pointer;
    transition: all 0.3s;
  }
  & .custom-file_input:valid ~ .custom-file_label {
    border-color: #39b54a;
    background: #39b54a;
    color: #39b54a;
  }
  & .custom-file_input:valid ~ .custom-file_label:before {
    content: '업로드 되었습니다';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    color: #ffffff;
    line-height: 45px;
  }
`;

export default CardCreate;
