export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export interface RegisterReq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface RegisterRes {
  token: string;
}
