import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

// Importing TagCloud package
import TagCloud from 'TagCloud';

const TextShpere = () => {
  // Animation settings for Text Cloud
  const tagData = useSelector((state) => state.question.tagData);
  let tag = [];
  console.log(tag);
  useEffect(() => {
    return () => {
      const container = '.tagcloud';
      tagData.map((data, idx) => {
        if (idx < 25) tag.push(data.tagName);
      });

      const options = {
        radius: 300,
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
  }, [tagData]);
  function handleTagClick(event) {
    const selectedTag = event.target.innerText;
    console.log('Clicked tag:', selectedTag);
    // Do something with the selected tag value
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
