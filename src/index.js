import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import PlayerOpenProvider from './context/PlayerOpenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerOpenProvider>
        <App />
      </PlayerOpenProvider>
    </BrowserRouter>
  </React.StrictMode>
);
