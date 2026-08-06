import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyApp from './pages/_app';
import IndexPage from './pages/index';

const AppEntry = () => {
  return (
    <Routes>
      <Route path="/" element={<MyApp Component={IndexPage} pageProps={{ chaptersResponse: { chapters: [] }, chaptersData: {} }} />} />
      <Route path="/*" element={<MyApp Component={() => <div>مرحباً بك في فلك - Falak Platform</div>} pageProps={{}} />} />
    </Routes>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <AppEntry />
      </BrowserRouter>
    </React.StrictMode>
  );
}
