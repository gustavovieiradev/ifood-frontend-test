import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const myEnv = dotenv.config();
dotenvExpand(myEnv);  

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
