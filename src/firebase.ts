import { initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import config from './config';

const app = initializeApp(config.firebase);

export const auth = getAuth(app);
export default app;
export const storage = getStorage();
export const db = getFirestore();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithRedirect(auth, googleProvider);
    return res;
  } catch (err) {
    console.error(err);
  }
};
export const signInWithFacebook = async () => {
  try {
    const res = await signInWithRedirect(auth, facebookProvider);
    return res;
  } catch (err) {
    console.error(err);
  }
};
