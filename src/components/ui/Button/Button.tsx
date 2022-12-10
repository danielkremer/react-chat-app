import classNames from 'classnames';

interface IProps {
  children?: any;
  onClick?: () => void;
}

const Button = ({ children, onClick }: IProps) => {
  const defaultButtonStyle = classNames(
    'button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white radius-round h-8 px-5 w-full rounded-md',
  );

  return (
    <button className={defaultButtonStyle} onClick={onClick}>
      <span className='text-xs'>{children}</span>
    </button>
  );
};

export default Button;
