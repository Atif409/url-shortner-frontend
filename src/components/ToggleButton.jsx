import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ToggleButton({
  title,
  description,
  onClick,
  isToggled = false,
  className = '',
  titleClassName = 'text-secondary-a',
  descriptionClassName = 'text-secondary-a',
}) {
  const [isToggledState, setIsToggledState] = useState(isToggled);

  const handleToggle = () => {
    setIsToggledState(!isToggledState);
    if (onClick) onClick(!isToggledState);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {title && <h3 className={`text-base font-semibold ${titleClassName}`}>{title}</h3>}
      <div className="flex items-center mt-1">
        {/* Toggle Switch */}
        <div
          onClick={handleToggle}
          className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ease-in-out ${
            isToggledState ? 'bg-primary-a' : 'bg-primary-d'
          }`}
        >
          {/* Circle inside the switch */}
          <div
            className={`bg-primary-c w-5 h-5 rounded-full shadow-md transform transition duration-300 ease-in-out ${
              isToggledState ? 'translate-x-8' : ''
            }`}
          ></div>
        </div>
        {/* Description */}
        {description && <span className={`ml-3 ${descriptionClassName}`}>{description}</span>}
      </div>
    </div>
  );
}

ToggleButton.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  isToggled: PropTypes.bool,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  descriptionClassName: PropTypes.string,
};

export default ToggleButton;
