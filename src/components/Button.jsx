import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({
  text,
  iconShow,
  iconPosition = 'left',
  iconClassName,
  className,
  onClick,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      className={classNames(
        'flex items-center px-4 py-2 relative',
        { 'mr-2': iconShow && iconPosition === 'left', 'ml-2': iconShow && iconPosition === 'right' },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <span className="absolute w-full h-full bg-gray-200 opacity-50 flex items-center justify-center ">
          <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
        </span>
      )}

      {iconShow && iconPosition === 'left' && (
        <span className="flex space-x-2 mr-2">
          {iconShow.map((icon, index) => (
            <FontAwesomeIcon key={index} icon={icon} className={iconClassName} />
          ))}
        </span>
      )}
      <span>{text}</span>
      {iconShow && iconPosition === 'right' && (
        <span className="flex space-x-2 ml-2">
          {iconShow.map((icon, index) => (
            <FontAwesomeIcon key={index} icon={icon} className={iconClassName} />
          ))}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  iconShow: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconClassName: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Button;
