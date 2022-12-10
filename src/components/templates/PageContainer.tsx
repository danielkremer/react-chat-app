import classNames from 'classnames';
import { PAGE_CONTAINER_GUTTER_X, PAGE_CONTAINER_GUTTER_Y } from '../../constants/theme.constants';

interface IProps {
  children?: any;
}
export const PageContainer = ({ children }: IProps) => {
  return (
    <div className='h-full flex flex-auto flex-col justify-between'>
      <main className='h-full'>
        <div
          className={classNames(
            'page-container relative h-full flex flex-auto flex-col',
            `${PAGE_CONTAINER_GUTTER_X} ${PAGE_CONTAINER_GUTTER_Y}`,
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
};
