import { UserInfo } from '../types/index';

interface InitialState {
  isLogin: boolean;
  userInfo: UserInfo;
}

export const initialState: InitialState = {
  isLogin: false,
  userInfo: {
    userEmail: 'test1@naver.com',
    password: '1234qwer',
    userNickName: 'test',
    profileImage: '',
    source: 'home',
    accessToken: '',
    likeCard: ['card1', 'card2', 'card3'],
    recordCard: ['card1', 'card2', 'card3'],
  },
};
// export const initialState = {
//   isLogin: false,
// userInfo: {
//   userEmail: 't1@t.c',
//   password: '1234',
//   userNickName: 'test',
//   profileImage: null,
//   source: 'home',
//   accessToken: null,
// },
// userData: [],
// wikiData: [],
// };

// export type Birthwiki = {
//   isLogin: boolean;
//   userInfo: {
//     userEmail: string;
//     password: string;
//     userNickName: string;
//     profileImage: null;
//     source: string;
//     accessToken: null;
//   };
//   // userData: [],
//   // wikiData: [],
// };
// type BirthwikiState = Birthwiki[];

// export const initialState: BirthwikiState = [
//   {
//     isLogin: false,
//     userInfo: {
//       userEmail: 't1@t.c',
//       password: '1234',
//       userNickName: 'test',
//       profileImage: null,
//       source: 'home',
//       accessToken: null,
//     },
//     // userData: [],
//     // wikiData: [],
//   },
// ];
