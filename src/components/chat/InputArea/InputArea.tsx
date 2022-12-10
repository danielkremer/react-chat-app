import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { ImAttachment } from 'react-icons/im';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../../../firebase';
import { useAppSelector } from '../../../store/hooks';
import { Button } from '../../ui';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const loggedInUser = useAppSelector(({ user }) => user.loggedInUser);
  const userInfo: any = useAppSelector(({ chat }) => chat.userInfo);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed', () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, 'chats', userInfo.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: loggedInUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, 'chats', userInfo.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: loggedInUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', loggedInUser.uid), {
      [userInfo.chatId + '.lastMessage']: {
        text,
      },
      [userInfo.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', userInfo.user.uid), {
      [userInfo.chatId + '.lastMessage']: {
        text,
      },
      [userInfo.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImg(null);
  };

  return (
    <div className='flex flex-row items-center bg-gray-900 border-t rounded-b-lg border-gray-700 py-4 px-4 '>
      <span className='text-md mr-3 cursor-pointer'>
        <ImAttachment />
      </span>
      <input
        className='w-full focus:outline-none text-neutral-100 placeholder-neutral-300 pl-5 bg-slate-700 rounded-xl text-xs py-2 mr-2'
        type='text'
        placeholder='Type something...'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className='send'>
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default Input;
