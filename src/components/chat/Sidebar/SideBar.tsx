import Chats from '../Chats';
import Navbar from '../Navbar';
import Search from '../Search';

const Sidebar = () => {
  return (
    <div className='flex bg-gray-900 relative flex-col w-2/4 mr-5 rounded-lg'>
      <Search />
      <p className='pl-3 pt-2 text-base text-indigo-500'>Chats</p>
      <Chats />
      <Navbar />
    </div>
  );
};

export default Sidebar;
