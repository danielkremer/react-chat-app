import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { db } from '../../../firebase';
import { useAppSelector } from '../../../store/hooks';
const Search = () => {
  const [username, setUsername] = useState<any>('');
  const [user, setUser] = useState<any>(null);
  const [err, setErr] = useState(false);

  const loggedInUser = useAppSelector(({ user }) => user.loggedInUser);

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('displayName', '==', username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: any) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    if (!user) {
      return;
    }
    const combinedId =
      loggedInUser.uid > user.uid ? loggedInUser.uid + user.uid : user.uid + loggedInUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, 'userChats', loggedInUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: loggedInUser.uid,
            displayName: loggedInUser.displayName,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername('');
  };
  return (
    <div className=''>
      <div className='p-3'>
        <div>
          <p className='pb-2 text-base text-indigo-500'>Contacts</p>
          <span className='input-wrapper '>
            <div className='input-suffix-start pl-2'>
              <span>
                <AiOutlineSearch />
              </span>
            </div>
            <input
              className='pl-7 input input-md h-8 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'
              type='text'
              placeholder='Search for contact...'
              onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              style={{ paddingLeft: '2.125rem' }}
            />
          </span>
        </div>
      </div>
      {err && <span className='p-3 mb-2 mx-3 text-red-400'>User not found!</span>}
      {user && (
        <div
          className='p-3 cursor-pointer mb-2 mx-3 rounded-xl text-gray-300'
          onClick={handleSelect}
        >
          <div className='flex flex-row items-center'>
            <span className='avatar avatar-circle avatar-sm mr-3'>
              <span className='avatar-icon avatar-icon-sm '>
                <HiOutlineUser />
              </span>
            </span>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
