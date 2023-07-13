import axios from 'axios';
import * as questionActions from '../../redux/questionSlice';

export const getQuestionData = async (dispatch) => {
  const response = await axios.get('http://localhost:8000/api/questions');
  console.log(response);
  dispatch(questionActions.setQuestion(response.data));
};
