// /src/hooks/useResumeContext.js
import { useContext } from 'react';
import { GlobalContext } from '../utils/GlobalContext'; // ✅ Import the context

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
