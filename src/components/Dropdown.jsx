import PropTypes from 'prop-types';

const Dropdown = ({
  title,
  options,
  placeholder = 'Select an option',
  value,
  onChange,
  className = '',
  titleClassName = '',
  selectClassName = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {title && <label className={`mr-2 font-semibold text-secondary-a ${titleClassName}`}>{title}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`border border-primary-b p-2 rounded-md ${selectClassName} focus:outline-none  `}
      >
        <option value="" disabled className="bg-primary-d text-secondary-a">
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value ? option.value : option} className="bg-primary-b text-secondary-b">
            {option.label ? option.label : option.value ? option.value : option}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  selectClassName: PropTypes.string,
};

export default Dropdown;
