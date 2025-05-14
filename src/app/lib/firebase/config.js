import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDz1iutOPlZRvoa-HMx1lnFwEGe_hlmtPI",
  authDomain: "miniblognext.firebaseapp.com",
  projectId: "miniblognext",
  storageBucket: "miniblognext.firebasestorage.app",
  messagingSenderId: "775553570116",
  appId: "1:775553570116:web:28f007a385d1f6b443b311",
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
