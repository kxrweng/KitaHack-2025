// /src/utils/ResumeProvider.js
import React, { useState } from 'react';
import { ResumeContext } from './ResumeContext';

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState({
    name: '',
    currentRole: '',
    appliedRole: '',
    email: '',
    phoneNumber: '',
    website: '',
    education: [],
    skills: [],
    workExperience: [],
    projects: [],
  });

  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
};
