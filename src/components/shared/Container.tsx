import classNames from 'classnames';

interface IProps {
  children?: any;
  className?: string;
}

export const Container = ({ className, children }: IProps) => {
  return <div className={classNames('container mx-auto', className)}>{children}</div>;
};
export default Container;
