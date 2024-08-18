// src/DateTimePicker.js
import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const DateTimePicker = ({ disabled, onChange, defaultDate }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(defaultDate ? defaultDate : new Date());
  const datePickerRef = useRef(null);

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus(); // Trigger focus event
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <DatePicker
        selected={selectedDateTime}
        onChange={(date) => {
          setSelectedDateTime(date);
          onChange(date);
        }}
        showTimeSelect
        timeIntervals={1}
        timeFormat="hh:mm aa"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="p-2 border-b-2 border-primary-b md:w-full md:text-base w-48 text-xs"
        disabled={disabled}
        ref={datePickerRef} // Attach ref to DatePicker
      />
      <FontAwesomeIcon
        icon={faCalendarAlt}
        className="text-gray-500 cursor-pointer"
        onClick={handleIconClick} // Handle icon click
      />
    </div>
  );
};

DateTimePicker.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default DateTimePicker;
