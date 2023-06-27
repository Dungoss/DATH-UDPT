import React, { useEffect } from 'react';

import './styles.css';

// Importing TagCloud package
import TagCloud from 'TagCloud';

const TextShpere = () => {
  // Animation settings for Text Cloud
  useEffect(() => {
    return () => {
      const container = '.tagcloud';
      const texts = [
        'HTML',
        'CSS',
        'SASS',
        'JavaScript',
        'React',
        'Vue',
        'Nuxt',
        'NodeJS',
        'Babel',
        'Jquery',
        'ES6',
        'GIT',
        'GITHUB',
      ];

      const options = {
        radius: 300,
        maxSpeed: 'normal',
        initSpeed: 'normal',
        keep: true,
      };

      TagCloud(container, texts, options);
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
    console.log('Clicked tag:', selectedTag);
    // Do something with the selected tag value
  }
  return (
    <>
      <div className="text-shpere">
        {/* span tag className must be "tagcloud"  */}
        <span className="tagcloud"></span>
      </div>
    </>
  );
};

export { TextShpere };
