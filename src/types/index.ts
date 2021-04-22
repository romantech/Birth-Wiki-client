export interface IsLogin {
  isLogin: boolean;
}
export interface UserInfo {
  userEmail?: null | string | number;
  password?: null | string;
  nickName?: null | string;
  profileImage?: null | string;
  source?: null | string;
  accessToken?: null | string;
  likeCards?: null | Array<string>;
  recordCards?: null | Array<string>;
}

export interface LikeCardsGeneral {
  id: number;
  like: boolean;
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
