import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router';
import { ThemeProvider } from 'react-bootstrap';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider>
    <React.StrictMode>
    <Router />
  </React.StrictMode>
  </ThemeProvider>
  
);


