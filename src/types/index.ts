export interface IsLogin {
  isLogin: boolean;
}
export interface UserInfo {
  id?: Number;
  userEmail: string;
  password?: string;
  nickName?: string;
  profileImage?: string;
  source: string;
  accessToken?: string;
  likeCard?: Array<string>;
  recordCard?: Array<string>;
}

export interface LikeCards {
  id: number;
  date: string;
  category: string;
  contents: string[];
  image: string;
  mediaCategory: string[];
}

export interface UserProfileCard {
  userNickName: string;
  likeCards: Array<string>;
  profileImage: string;
}

export type BirthwikiType = UserInfo | IsLogin;
