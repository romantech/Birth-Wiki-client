import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import FavoriteModal from '../components/FavoriteModal';
import { LikeCardsGeneral } from '../types/index';
import UnlikeConfirmModal from '../components/UnlikeConfirmModal';
import FavoriteShareModalMini from './FavoriteShareModalMini';
import FavoriteShareModalMain from './FavoriteShareModalMain';

const SidebarMystory = ({ ...props }: LikeCardsGeneral): JSX.Element => {
  const contents = props.contents !== null ? props.contents : [];
  const category = props.category;

  const [shareModalMain, setShareModalMain] = useState(false);
  const [shareModalMini, setShareModalMini] = useState(false);
  const [unLikeModal, setUnlikeModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [xyPosition, setXYPosition] = useState({
    pageX: 0,
    pageY: 0,
  });
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <ModalView onClick={openModal}>
        {props.category}
        {props.date}
      </ModalView>
      <FavoriteShareModalMini
        shareModalMini={shareModalMini}
        setShareModalMini={setShareModalMini}
        xyPosition={xyPosition}
      />
      <FavoriteModal
        id={props.id}
        like={props.like}
        image={props.image}
        showModal={showModal}
        setShowModal={setShowModal}
        contents={contents as string[]}
        category={category}
        date={props.date}
        korea={props.korea}
        world={props.world}
        setUnlikeModal={setUnlikeModal}
        setShareModalMain={setShareModalMain}
      />
      <UnlikeConfirmModal
        id={props.id}
        category={props.category}
        unLikeModal={unLikeModal}
        setUnlikeModal={setUnlikeModal}
      />
      <FavoriteShareModalMain shareModalMain={shareModalMain} setShareModalMain={setShareModalMain} />
    </>
  );
};

const ModalView = styled.button`
  min-width: 100px;
  min-height: 25px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  margin-bottom: 10px;
  background: #ffffffe3;
  &:hover {
    background: white;
  }
`;

export default SidebarMystory;
