export interface IsLogin {
  isLogin: boolean;
}
export interface UserInfo {
  userEmail: string;
  password: string;
  userNickName: string;
  profileImage?: string;
  source: string;
  accessToken?: string;
  likeCard?: Array<string>;
  recordCard?: Array<string>;
}

export type BirthwikiType = UserInfo | IsLogin;
