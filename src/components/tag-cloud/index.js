import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import configs from '../../config/config.cfg';
import * as pageActions from '../../redux/selectMenuSidebarSlice';
import * as questionActions from '../../redux/questionSlice';
import { useStateContext } from '../../contexts/contextProvider';
import './styles.css';

import TagCloud from 'TagCloud';
import { toLower } from 'lodash';

const TextShpere = () => {
  const dispatch = useDispatch();
  const tagData = useSelector((state) => state.question.tagData);
  const { setIsActive, setData } = useStateContext();
  let tag = [];

  const handleFilterByTag = async (value) => {
    dispatch(questionActions.setLoadingChild(true));
    const response = await axios.get(`${configs.questionService}/api/questions/search-tag?tagID="${value}"`);
    setData(response.data);
    dispatch(questionActions.setLoadingChild(false));
  };

  useEffect(() => {
    return () => {
      const container = '.tagcloud';
      tagData.map((data) => {
        tag.push(data.tagName);
      });

      const options = {
        radius: 230,
        maxSpeed: 'normal',
        initSpeed: 'normal',
        keep: true,
      };

      tag.length > 0 && TagCloud(container, tag, options);
      const tagcloudElement = document.querySelector(container);
      if (tagcloudElement !== null) {
        tagcloudElement.addEventListener('click', handleTagClick);

        return () => {
          tagcloudElement.removeEventListener('click', handleTagClick);
        };
      }
    };
  }, []);
  function handleTagClick(event) {
    const selectedTag = event.target.innerText;
    let a;
    tagData.map((data) => {
      if (data.tagName == toLower(selectedTag)) {
        a = data.tagID;
      }
    });
    handleFilterByTag(a);
    setIsActive(1);
    dispatch(pageActions.setActivePane('question'));
  }
  return (
    <>
      <div className="text-shpere">
        <span className="tagcloud"></span>
      </div>
    </>
  );
};

export { TextShpere };
