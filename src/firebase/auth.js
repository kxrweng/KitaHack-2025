import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './Firebase';

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doLogInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
