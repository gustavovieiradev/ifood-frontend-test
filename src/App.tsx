import React from 'react';
import { ToastContainer } from 'react-toastify';

import Dashboard from './pages/Dashboard';

import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <Dashboard/>
    <GlobalStyles />
    <ToastContainer />
  </>
);

export default App;