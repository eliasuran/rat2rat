import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: 'rat2rat-243be.firebaseapp.com',
	projectId: 'rat2rat-243be',
	storageBucket: 'rat2rat-243be.appspot.com',
	messagingSenderId: '594255048820',
	appId: '1:594255048820:web:8bf4a1697ed2b20a6ee121',
	measurementId: 'G-PJVR58HJ21'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
