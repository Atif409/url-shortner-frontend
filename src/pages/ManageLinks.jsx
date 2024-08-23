import { useState, useEffect } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { deleteLink, getLinkList } from '../services/link.api';
import { localStorageService } from '../utils/localStorageService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-simple-toasts';
import Modal from 'react-modal';
import QRCode from 'react-qr-code';
const ManageLinks = () => {
  const [records, setRecords] = useState(0);
  const [link, setLink] = useState('');
  const [linkLoading, setLinkLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deletingLink, setDeletingLink] = useState(null);
  const recordsPerPage = 25;
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [linkIndex, openLinkIndex] = useState(0);
  const closeModal = () => setModalIsOpen(false);
  const getQrCodeLinkString = (shortId) => {
    return `${import.meta.env.VITE_APP_BASE_URL}/${data[linkIndex].shorten_link}`;
  };

  const deleteLinkData = async (row) => {
    const promptAns = confirm(
      `Are you sure you want to delete this link: ${import.meta.env.VITE_APP_BASE_URL}/${row.shorten_link}?`
    );
    console.log(promptAns);
    if (!promptAns) {
      return;
    }
    setDeletingLink(row._id);
    try {
      const deleteLinkData = await deleteLink({ id: row._id });
      if (deleteLinkData.data.success == true) {
        toast('Link Delete Successfully');
        fetchLinkList();
      } else {
        toast('Failed to delete link');
      }
    } catch (error) {
      toast('Sorry Failed to delete link. Try again later!');
      console.log('Error', error);
    }
    setDeletingLink(null);
  };
  const fetchLinkList = async () => {
    setLinkLoading(true);
    const linkData = await getLinkList({
      user_id: localStorageService.getItem('user_id'),
      page: page,
      total: limit,
      keyword: link,
    });
    console.log(linkData);
    if (linkData.data.success == true) {
      setData(linkData.data.data.records);
      setTotalRecords(linkData.data.data.totalCount);
      setTotalPages(linkData.data.data.totalPages);
      setPage(linkData.data.data.currentPage);
    } else {
      setErrorMessage(linkData.data.message);
      setError(true);
    }
    setLinkLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(
      (oldValue) => {
        if (oldValue == link) {
          fetchLinkList();
        }
      },
      2000,
      link
    );
    return () => clearTimeout(timer);
  }, [link]);

  useEffect(() => {
    console.log('Called Page');
    fetchLinkList();
  }, [page]);
  const handleLinkChange = (e) => {
    console.log(e.target.value);
    setLink(e.target.value);
  };

  const headers = ['Title', 'Original URL', 'Short URL', 'Clicks', 'Smart Link', 'Actions'];

  useEffect(() => {
    setRecords(data.length);
  }, [data]);

  const rowRenderer = (row, index) => {
    return (
      <>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <div className="flex justify-center ">
            <QRCode size={128} value={getQrCodeLinkString(row.shorten_link)} />
          </div>
          <button onClick={closeModal}>Close</button>
        </Modal>
        <td className="py-2 px-4 text-center">{row.title}</td>
        <td className="py-2 px-4 text-center">
          <NavLink to={row.original_link} className="text-secondary-a hover:underline">
            {row.original_link}
          </NavLink>
        </td>
        <td className="py-2 px-4 flex justify-center items-center">
          <NavLink
            to={`${import.meta.env.VITE_APP_BASE_URL}/${row.shorten_link}`}
            className="text-secondary-a  hover:underline"
          >
            {import.meta.env.VITE_APP_BASE_URL}/{row.shorten_link}
          </NavLink>
        </td>
        <td className="py-2 px-4 text-center">{row.clickCount}</td>
        <td className="py-2 px-4 text-center">{row.is_smart_link ? 'Yes' : 'No'}</td>
        <td className="py-2 px-4 flex justify-center items-center space-x-2">
          <Button
            text="Edit"
            className="bg-primary-a text-secondary-b hover:opacity-75 rounded-md h-8"
            onClick={() => {
              if (row.is_smart_link) {
                navigate(`/app/create-smart-links/${row._id}`);
              } else {
                navigate(`/app/create-link/${row._id}`);
              }
            }}
          />
          <Button
            text="Copy"
            className="bg-[#008000] text-secondary-b hover:opacity-75 rounded-md h-8"
            onClick={() => {
              navigator.clipboard
                .writeText(`${import.meta.env.VITE_APP_BASE_URL}/${row.shorten_link}`)
                .then(() => {
                  toast('Short Link Copied!');
                })
                .catch(() => {
                  toast('Failed to copy!');
                });
            }}
          />
          <Button
            text="Delete"
            onClick={() => deleteLinkData(row)}
            isLoading={deletingLink == row._id}
            className="bg-[#ff0000] text-secondary-b hover:opacity-65 rounded-md h-8"
          />
          <Button
            text="QRCode"
            className="bg-[#b3aaff] text-secondary-b hover:opacity-65 rounded-md h-8"
            onClick={() => {
              openLinkIndex(index);
              setModalIsOpen(true);
            }}
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
  if (linkLoading == true) {
    return <Loader title="Loading..." />;
  }
  return (
    <div className="p-2">
      <h2 className="lg:text-4xl text-2xl font-semibold mb-4 text-secondary-a lg:pl-8 tracking-wider pt-8">
        Manage Links
      </h2>
      <div className="lg:pl-12 lg:mt-12  flex-row flex">
        <Input
          type="text"
          value={link}
          onChange={handleLinkChange}
          placeholder="Search links...."
          className="w-80 h-10 border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75"
        />
        <Button text="Search" className="bg-primary-b text-secondary-b hover:opacity-75 rounded-md h-10 ml-5" />
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex justify-end items-end w-full lg:pr-10 pr-2">
          <p className="text-lg text-secondary-a mt-4">Total Records: {totalRecords}</p>
        </div>
        <div
          className="w-full lg:pl-8 lg:pr-8 mt-2
        
        max-h-[63vh] overflow-y-auto "
        >
          <Table
            headers={headers}
            data={data}
            rowRenderer={rowRenderer}
            className="border"
            headerClassName="bg-primary-b text-secondary-b "
            rowClassName="border"
          />
        </div>
        <div className="flex justify-end mt-4 w-full lg:pr-8">
          <div className="flex flex-row items-center border-2 border-primary-f  rounded-xl h-8">
            <div className={`hover:bg-primary-f rounded-tl-xl rounded-bl-xl `}>
              <Button
                text="Previous"
                className="m-0 text-secondary-c font-bold hover:text-secondary-a h-8"
                onClick={() =>
                  setPage(() => {
                    if (page == 1) return;
                    setPage(page - 1);
                  })
                }
                disabled={page == 1}
              />
            </div>
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                onClick={() => setPage(index + 1)}
                key={index}
                className={`cursor-pointer border-r-2  ps-2 pe-2 h-8 text-center ${index == page - 1 ? 'bg-primary-b text-secondary-b' : ''} place-content-center font-bold`}
              >
                {index + 1}
              </div>
            ))}
            <div className={`hover:bg-primary-f rounded-tr-xl rounded-br-xl`}>
              <Button
                text="Next"
                className="m-0 text-secondary-c font-bold hover:text-secondary-a h-8"
                onClick={() => {
                  if (page == totalPages) return;
                  console.log('Page', page, totalPages);
                  setPage(page + 1);
                }}
                disabled={page == totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLinks;
