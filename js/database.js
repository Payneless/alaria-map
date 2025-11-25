import { firebaseConfig } from './config.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
