import { useEffect, useRef } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { useAppSelector } from '../../../store/hooks';

const Message = ({ message }: any) => {
  const loggedInUser = useAppSelector(({ user }) => user.loggedInUser);
  const ref = useRef<any>();
  const timeOfMessage = new Date(message.date.seconds * 1000)
    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    .toString();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex gap-5 mb-5 items-end ${
        message.senderId === loggedInUser.uid && 'flex-row-reverse items-end'
      }`}
    >
      <div className='flex flex-col text-gray-300 font-light'>
        <span className='avatar avatar-circle avatar-sm '>
          <span className='avatar-icon avatar-icon-sm '>
            <HiOutlineUser />
          </span>
        </span>
        <span className='mt-1 text-center' style={{ fontSize: '10px' }}>
          {timeOfMessage}
        </span>
      </div>
      <div className='max-w-md flex flex-col gap-5'>
        <p
          className={`bg-indigo-500 py-1.5 px-3 text-white text-xs ${
            message.senderId === loggedInUser.uid
              ? 'rounded-tl-md rounded-br-md rounded-bl-md'
              : 'rounded-tr-md rounded-br-md rounded-bl-md'
          }`}
        >
          {message.text}
        </p>
        {message && message.img && <img className='w-5/12' src={message.img} alt='' />}
      </div>
    </div>
  );
};

export default Message;
