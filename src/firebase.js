import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRTJP8r3XUv-y87pE3z9r0sunMsvgE7dY",
  authDomain: "care-will.firebaseapp.com",
  projectId: "care-will",
  storageBucket: "care-will.firebasestorage.app",
  messagingSenderId: "2653160247",
  appId: "1:2653160247:web:d7f0181d38cbe1704c90b2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 