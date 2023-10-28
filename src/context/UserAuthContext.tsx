/* eslint-disable*/

import { ReactNode, createContext, useState } from 'react';

export type UserAuth = {
  rol: string | null;
  token: string | null;
};

type IUserAuthContext = {
  user: UserAuth | null;
  setUser: (currentUser: UserAuth | null) => void;
};

export const UserAuthContext = createContext<IUserAuthContext>({} as IUserAuthContext  );

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAuth | null>(null);

  return (
    <UserAuthContext.Provider value={{ user, setUser }}>
      {children}
    </UserAuthContext.Provider>
  );
}
