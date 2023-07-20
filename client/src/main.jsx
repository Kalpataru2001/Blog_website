import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import { BlogContextProvider } from './context/BlogContext';
import Index from './Index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BlogContextProvider>
        <Index />
      </BlogContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
