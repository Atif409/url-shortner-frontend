import React from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';

const ManageLinks = () => {
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
      title: 'Example Link 4',
      originalUrl: 'https://example/very-long-url',
      shortUrl: 'https://urlshorten.com/',
      clicks: 604,
    },
  ];

  const rowRenderer = (row, index) => {
    return (
      <>
        <td className="py-2 px-4 text-center">{row.title}</td>
        <td className="py-2 px-4 text-center">
          <NavLink to={row.originalUrl} className="text-blue-500 hover:underline ">
            {row.originalUrl}
          </NavLink>
        </td>
        <td className="py-2 px-4 flex justify-center items-center">
          <NavLink href={row.shortUrl} className="text-blue-500 hover:underline">
            {row.shortUrl}
          </NavLink>
        </td>
        <td className="py-2 px-4 text-center">{row.clicks}</td>
        <td className="py-2 px-4 flex justify-center items-center space-x-2">
          <Button
            text="Edit"
            className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg h-8"
            onClick={() => console.log('Edit clicked', index)}
          />
          <Button
            text="Copy"
            className="bg-green-500 text-white hover:bg-green-600 rounded-lg h-8"
            onClick={() => console.log('Copy clicked', index)}
          />
          <Button
            text="Delete"
            className="bg-red-500 text-white hover:bg-red-600 rounded-lg h-8"
            onClick={() => console.log('Delete clicked', index)}
          />

          <Button
            text="QRCode"
            className="bg-gray-500 text-white hover:bg-gray-600  rounded-lg h-8"
            onClick={() => console.log('QR Code clicked', index)}
          />

          <Button
            text="Analytics"
            className="bg-purple-500 text-white hover:bg-purple-600 rounded-lg h-8"
            onClick={() => console.log('Analytics clicked', index)}
          />
        </td>
      </>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Links</h2>
      <Table
        headers={headers}
        data={data}
        rowRenderer={rowRenderer}
        className="border"
        headerClassName="bg-pink-300 text-blue-800"
        rowClassName="border  "
      />
    </div>
  );
};

export default ManageLinks;
