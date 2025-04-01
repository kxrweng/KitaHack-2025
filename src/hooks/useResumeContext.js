// /src/hooks/useResumeContext.js
import { useContext } from 'react';
import { ResumeContext } from '../utils/ResumeContext'; // ✅ Import the context

const useResumeContext = () => useContext(ResumeContext);

export default useResumeContext;
