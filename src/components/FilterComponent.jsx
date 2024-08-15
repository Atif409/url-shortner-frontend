// src/components/FilterComponent.jsx
import React from 'react';
import Input from './Input';
const FilterComponent = ({ startDate, endDate, setStartDate, setEndDate, timePeriod, setTimePeriod }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex items-center">
        <label className="mr-2 font-semibold">Filters:</label>
       
        <Input
        label='Start Date'
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded "
        />
      
        <Input
        label='End Date'
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded ml-2"
        />
      </div>
      <div className="flex items-center">
        <label className="mr-2 font-semibold">Time Period:</label>
        <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className="border p-2 rounded">
          <option value="years">Years</option>
          <option value="months">Months</option>
          <option value="weeks">Weeks</option>
          <option value="days">Days</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
