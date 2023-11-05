interface User {
  firstName: string;
  lastName: string;
  email: string;
  tourCompleted: boolean | null;
}

export interface LoginReq {
  email: string;
  password: string;
  role: string;
}

export interface LoginRes {
  token: string;
  user: User;
}

export type RegisterReq = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export interface RegisterRes {
  token: string;
  user: User;
}
