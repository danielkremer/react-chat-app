import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsCameraVideoFill } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi';
import { useAppSelector } from '../../../store/hooks';
import InputArea from '../InputArea';
import Messages from '../Messages';

function Chat() {
  const user = useAppSelector(({ chat }) => chat.userInfo.user);
  return (
    <div className='flex-2 max-w-xl w-5/6 bg-gray-900 rounded-lg' style={{ height: '650px' }}>
      <div className='flex items-center justify-between border-b border-gray-800 p-3 h-14'>
        <div className='flex flex-row items-center'>
          <span className='avatar avatar-circle avatar-sm mr-3'>
            <span className='avatar-icon avatar-icon-sm '>
              <HiOutlineUser />
            </span>
          </span>
          <span className='text-gray-400'>{user?.displayName}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <BsCameraVideoFill />
          <AiOutlineUserAdd />
          <FiMoreHorizontal />
        </div>
      </div>
      <Messages />
      <InputArea />
    </div>
  );
}

export default Chat;
