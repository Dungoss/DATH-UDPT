import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [detailQuestion, setDetailQuestion] = useState();
  const [detailProfile, setDetailProfile] = useState();
  const [data, setData] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);
  const [isImportModal, setIsImportModal] = useState(false);

  const [isActive, setIsActive] = useState(0);
  return (
    <StateContext.Provider
      value={{
        detailQuestion,
        setDetailQuestion,
        isActive,
        setIsActive,
        detailProfile,
        setDetailProfile,
        data,
        setData,
        openDetail,
        setOpenDetail,
        isModalWarningOpen,
        setIsModalWarningOpen,
        isImportModal,
        setIsImportModal,
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
