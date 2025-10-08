import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDHll-DPEfe9L0q98u16craUluFIum1Mnk",
  authDomain: "shareup-bba46.firebaseapp.com",
  projectId: "shareup-bba46",
  storageBucket: "shareup-bba46.firebasestorage.app",
  messagingSenderId: "935613743045",
  appId: "1:935613743045:web:c55ca26132c7a6b00115ac",
  measurementId: "G-3ZWSK71KEK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app, analytics };
