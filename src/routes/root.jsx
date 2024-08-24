// src/routes/root.jsx
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import CreateLinks from '../pages/CreateLinks';
import ManageLinks from '../pages/ManageLinks';
import Analytics from '../pages/Analytics';
import ProfileSettings from '../pages/ProfileSettings';
import Forgot from '../pages/Forgot';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';
import CreatePassword from '../pages/CreatePassword';
import AppPageLayout from '../layout/AppPageLayout';
import Dashboard from '../pages/Dashboard';
import SmartLinks from '../pages/SmartLinks';
import CreateQRCode from '../pages/CreateQRCode';
import Loader from '../components/Loader';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/services',
    element: <Services />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/login',
    element: <PublicRoute element={<Login />} />,
  },
  {
    path: '/signup',
    element: <PublicRoute element={<SignUp />} />,
  },
  {
    path: '/loader',
    element: <Loader />,
  },
  {
    path: '/forgot-password',
    element: <Forgot />,
  },
  {
    path: '/change-password',
    element: <CreatePassword />,
  },
  {
    path: '/app',
    element: <ProtectedRoute children={<AppPageLayout />} />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'create-link/:id',
        element: <CreateLinks />,
      },
      {
        path: 'create-link',
        element: <CreateLinks />,
      },
      {
        path: 'create-qrcodes',
        element: <CreateQRCode />,
      },
      {
        path: 'manage-links',
        element: <ManageLinks />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'profile-settings',
        element: <ProfileSettings />,
      },
      {
        path: 'create-smart-links',
        element: <SmartLinks />,
      },
      {
        path: 'create-smart-links/:id',
        element: <SmartLinks />,
      },
    ],
  },
]);

export default router;
