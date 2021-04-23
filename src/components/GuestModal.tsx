import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setGuest, setGuestModal, setUserInfo } from '../actions';
import guestState from '../reducers/guestState';

function GuestModal() {
  const [modalOpen, setModalOpen] = useState(true);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setGuest(true));
    dispatch(setGuestModal(true));
    dispatch(setUserInfo(guestState));
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen ? (
        <Testdiv>
          <div>게스트 상태에서는</div>
          <div>변경 사항이 저장되지 않습니다</div>
          <button onClick={closeModal}>알겠음!</button>
        </Testdiv>
      ) : null}
    </>
  );
}

export default GuestModal;

const Testdiv = styled.div`
  position: fixed;
  width: 30vw;
  margin-top: 50vh;
  margin-left: 40vw;
  z-index: 1;
`;
