import React from 'react';

export const emptyUser = {
  loginToken: undefined,
};

const UserContext = React.createContext({
  user: emptyUser,
  setUser: () => { },
});

export default UserContext;
