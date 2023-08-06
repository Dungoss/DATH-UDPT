import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { Home, Category, QuestionManagement, Question, User, Ranking, Signup, Login, Profile } from './pages';

const App = () => {
  const dataSelectPage = useSelector((state) => state.page.activePane);
  const tabPanes = [
    {
      key: 'home',
      render: <Home />,
    },
    {
      key: 'question',
      render: <Question />,
    },
    {
      key: 'user',
      render: <User />,
    },
    {
      key: 'ranking',
      render: <Ranking />,
    },
    {
      key: 'category',
      render: <Category />,
    },
    {
      key: 'manage',
      render: <QuestionManagement />,
    },
    {
      key: 'profile',
      render: <Profile />,
    },
  ];
  const displayPage = tabPanes.find((_page) => _page.key === dataSelectPage);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Layout propchild={displayPage.render} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
