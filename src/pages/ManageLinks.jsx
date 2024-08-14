import { useState, useEffect } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';
import Input from '../components/Input';

const ManageLinks = () => {
  const [records, setRecords] = useState(0);
  const [link, setLink] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 4;

  const handleLinkChange = (e) => setLink(e.target.value);

  const headers = ['Title', 'Original URL', 'Short URL', 'Clicks', 'Actions'];
  const data = [
    {
      title: 'Example Link 1',
      originalUrl: 'https://example/very-long-url',
      shortUrl: 'https://urlshorten.com/',
      clicks: 107,
    },
    {
      title: 'Example Link 2',
      originalUrl: 'https://example/very-long-url',
      shortUrl: 'https://urlshorten.com/',
      clicks: 704,
    },
    {
      title: 'Example Link 3',
      originalUrl: 'https://example/very-long-url',
      shortUrl: 'https://urlshorten.com/',
      clicks: 106,
    },
    {
      title: 'Example Link 4',
      originalUrl: 'https://example/very-long-url',
      shortUrl: 'https://urlshorten.com/',
      clicks: 604,
    },
    {
      title: 'Example Link 5',
      originalUrl: 'https://example/very-long-url',
      shortUrl: 'https://urlshorten.com/',
      clicks: 604,
    },
  ];

  useEffect(() => {
    setRecords(data.length);
  }, [data]);

  const startIndex = currentPage * recordsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + recordsPerPage);

  const rowRenderer = (row, index) => {
    return (
      <>
        <td className="py-2 px-4 text-center">{row.title}</td>
        <td className="py-2 px-4 text-center">
          <NavLink to={row.originalUrl} className="text-secondary-a hover:underline">
            {row.originalUrl}
          </NavLink>
        </td>
        <td className="py-2 px-4 flex justify-center items-center">
          <NavLink to={row.shortUrl} className="text-secondary-a  hover:underline">
            {row.shortUrl}
          </NavLink>
        </td>
        <td className="py-2 px-4 text-center">{row.clicks}</td>
        <td className="py-2 px-4 flex justify-center items-center space-x-2">
          <Button
            text="Edit"
            className="bg-primary-a text-secondary-b hover:opacity-75 rounded-md h-8"
            onClick={() => console.log('Edit clicked', index)}
          />
          <Button
            text="Copy"
            className="bg-[#008000] text-secondary-b hover:opacity-75 rounded-md h-8"
            onClick={() => console.log('Copy clicked', index)}
          />
          <Button
            text="Delete"
            className="bg-[#ff0000] text-secondary-b hover:opacity-65 rounded-md h-8"
            onClick={() => console.log('Delete clicked', index)}
          />
          <Button
            text="QRCode"
            className="bg-[#b3aaff] text-secondary-b hover:opacity-65 rounded-md h-8"
            onClick={() => console.log('QR Code clicked', index)}
          />
          <Button
            text="Analytics"
            className="bg-primary-b text-secondary-b hover:opacity-75 rounded-md h-8"
            onClick={() => console.log('Analytics clicked', index)}
          />
        </td>
      </>
    );
  };

  return (
    <div className="p-2">
      <h2 className="lg:text-4xl text-2xl font-semibold mb-4 text-secondary-a lg:pl-8 tracking-wider pt-8">
        Manage Links
      </h2>

      <div className="lg:pl-12 lg:mt-12">
        <Input
          type="text"
          value={link}
          onChange={handleLinkChange}
          placeholder="Search links...."
          className="sm:w-[40%] w-[80%] h-10 border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75"
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex justify-end items-end w-full lg:pr-10 pr-2">
          <p className="text-lg text-secondary-a mt-4">Total Records: {records}</p>
        </div>
        <div className="w-full lg:pl-8 lg:pr-8 mt-2">
          <Table
            headers={headers}
            data={paginatedData}
            rowRenderer={rowRenderer}
            className="border"
            headerClassName="bg-primary-d text-[#2C2F6F]"
            rowClassName="border"
          />
        </div>
        <div className="flex justify-end mt-4 w-full lg:pr-8">
          <div className="flex flex-row items-center border-2 border-primary-f  w-52 rounded-xl h-8">
            <div
              className={`hover:bg-primary-f rounded-tl-xl rounded-bl-xl ${
                currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Button
                text="Previous"
                className="m-0 text-secondary-c font-bold hover:text-secondary-a h-8"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
              />
            </div>
            <span className="bg-primary-b w-12 h-8 text-center text-secondary-b place-content-center font-bold">
              {currentPage + 1}
            </span>
            <div
              className={`hover:bg-primary-f rounded-tr-xl rounded-br-xl ${
                startIndex + recordsPerPage >= records ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Button
                text="Next"
                className="m-0 text-secondary-c font-bold hover:text-secondary-a h-8"
                onClick={() => setCurrentPage((prev) => (startIndex + recordsPerPage < records ? prev + 1 : prev))}
                disabled={startIndex + recordsPerPage >= records}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLinks;
