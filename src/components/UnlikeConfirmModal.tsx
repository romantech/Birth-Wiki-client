import axios from 'axios';
import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { RootState } from '../store/index';
import { setUserInfo } from '../actions/index';
import { LikeCardsGeneral } from '../types/index';

interface UnlikeConfirmModal {
  unLikeModal: boolean;
  filteredArray: LikeCardsGeneral[];
  setFilteredArray: React.Dispatch<React.SetStateAction<LikeCardsGeneral[]>>;
  setUnlikeModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  category: string;
}

const UnlikeConfirmModal = ({ ...props }: UnlikeConfirmModal): JSX.Element => {
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const isGuest = useSelector((state: RootState) => state.guestReducer.isGuest);
  const modalRef = useRef<HTMLDivElement>(null);
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const dispatch = useDispatch();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: props.unLikeModal ? 1 : 0,
    transform: props.unLikeModal ? `translateX(0%)` : `translateX(100%)`,
  });

  const setUnlike = () => {
    props.setUnlikeModal((prev) => !prev);

    const setLiked = props.filteredArray.map((el) => {
      if (el.id === props.id) {
        el.like = false;
        return el;
      }
      return el;
    });
    props.setFilteredArray(setLiked);

    let newCards = userInfo.likeCards.filter((el: { id: number; category: string }) => {
      if (el.id !== props.id || el.category !== props.category) {
        return el;
      }
    });
    let newUserInfo: any = Object.assign({}, userInfo, {
      likeCards: newCards,
    });

    if (isGuest) {
      dispatch(setUserInfo(newUserInfo));
    }

    if (isLogin) {
      axios({
        url: 'https://server.birthwiki.space/like',
        method: 'post',
        data: {
          action: 'cancel',
          nickName: userInfo.nickName,
          cardId: props.id,
          category: props.category,
          accessToken: `Bearer ${userInfo.accessToken}`,
        },
      }).then(() => {
        dispatch(setUserInfo(newUserInfo));
      });
    }
  };

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      props.setUnlikeModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && props.unLikeModal) {
        props.setUnlikeModal(false);
      }
    },
    [props.setUnlikeModal, props.unLikeModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {props.unLikeModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalWrapper>
              <ModalContent>
                <p>
                  좋아요를 취소하시겠습니까?
                  <br />
                  취소 후엔 즐겨찾기에서 볼 수 없어요 🥺
                </p>
                <ButtonWrapper>
                  <button onClick={setUnlike} style={{ marginRight: '10px' }}>
                    확인
                  </button>
                  <button onClick={() => props.setUnlikeModal((prev) => !prev)}>취소</button>
                </ButtonWrapper>
              </ModalContent>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.342);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const ModalWrapper = styled.div`
  width: 350px;
  height: 180px;
  background: #fff;
  color: #000;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  z-index: 3;
  position: relative;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #141414;
  padding: 35px;
  overflow: auto;

  p {
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;

  button {
    width: 60px;
    height: 35px;
    border-radius: 10px;
    outline: none;
    border: 0.5px solid #9e9e9e;
    cursor: pointer;
    background: #e7e7e7;

    &:hover {
      background: #e2dbdb;
    }
  }
`;

export default UnlikeConfirmModal;
