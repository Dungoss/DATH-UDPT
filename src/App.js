import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { Home, Category, QuestionManagement, Question, Topic, User, Signup, Login, Profile } from './pages';

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
      key: 'topic',
      render: <Topic />,
    },

    {
      key: 'user',
      render: <User />,
    },
    {
      key: 'category',
      render: <Category />,
    },
    {
      key: 'manage',
      render: <QuestionManagement />,
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
