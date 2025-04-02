// /src/utils/GlobalProvider.js
import React, { useState } from 'react';
import { GlobalContext } from './GlobalContext';

export const GlobalProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState({
    name: '',
    age: '',
    gender: '',
    currentField: '',
    fieldOfInterest: '',
    careerInterest: '',
    mbti: '',
    currentRole: '',
    appliedRole: '',
    email: '',
    phoneNumber: '',
    website: '',
    introduction: '',
    education: [],
    skills: [],
    workExperience: [],
    projects: [],
  });

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
