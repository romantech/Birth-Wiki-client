import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { FiHeart, FiShare, FiZoomIn } from 'react-icons/fi';
import FavoriteModal from '../components/FavoriteModal';
import FavoriteShareModalMini from './FavoriteShareModalMini';
import FavoriteShareModalMain from './FavoriteShareModalMain';
import UnlikeConfirmModal from '../components/UnlikeConfirmModal';
import { LikeCardsGeneral, MovieInfo } from '../types/index';
import getVerticalImg from '../utils/resizeImage';
import TMDB_API from '../utils/TMDB_API';

interface SetFilteredArray extends LikeCardsGeneral {
  setFilteredArray: React.Dispatch<React.SetStateAction<LikeCardsGeneral[]>>;
  filteredArray: LikeCardsGeneral[];
}

const SidebarMystory = ({ ...props }: SetFilteredArray): JSX.Element => {
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
  const [movieInfoKorean, setMovieInfoKorean] = useState<MovieInfo>();
  const [movieInfoWorld, setMovieInfoWorld] = useState<MovieInfo>();

  const getMovieRate = (movieTitle: string, region: string) => {
    TMDB_API.get('/movie', {
      params: {
        query: movieTitle,
      },
    }).then((res) => {
      if (region === 'korea') {
        setMovieInfoKorean(res.data.results[0]);
      }
      if (region === 'world') {
        setMovieInfoWorld(res.data.results[0]);
      }
    });
  };

  if (!movieInfoKorean && !movieInfoWorld) {
    if (props.category === 'movie') {
      if (props.korea) {
        getMovieRate(props.korea.title, 'korea');
      }
      if (props.world) {
        getMovieRate(props.world.title, 'world');
      }
    }
  }

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  if (props.category === 'movie') {
    props.image = props.world?.poster ? props.world?.poster : props.image;
  }
  if (props.category === 'music') {
    props.image = props.korea?.poster ? props.korea?.poster : getVerticalImg(props.image, props.category, 0);
  }
  if (props.contents) {
    const contentsLength = props.contents.length;
    props.image = getVerticalImg(props.image, props.category, contentsLength);
  }

  return (
    <MyStory>
      <li className='list'>
        <ModalView onClick={openModal}>
          <span className='category'>{props.category}</span>
          <span className='date'>{props.date}</span>
        </ModalView>
      </li>
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
        movieInfoKorean={movieInfoKorean}
        movieInfoWorld={movieInfoWorld}
        setUnlikeModal={setUnlikeModal}
        setShareModalMain={setShareModalMain}
      />
      <UnlikeConfirmModal
        id={props.id}
        category={props.category}
        unLikeModal={unLikeModal}
        filteredArray={props.filteredArray}
        setFilteredArray={props.setFilteredArray}
        setUnlikeModal={setUnlikeModal}
      />
      <FavoriteShareModalMain shareModalMain={shareModalMain} setShareModalMain={setShareModalMain} />
    </MyStory>
  );
};

const MyStory = styled.div`
  & .list {
    list-style: none;
    display: grid;
  }
  & .category {
    margin: 0 10px;
  }
`;

const ModalView = styled.button`
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  margin: 10px;
  background: #ffffffe3;
  display: grid;
  grid-template-columns: 1fr 1fr;

  &:hover {
    background: white;
  }
`;

export default SidebarMystory;
