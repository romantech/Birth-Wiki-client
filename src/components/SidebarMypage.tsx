import React from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { BsPeopleCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, setUserInfo } from '../actions/index';
import { RootState } from '../store/index';

function SidebarMypage() {
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  console.log('userInfo', userInfo);
  return (
    <MypageContainer>
      Mypage
      <MyProfileContainer>
        <MyProfile>
          <UserPoto to='#'>
            <BsPeopleCircle />
          </UserPoto>
          <UserInfoContainer>
            <InfoCatecory>이메일</InfoCatecory>
            <UserInfo>{userInfo.userEmail}</UserInfo>
            <InfoCatecory>닉네임</InfoCatecory>
            <UserInfo>{userInfo.userNickName}</UserInfo>
            <h3> 정보 수정</h3>
            <h3> 로그아웃 </h3>
          </UserInfoContainer>
        </MyProfile>
      </MyProfileContainer>
      <MyStoryContainer>
        <MyStoryList>나만의 기록리스트</MyStoryList>
        <MyBookMarkList>나의 찜 리스트</MyBookMarkList>
      </MyStoryContainer>
    </MypageContainer>
  );
}

export default SidebarMypage;

const MypageContainer = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  background: #060b26;
  height: 100vh;
  width: 300px;
  margin: 15px;
  padding: 10px;
  top: 60px;
  overflow: scroll;
  position: fixed;
`;

const MyProfileContainer = styled.div`
  font-size: 20px;
  background: #060b26;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
  color: #fff;
`;

const MyProfile = styled.div`
  font-size: 20px;
  padding: 5px;
`;

const MyStoryContainer = styled.div`
  font-size: 20px;
  background: #060b26;
  border: #fff 1px solid;
  border-radius: 20px;
  height: 30%;
  margin: 5px 0;
  padding: 10px;
  color: #fff;
`;

const MyStoryList = styled.div`
  font-size: 20px;
  background: #060b26;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
  color: #fff;
`;

const MyBookMarkList = styled.div`
  background: #060b26;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
  color: #fff;
`;

const UserPoto = styled(Link)`
  font-size: 255px;
  color: #fff;
  margin: 10px 0;
  padding: 5px;
`;

const UserInfoContainer = styled.div`
  border: #fff 1px solid;
  border-radius: 20px;
  font-size: 15px;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
`;

const InfoCatecory = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin: 0 10px 10px 10px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  width: 100%;
  overflow: auto;
`;
