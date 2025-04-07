// /src/utils/GlobalProvider.js
import React, { useState } from 'react';
import { GlobalContext } from './GlobalContext';

export const GlobalProvider = ({ children }) => {
  // User state
  const savedUser = localStorage.getItem('savedUser');

  const [user, setUser] = useState(
    JSON.parse(savedUser) || {
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
      experiences: [],
      projects: [],
    }
  );

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
