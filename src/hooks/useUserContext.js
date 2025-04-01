// /src/hooks/useUserContext.js
import { useContext } from 'react';
import { UserContext } from '../utils/UserContext'; // ✅ Import the context

const useUserContext = () => useContext(UserContext);

export default useUserContext;
