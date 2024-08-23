import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ headers, data, rowRenderer, className = '', headerClassName = '', rowClassName = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-primary-c border border-primary-d">
        <thead>
          <tr className={`bg-primary-b text-secondary-b ${headerClassName}`}>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Render each row */}
          {data.map((row, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-primary-f  ' : ''} ${rowClassName}`}>
              {rowRenderer(row, index)}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length == 0 && (
        <div className={`bg-primary-f ${rowClassName} text-center text-secondary-a`}>No Record Exist!</div>
      )}
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of strings for table headers
  data: PropTypes.array.isRequired, // Array for table data
  rowRenderer: PropTypes.func.isRequired, // Function to render each row
  className: PropTypes.string, // Optional className for table wrapper
  headerClassName: PropTypes.string, // Optional className for the header row
  rowClassName: PropTypes.string, // Optional className for each row
};

export default Table;
