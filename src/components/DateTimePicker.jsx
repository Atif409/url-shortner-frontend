// src/DateTimePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const DateTimePicker = ({ disabled }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex  items-center">
      <div className="flex items-center space-x-2">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MMM-dd"
          className="p-2 border-b-2 border-primary-b md:w-full md:text-base w-24 text-xs "
          disabled={disabled}
        />
        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
      </div>
      
      <div className="flex items-center space-x-2">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={1}
          timeFormat="HH:mm"
          dateFormat="HH'h' : mm'min'"
          className="p-2 border-b-2 border-primary-b md:w-full md:text-base w-24 text-xs "
          disabled={disabled}
        />
        <FontAwesomeIcon icon={faClock} className="text-gray-500" />
      </div>
    </div>
  );
};

DateTimePicker.propTypes = {
  disabled: PropTypes.bool,
};

export default DateTimePicker;
