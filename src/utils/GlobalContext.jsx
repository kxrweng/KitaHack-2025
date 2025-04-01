import React from 'react';
import { UserProvider } from './UserProvider';
import { ResumeProvider } from './ResumeProvider';

const GlobalContext = ({ children }) => {
  return (
    <UserProvider>
      <ResumeProvider>{children}</ResumeProvider>
    </UserProvider>
  );
};

export default GlobalContext;
