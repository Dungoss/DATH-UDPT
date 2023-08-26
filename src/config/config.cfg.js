// const configs = {
//   environment: process.env.NODE_ENV || 'development',
//   questionService: 'https://udpt-question-service.000webhostapp.com',
//   userSerivce: 'https://udpt-user-service.000webhostapp.com',
//   otherSerivce: 'https://udpt-other-service.000webhostapp.com',
//   originFrontend: 'http://localhost:3000',
// };

const configs = {
  environment: process.env.NODE_ENV || 'development',
  questionService: 'http://localhost:8001',
  userSerivce: 'http://localhost:8000',
  otherSerivce: 'http://localhost:8002',
  bonusSerivce: 'http://localhost:8003',
  originFrontend: 'http://localhost:3000',
  GPT_KEY: 'GPT01',
};

export default configs;
