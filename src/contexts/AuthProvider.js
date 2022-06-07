import React from 'react';
import { Authenticator } from '../auth';
import useLocalStorage from '../hooks/useLocalStorage';

let AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [email, setEmail] = useLocalStorage('email', null)

  let login = (newUser, callback) => {
    return Authenticator.login(() => {
      setEmail(newUser);
      callback();
    });
  };

  let logout = (callback) => {
    return Authenticator.logout(() => {
      setEmail(null);
      callback();
    });
  };

  let value = { email, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
