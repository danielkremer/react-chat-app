import classNames from 'classnames';
import { Controller } from 'react-hook-form';

interface IProps {
  control: any;
  type: string;
  placeholder?: string;
  name: string;
  rules: object;
  label: string;
  customClass?: string;
  isRequired?: boolean;
  secureTextEntry?: boolean;
  suffix?: any;
  prefix?: any;
  onKeyDown?: (e: any) => void;
  onChange?: (e: any) => void;
}

const Input = ({
  control,
  name,
  type,
  rules = {},
  label,
  customClass,
  suffix,
  prefix,
  isRequired = false,
  onKeyDown,
}: IProps) => {
  const inputStyling = classNames(
    'my-1 input input-md h-10 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600',
    customClass ? customClass : '',
  );

  const inputWrapperClass = `input-wrapper ${prefix || suffix ? customClass : ''}`;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue=''
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <div className='my-5 vertical text-left'>
            <label className='ml-2'>{label}</label>
            <div>
              <span className={inputWrapperClass}>
                {prefix && <div className='input-suffix-start'></div>}
                <input
                  style={{ color: error ? 'red' : '#f7f7f7' }}
                  type={type}
                  className={inputStyling}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  required={isRequired}
                  onKeyDown={onKeyDown}
                />
                {suffix && <div className='input-suffix-end right-3'>{suffix}</div>}
              </span>
            </div>
            {error && <div className='text-red-500'>{error.message || 'Error'}</div>}
          </div>
        </>
      )}
    />
  );
};

export default Input;
