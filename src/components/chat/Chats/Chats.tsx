import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { db } from '../../../firebase';
import { changeUser } from '../../../store/chat/chat.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const Chats = () => {
  const [chats, setChats] = useState<any>([]);
  const loggedInUser = useAppSelector(({ user }) => user.loggedInUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', loggedInUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    loggedInUser.uid && getChats();
  }, [loggedInUser.uid]);

  const handleSelect = (userInfo: any) => {
    const chatId =
      loggedInUser.uid > userInfo.uid
        ? loggedInUser.uid + userInfo.uid
        : userInfo.uid + loggedInUser.uid;
    const payload = { user: userInfo, chatId: chatId };
    dispatch(changeUser(payload));
  };

  return (
    <div>
      {chats &&
        Object.entries(chats)
          ?.sort((a: any, b: any) => b[1].date - a[1].date)
          .map((chat: any) => (
            <div
              className='flex py-1.5 px-3 items-center gap-2 cursor-pointer bg-indigo-500 m-3 rounded-lg'
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <div className='flex flex-row items-center'>
                <span className='avatar avatar-circle avatar-sm mr-3'>
                  <span className='avatar-icon avatar-icon-sm '>
                    <HiOutlineUser />
                  </span>
                </span>
                <div className='text-white'>
                  <span>{chat[1].userInfo.displayName}</span>
                  <p className='text-xs'>{chat[1].lastMessage?.text}</p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
