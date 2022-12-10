import classNames from 'classnames';

interface IProps {
  bordered?: boolean;
  children?: any;
  className?: string;
  clickable?: boolean;
  onClick?: any;
  bodyClass?: string;
  header?: any;
  headerClass?: string;
  headerBorder?: any;
  headerExtra?: any;
  footer?: any;
  footerClass?: string;
  footerBorder?: string;
}

const Card = ({
  bordered = false,
  children,
  className,
  clickable,
  onClick,
  bodyClass,
  header,
  headerClass,
  headerBorder,
  headerExtra,
  footer,
  footerClass,
  footerBorder,
}: IProps) => {
  const cardClass = classNames(
    'card',
    className,
    bordered ? 'card-border' : 'card-shadow',
    clickable && 'cursor-pointer user-select-none',
  );
  const cardBodyClass = classNames('card-body', bodyClass);
  const cardHeaderClass = classNames(
    'card-header',
    headerBorder && 'card-header-border',
    headerExtra && 'card-header-extra',
    headerClass,
  );
  const cardFooterClass = classNames(
    'card-footer',
    footerBorder && 'card-footer-border',
    footerClass,
  );

  const renderHeader = () => {
    if (typeof header === 'string') {
      return <h4>{header}</h4>;
    }
    return <>{header}</>;
  };

  const onCardClick = (event: any) => {
    onClick?.(event);
  };

  return (
    <div className={cardClass} onClick={onCardClick}>
      {header && (
        <div className={cardHeaderClass}>
          {renderHeader()}
          {headerExtra && <span>{headerExtra}</span>}
        </div>
      )}
      <div className={cardBodyClass}>{children}</div>
      {footer && <div className={cardFooterClass}>{footer}</div>}
    </div>
  );
};

export default Card;
