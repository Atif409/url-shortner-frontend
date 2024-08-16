import { useState, useEffect } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';
import Input from '../components/Input';

const ManageLinks = () => {
  const [records, setRecords] = useState(0);
  const [link, setLink] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 25;

  const handleLinkChange = (e) => setLink(e.target.value);

  const headers = ['Title', 'Original URL', 'Short URL', 'Clicks', 'Actions'];
 const data = [
   {
     title: 'Blog Post',
     originalUrl: 'https://myblog.com/how-to-code',
     shortUrl: 'https://urlshorten.com/abc123',
     clicks: 542,
   },
   {
     title: 'Product Page',
     originalUrl: 'https://store.com/product/gadget-2000',
     shortUrl: 'https://urlshorten.com/def456',
     clicks: 321,
   },
   {
     title: 'Landing Page',
     originalUrl: 'https://mywebsite.com/landing-page',
     shortUrl: 'https://urlshorten.com/ghi789',
     clicks: 907,
   },
   {
     title: 'Portfolio',
     originalUrl: 'https://portfolio.com/johndoe',
     shortUrl: 'https://urlshorten.com/jkl012',
     clicks: 678,
   },
   {
     title: 'Event Registration',
     originalUrl: 'https://events.com/register/webinar',
     shortUrl: 'https://urlshorten.com/mno345',
     clicks: 194,
   },
   {
     title: 'Job Application',
     originalUrl: 'https://jobs.com/apply/software-engineer',
     shortUrl: 'https://urlshorten.com/pqr678',
     clicks: 245,
   },
   {
     title: 'Recipe Blog',
     originalUrl: 'https://recipes.com/grilled-chicken',
     shortUrl: 'https://urlshorten.com/stu901',
     clicks: 321,
   },
   {
     title: 'YouTube Video',
     originalUrl: 'https://youtube.com/watch?v=abc123',
     shortUrl: 'https://urlshorten.com/vwx234',
     clicks: 1024,
   },
   {
     title: 'Online Course',
     originalUrl: 'https://learningplatform.com/course/react-basics',
     shortUrl: 'https://urlshorten.com/yz567',
     clicks: 578,
   },
   {
     title: 'News Article',
     originalUrl: 'https://news.com/2024-tech-trends',
     shortUrl: 'https://urlshorten.com/abc890',
     clicks: 111,
   },
   {
     title: 'GitHub Repo',
     originalUrl: 'https://github.com/user/project',
     shortUrl: 'https://urlshorten.com/def321',
     clicks: 654,
   },
   {
     title: 'Ebook Download',
     originalUrl: 'https://ebooks.com/free-download',
     shortUrl: 'https://urlshorten.com/ghi654',
     clicks: 892,
   },
   {
     title: 'Charity Donation',
     originalUrl: 'https://charity.com/donate-now',
     shortUrl: 'https://urlshorten.com/jkl987',
     clicks: 274,
   },
   {
     title: 'Survey Form',
     originalUrl: 'https://survey.com/customer-feedback',
     shortUrl: 'https://urlshorten.com/mno876',
     clicks: 411,
   },
   {
     title: 'Fitness Guide',
     originalUrl: 'https://fitnessblog.com/10-minute-workout',
     shortUrl: 'https://urlshorten.com/pqr543',
     clicks: 662,
   },
   {
     title: 'Photography Portfolio',
     originalUrl: 'https://photos.com/janedoe',
     shortUrl: 'https://urlshorten.com/stu210',
     clicks: 900,
   },
   {
     title: 'Online Store',
     originalUrl: 'https://shoponline.com/new-arrivals',
     shortUrl: 'https://urlshorten.com/vwx123',
     clicks: 390,
   },
   {
     title: 'Case Study',
     originalUrl: 'https://casestudies.com/marketing-strategy',
     shortUrl: 'https://urlshorten.com/yz456',
     clicks: 275,
   },
   {
     title: 'Resume',
     originalUrl: 'https://resume.com/johndoe',
     shortUrl: 'https://urlshorten.com/abc789',
     clicks: 832,
   },
   {
     title: 'Infographic',
     originalUrl: 'https://infographics.com/social-media-trends',
     shortUrl: 'https://urlshorten.com/def654',
     clicks: 113,
   },
   {
     title: 'Tech Forum',
     originalUrl: 'https://techforum.com/discussion/react-vs-vue',
     shortUrl: 'https://urlshorten.com/ghi321',
     clicks: 567,
   },
   {
     title: 'Podcast Episode',
     originalUrl: 'https://podcast.com/episode/1',
     shortUrl: 'https://urlshorten.com/jkl012',
     clicks: 431,
   },
   {
     title: 'Freelance Portfolio',
     originalUrl: 'https://freelancer.com/janedoe',
     shortUrl: 'https://urlshorten.com/mno345',
     clicks: 223,
   },
   {
     title: 'Donation Page',
     originalUrl: 'https://support.com/donate-here',
     shortUrl: 'https://urlshorten.com/pqr678',
     clicks: 300,
   },
   {
     title: 'Project Showcase',
     originalUrl: 'https://projects.com/coding-challenge',
     shortUrl: 'https://urlshorten.com/stu901',
     clicks: 505,
   },
   {
     title: 'Travel Blog',
     originalUrl: 'https://travelblog.com/top-10-destinations',
     shortUrl: 'https://urlshorten.com/vwx234',
     clicks: 670,
   },
   {
     title: 'Cooking Tutorial',
     originalUrl: 'https://cookingblog.com/how-to-make-pasta',
     shortUrl: 'https://urlshorten.com/yz567',
     clicks: 792,
   },
   {
     title: 'Digital Magazine',
     originalUrl: 'https://magazine.com/august-2024-issue',
     shortUrl: 'https://urlshorten.com/abc890',
     clicks: 234,
   },
   {
     title: 'Non-Profit Campaign',
     originalUrl: 'https://nonprofit.com/support-our-mission',
     shortUrl: 'https://urlshorten.com/def321',
     clicks: 101,
   },
   {
     title: 'Webinar Replay',
     originalUrl: 'https://webinars.com/replay/seo-basics',
     shortUrl: 'https://urlshorten.com/ghi654',
     clicks: 510,
   },
   {
     title: 'Developer Blog',
     originalUrl: 'https://devblog.com/why-use-typescript',
     shortUrl: 'https://urlshorten.com/jkl987',
     clicks: 675,
   },
   {
     title: 'Fashion Store',
     originalUrl: 'https://fashionstore.com/summer-collection',
     shortUrl: 'https://urlshorten.com/mno876',
     clicks: 419,
   },
   {
     title: 'Movie Review',
     originalUrl: 'https://reviews.com/new-movie-release',
     shortUrl: 'https://urlshorten.com/pqr543',
     clicks: 283,
   },
   {
     title: 'Real Estate Listing',
     originalUrl: 'https://realestate.com/listing/house-for-sale',
     shortUrl: 'https://urlshorten.com/stu210',
     clicks: 589,
   },
   {
     title: 'Photography Tips',
     originalUrl: 'https://photo-tips.com/learn-landscape-photography',
     shortUrl: 'https://urlshorten.com/vwx123',
     clicks: 311,
   },
   {
     title: 'Freelance Job',
     originalUrl: 'https://jobs.com/apply/remote-developer',
     shortUrl: 'https://urlshorten.com/yz456',
     clicks: 187,
   },
   {
     title: 'Product Comparison',
     originalUrl: 'https://compareproducts.com/best-smartphones-2024',
     shortUrl: 'https://urlshorten.com/abc789',
     clicks: 444,
   },
   {
     title: 'Home Workout Plan',
     originalUrl: 'https://fitnessblog.com/30-day-home-workout',
     shortUrl: 'https://urlshorten.com/def654',
     clicks: 720,
   },
   {
     title: 'Design Portfolio',
     originalUrl: 'https://designportfolio.com/janedoe',
     shortUrl: 'https://urlshorten.com/ghi321',
     clicks: 329,
   },
   {
     title: 'SEO Guide',
     originalUrl: 'https://seoguide.com/2024-optimization-strategies',
     shortUrl: 'https://urlshorten.com/jkl012',
     clicks: 567,
   },
   {
     title: 'Recipe Collection',
     originalUrl: 'https://cookingblog.com/20-easy-recipes',
     shortUrl: 'https://urlshorten.com/mno345',
     clicks: 892,
   },
   {
     title: 'Travel Tips',
     originalUrl: 'https://traveltips.com/packing-guide',
     shortUrl: 'https://urlshorten.com/pqr678',
     clicks: 153,
   },
   {
     title: 'Gaming News',
     originalUrl: 'https://gamingnews.com/upcoming-releases',
     shortUrl: 'https://urlshorten.com/stu901',
     clicks: 788,
   },
   {
     title: 'Health and Wellness',
     originalUrl: 'https://wellnessblog.com/healthy-living-tips',
     shortUrl: 'https://urlshorten.com/vwx234',
     clicks: 477,
   },
   {
     title: 'Startup Guide',
     originalUrl: 'https://startupguide.com/launching-a-business',
     shortUrl: 'https://urlshorten.com/yz567',
     clicks: 399,
   },
   {
     title: 'Education Blog',
     originalUrl: 'https://educationblog.com/study-tips-for-students',
     shortUrl: 'https://urlshorten.com/abc890',
     clicks: 267,
   },
   {
     title: 'Book Summary',
     originalUrl: 'https://booksummary.com/top-10-business-books',
     shortUrl: 'https://urlshorten.com/def321',
     clicks: 182,
   },
   {
     title: 'Fashion Blog',
     originalUrl: 'https://fashionblog.com/how-to-style-outfits',
     shortUrl: 'https://urlshorten.com/ghi654',
     clicks: 234,
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
        <div
          className="w-full lg:pl-8 lg:pr-8 mt-2
        
        max-h-[63vh] overflow-y-auto "
        >
          <Table
            headers={headers}
            data={paginatedData}
            rowRenderer={rowRenderer}
            className="border"
            headerClassName="bg-primary-b text-secondary-b "
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
