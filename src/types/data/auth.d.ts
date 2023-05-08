type UserInfo = {
  id: number;
  name: string;
  avatar: string;
};

type UserRole = {
  id: number
  name: string,
  menus: OriginRoute[]
}

/** 登录参数 */
type LoginParams = {
  // captchaId: string;
  password: string;
  username: string;
  // verifyCode: string;
};

/** 登录成功结果 */
type LoginResult = {
  token: string;
};

/** 获取验证码参数 */
type CaptchaParams = {
  width?: number;
  height?: number;
};

/** 获取验证码结果 */
type CaptchaResult = {
  img: string;
  id: string;
};
