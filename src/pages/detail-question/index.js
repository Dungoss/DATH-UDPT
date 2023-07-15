import React from 'react';

import './styles.css';
import { useStateContext } from '../../contexts/contextProvider';

const DetailQuestion = () => {
  const { detailQuestion } = useStateContext();
  console.log(detailQuestion);
  return (
    <div>
      <div className="question-detail">
        <div className="detail-content"></div>
        <div className="detail-trend"></div>
      </div>
      <span>hello</span>
    </div>
  );
};

export { DetailQuestion };
