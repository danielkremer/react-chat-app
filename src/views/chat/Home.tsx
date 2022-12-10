import Chat from '../../components/chat/Chat';
import Sidebar from '../../components/chat/Sidebar';

const Home = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex overflow-hidden justify-center w-4/6'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
