import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIAVdfGcQtzVaaM-oez0pmFm1_VsUplWM",
  authDomain: "taptalent-dashboard.firebaseapp.com",
  projectId: "taptalent-dashboard",
  storageBucket: "taptalent-dashboard.appspot.com",
  appId: "1:536432757579:web:716fd2843357e9311336ce",
  measurementId: "G-MMFE9RSZEC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
