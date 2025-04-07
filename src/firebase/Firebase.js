// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'kitahack-2025.firebaseapp.com',
  projectId: 'kitahack-2025',
  storageBucket: 'kitahack-2025.firebasestorage.app',
  messagingSenderId: '55173003972',
  appId: '1:55173003972:web:bd877aaaaa1e5cfe3a6791',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
