import React from 'react';

import './styles.css';
import { Layout } from '../../components';

const DetailQuestion = () => {
  return (
    <div>
      <Layout
        propchild={
          <div className="question-detail">
            <div className="detail-content"></div>
            <div className="detail-trend"></div>
          </div>
        }
      />
    </div>
  );
};

export { DetailQuestion };
