import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { db } from '../../../firebase';
import { changeUser } from '../../../store/chat/chat.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const Chats = () => {
  const [chats, setChats] = useState<any>([]);
  const loggedInUser = useAppSelector(({ user }) => user.loggedInUser);
  const user = useAppSelector(({ chat }) => chat.userInfo.user);
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

  const getFormattedChats = () => {
    if (chats && !!Object.entries(chats)) {
      return Object.entries(chats);
    } else {
      return [];
    }
  };

  const chosenUser = (chat: any) => {
    if (chat[1].userInfo) {
      if (user.uid === chat[1].userInfo.uid) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className='overflow-y-scroll  scrollbar'>
      {getFormattedChats()
        ?.sort((a: any, b: any) => b[1].date - a[1].date)
        .map((chat: any) => (
          <div
            className={`flex py-1.5 px-3 items-center gap-2 cursor-pointer bg-indigo-500 m-3 rounded-lg ${
              chosenUser(chat) && 'bg-indigo-400'
            }`}
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
                <span>{chat[1].userInfo ? chat[1].userInfo.displayName : 'No User Info'}</span>
                <p className='text-xs'>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
