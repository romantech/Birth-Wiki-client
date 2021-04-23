import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setIsLogin, setUserInfo, setIsSidbar, setIsEdit, setGuest, setGuestModal } from '../actions/index';
import FavoriteModal from './FavoriteModal';
import { LikeCardsGeneral } from '../types/index';

function SidebarMystory({ card, key }: any) {
  return <div></div>;
}

export default SidebarMystory;
