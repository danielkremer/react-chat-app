import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { PropsWithChildren, useEffect } from 'react';
import { auth, db } from '../firebase';
import { useAppDispatch } from '../store/hooks';
import { setLoggedInUser } from '../store/user/user.slice';

function AuthProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  const handleCreateUser = async (q: any, user: any) => {
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length <= 0) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
        await setDoc(doc(db, 'userChats', user.uid), {});
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, 'users'), where('email', '==', user.email));
        handleCreateUser(q, user);
      }

      dispatch(setLoggedInUser(user));
    });
  }, []);
  return <>{children}</>;
}

export default AuthProvider;
