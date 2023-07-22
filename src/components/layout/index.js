import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css';
import { Header, SidebarItem, Loading } from '../../components';
import * as pageActions from '../../redux/selectMenuSidebarSlice';
import * as questionActions from '../../redux/questionSlice';
import { getQuestionData } from '../../utils/api/question-api';
import { useStateContext } from '../../contexts/contextProvider';

function Layout({ propchild }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.question.loading);

  useEffect(() => {
    dispatch(questionActions.setLoading(true));
    getQuestionData(dispatch)
      .then(() => {
        dispatch(questionActions.setLoading(false));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        dispatch(questionActions.setLoading(false));
      });
  }, [dispatch]);

  const { isActive, setIsActive } = useStateContext();

  const handleActiveSidebar = (idx, pane) => {
    setIsActive(idx);
    dispatch(pageActions.setActivePane(pane));
  };

  const user = JSON.parse(sessionStorage.getItem('user'));

  const dataSidebar = useSelector((state) => state.sidebar);
  return (
    <div className="layout">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Header />
          <div className="below-header">
            <div className="sidebar-menu">
              <span>Feed</span>
              {dataSidebar.map((_data, _idx) =>
                user && user.role === 'admin' ? (
                  <SidebarItem
                    data={_data}
                    key={_idx}
                    onClick={() => handleActiveSidebar(_data.id, _data.key)}
                    isActive={isActive}
                  />
                ) : (
                  _data.role === 'general' && (
                    <SidebarItem
                      data={_data}
                      key={_idx}
                      onClick={() => handleActiveSidebar(_data.id, _data.key)}
                      isActive={isActive}
                    />
                  )
                ),
              )}
            </div>
            <div className="content-container">
              <div>{propchild}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Layout.propTypes = {
  propchild: PropTypes.object,
};

export { Layout };
