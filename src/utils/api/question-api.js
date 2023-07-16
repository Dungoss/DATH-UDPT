import axios from 'axios';
import * as questionActions from '../../redux/questionSlice';

export const getQuestionData = async (dispatch) => {
  const response = await axios.get('http://localhost:8000/api/questions');
  dispatch(questionActions.setQuestion(response.data));

  const response1 = await axios.get(`http://localhost:8000/api/users`);
  dispatch(questionActions.setUsers(response1.data));

  const response2 = await axios.get(`http://localhost:8000/api/category`);
  dispatch(questionActions.setCategory(response2.data));

  const response3 = await axios.get(`http://localhost:8000/api/answers`);
  dispatch(questionActions.setAnswers(response3.data));
};
