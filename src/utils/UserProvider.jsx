// /src/utils/UserProvider.js
import React, { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    age: '',
    gender: '',
    currentField: '',
    fieldOfInterest: '',
    careerInterest: '',
    mbti: '',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
