import PropTypes from 'prop-types';

const Input = ({ label, labelClassName = '', type = 'text', value, onChange, placeholder, className = '' }) => {
  return (
    <div className='flex flex-col'>
      {label && (
        <label className={`${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={` ${className}`}
      />
    </div>
  );
};

// Define PropTypes
Input.propTypes = {
  label: PropTypes.string,
  labelClassName: PropTypes.string, 
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default Input;
