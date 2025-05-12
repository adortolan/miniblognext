import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDz1iutOPlZRvoa-HMx1lnFwEGe_hlmtPI",
  authDomain: "miniblognext.firebaseapp.com",
  projectId: "miniblognext",
  storageBucket: "miniblognext.firebasestorage.app",
  messagingSenderId: "775553570116",
  appId: "1:775553570116:web:28f007a385d1f6b443b311",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
