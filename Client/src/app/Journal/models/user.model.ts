export class User {
  id: string;
  username: string;
  token: string;
}

export interface UserLoginForm {
  username: string;
  password: string;
}

export interface UserRegisterForm {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface UserLoginResponse {
  user: {
    id: string;
    username: string;
    posts: number[];
  };
  expires_in: string;
  token: string;
}
