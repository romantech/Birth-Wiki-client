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

export type BirthwikiType = UserInfo | IsLogin;
