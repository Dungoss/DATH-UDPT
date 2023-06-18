import React from 'react';

import { Slider } from '../../components';
import { Slider1, Slider2 } from '../../utils/constants/img';

const Home = () => {
  const sliderItems = [
    {
      url: Slider1,
      title: 'slider1',
    },
    {
      url: Slider2,
      title: 'slider1',
    },
  ];
  const containerStyles = {
    width: '500px',
    height: '280px',
    margin: '0 auto',
  };
  return (
    <div>
      <div style={containerStyles}>
        <Slider slides={sliderItems} parentWidth={500} />
      </div>
    </div>
  );
};

export { Home };
