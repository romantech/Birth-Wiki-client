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
  likeCards?: Array<string>;
  recordCards?: Array<string>;
}

export interface LikeCardsGeneral {
  id: number;
  date: string;
  category: string;
  contents?: string[];
  image: string;
  korea?: {
    title: string;
    poster: string;
    singer?: string;
  };
  world?: {
    title: string;
    poster: string;
    singer?: string;
  };
}

export interface UserProfileCard {
  nickName: string;
  likeCards: Array<string>;
  profileImage: string;
}

export type BirthwikiType = UserInfo | IsLogin;
