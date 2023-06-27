import React from 'react';

import './styles.css';
import { TextShpere } from '../../components';
// import { Slider1, Slider2 } from '../../utils/constants/img';

const Home = () => {
  // const sliderItems = [
  //   {
  //     url: Slider1,
  //     title: 'slider1',
  //   },
  //   {
  //     url: Slider2,
  //     title: 'slider1',
  //   },
  // ];
  // const containerStyles = {
  //   width: '500px',
  //   height: '280px',
  //   margin: '0 auto',
  // };
  return (
    <div className="home">
      <div className="word-cloud">
        <TextShpere />
      </div>
      <span>Popular Topic</span>
      <div className="popular-topic">
        <div className="topic"></div>
        <div className="topic"></div>
        <div className="topic"></div>
        <div className="topic"></div>
      </div>
    </div>
  );
};

export { Home };
