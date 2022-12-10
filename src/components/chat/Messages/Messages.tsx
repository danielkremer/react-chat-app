import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { useAppSelector } from '../../../store/hooks';
import Message from '../Message';

const Messages = () => {
  const userInfo: any = useAppSelector(({ chat }) => chat.userInfo);

  const [messages, setMessages] = useState<any>([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', userInfo.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [userInfo.chatId]);

  return (
    <div
      className='bg-gray-900 overflow-y-scroll p-3 scrollbar'
      style={{ height: 'calc(100% - 120px)' }}
    >
      {messages && messages.map((m: any) => <Message message={m} key={m.id} />)}
    </div>
  );
};

export default Messages;
