// src/components/FilterComponent.jsx
import React from 'react';
import Input from './Input';
const FilterComponent = ({ startDate, endDate, setStartDate, setEndDate, timePeriod, setTimePeriod }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex items-center ">
        <label className="mr-2 font-semibold text-center pt-6 text-secondary-a">Filters:</label>

        <Input
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded md:w-60 sm:w-36 w-24 sm:text-base text-xs  text-secondary-c"
          labelClassName="md:text-base text-xs text-secondary-a "
        />

        <Input
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded ml-2 md:w-72 sm:w-36 w-24 md:text-base text-xs text-secondary-c"
          labelClassName="md:text-base text-xs pl-2 text-secondary-a"
        />
      </div>
      {/* <div className="flex items-center">
        <label className="mr-2 font-semibold">Time Period:</label>
        <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="border p-2 rounded">
          <option value="years">Years</option>
          <option value="months">Months</option>
          <option value="weeks">Weeks</option>
          <option value="days">Days</option>
        </select>
      </div> */}
    </div>
  );
};

export default FilterComponent;
