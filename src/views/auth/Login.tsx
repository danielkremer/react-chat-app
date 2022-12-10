import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';
import { signInWithGoogle } from '../../firebase';

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const submitGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='h-[100vh]'>
      <div className='mx-auto flex flex-col flex-auto items-center justify-center min-w-0 h-full'>
        <Card bodyClass='text-center bg-gray-900 rounded-lg pb-6'>
          <div className='mb-8'>
            <h3 className='mb-1'>Welcome back!</h3>
            <p>Please sign in with either Google or Facebook!</p>
          </div>
          <form className='mb-2' onSubmit={handleSubmit(submitGoogle)}>
            <Button>Sign in with Google</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
