import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { Home, Popular, Signup, Login } from './pages';

const App = () => {
  const dataSelectPage = useSelector((state) => state.page.activePane);
  const tabPanes = [
    {
      key: 'home',
      render: <Home />,
    },
    {
      key: 'popular',
      render: <Popular />,
    },
  ];
  const displayPage = tabPanes.find((_page) => _page.key === dataSelectPage);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout propchild={displayPage.render} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
