import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui';
import Input from '../../components/ui/Input';
import { auth, db } from '../../firebase';
import { emailInputRule, passwordInputRule } from '../../utils/helper/inputHelpers';

const Register = () => {
  const navigate = useNavigate();
  const [isPwVisible, setIsPwVisible] = useState(false);
  const [isConfirmPwVisible, setIsConfirmPwVisible] = useState(false);

  const { control, handleSubmit } = useForm();
  const submit = async (e: any) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //  Update profile
      await updateProfile(res.user, {
        displayName,
      });

      // create user on firestore
      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });

      // create empty user chats on firestore
      await setDoc(doc(db, 'userChats', res.user.uid), {});
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='h-[100vh]'>
      <div className='container mx-auto flex flex-col flex-auto items-center justify-center min-w-0 h-full'>
        <Card bodyClass='text-center'>
          <div className='mb-8'>
            <h3 className='mb-1'>Welcome back!</h3>
            <p>Please enter your credentials to sign in!</p>
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <Input
              label='Username'
              placeholder='Username'
              name='username'
              type='text'
              control={control}
              rules={emailInputRule}
            />
            <Input
              label='Email'
              placeholder='Email'
              name='email'
              type='email'
              control={control}
              rules={emailInputRule}
            />
            <Input
              label='Password'
              placeholder='Password'
              name='password'
              type={isPwVisible ? 'text' : 'password'}
              control={control}
              rules={passwordInputRule}
              suffix={
                <span
                  className='cursor-pointer text-xl'
                  onClick={() => setIsPwVisible(!isPwVisible)}
                >
                  {isPwVisible ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                </span>
              }
            />
            <Input
              label='Confirm Password'
              placeholder='Confirm Password'
              name='confirmPassword'
              type={isConfirmPwVisible ? 'text' : 'password'}
              control={control}
              rules={passwordInputRule}
              suffix={
                <span
                  className='cursor-pointer text-xl'
                  onClick={() => setIsConfirmPwVisible(!isConfirmPwVisible)}
                >
                  {isConfirmPwVisible ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                </span>
              }
            />
            <button className='button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white radius-round h-10 px-8 py-2 w-full rounded-md'>
              Sign in
            </button>
          </form>
          <div className='mt-4 text-center'>
            <span>You do have an account? </span>
            <Link to='/login' className='text-indigo-600 hover:underline'>
              Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
