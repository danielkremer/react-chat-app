import { signOut } from 'firebase/auth';
import { HiOutlineUser } from 'react-icons/hi';
import { auth } from '../../../firebase';
import { useAppSelector } from '../../../store/hooks';

const Navbar = () => {
  const loggedInUser = useAppSelector(({ user }) => user.loggedInUser);
  return (
    <div className='flex items-center h-14 p-2 justify-between text-slate-200 border-t border-gray-700 bg-gray-900 absolute bottom-0 w-full'>
      <div className=''>
        <div className='flex flex-row items-center'>
          <span className='avatar avatar-circle avatar-sm mr-3'>
            <span className='avatar-icon avatar-icon-sm '>
              <HiOutlineUser />
            </span>
          </span>
          <span>{loggedInUser.displayName}</span>
        </div>
      </div>
      <button
        className='border-indigo-600 hover:bg-indigo-500 border pb-1.5 pt-1 px-2 rounded-md text-xs'
        onClick={() => signOut(auth)}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
