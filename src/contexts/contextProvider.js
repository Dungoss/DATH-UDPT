import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [detailQuestion, setDetailQuestion] = useState();
  const [isActive, setIsActive] = useState(0);
  return (
    <StateContext.Provider
      value={{
        detailQuestion,
        setDetailQuestion,
        isActive,
        setIsActive,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.any,
};

export const useStateContext = () => useContext(StateContext);
