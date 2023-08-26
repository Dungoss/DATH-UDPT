import axios from 'axios';
import * as questionActions from '../../redux/questionSlice';

import configs from '../../config/config.cfg';
const user = JSON.parse(sessionStorage.getItem('user'));

export const getQuestionData = async (dispatch) => {
  dispatch(questionActions.setLoading(true));
  try {
    const response = await axios.get(`${configs.questionService}/api/questions`);
    dispatch(questionActions.setQuestion(response.data));

    const response4 = await axios.get(`${configs.otherSerivce}/api/tag`);
    dispatch(questionActions.setTags(response4.data));

    const response15 = await axios.get(`${configs.otherSerivce}/api/tag-cloud`);
    dispatch(questionActions.setTagCloud(response15.data));

    const response2 = await axios.get(`${configs.otherSerivce}/api/category`);
    dispatch(questionActions.setCategory(response2.data));

    if (user) {
      const response7 = await axios.get(`${configs.userSerivce}/api/users/${user.id}`);
      dispatch(questionActions.setUserDetail(response7.data));
    }

    dispatch(questionActions.setLoading(false));

    const response1 = await axios.get(`${configs.userSerivce}/api/users`);
    dispatch(questionActions.setUsers(response1.data));

    const response3 = await axios.get(`${configs.otherSerivce}/api/answers`);
    dispatch(questionActions.setAnswers(response3.data));

    const response12 = await axios.get(`${configs.otherSerivce}/api/comments`);
    dispatch(questionActions.setComments(response12.data));

    const response8 = await axios.get(`${configs.otherSerivce}/api/answers/monthly-ranking`);
    dispatch(questionActions.setAnswerRank(response8.data));

    const response9 = await axios.get(`${configs.questionService}/api/questions/monthly-ranking`);
    dispatch(questionActions.setQuestionRank(response9.data));

    const response13 = await axios.get(`${configs.questionService}/api/questions/treding-category`);
    dispatch(questionActions.setTrendingCate(response13.data));
    if (user) {
      const response5 = await axios.get(`${configs.userSerivce}/api/users/${user.id}/question-spam`);
      dispatch(questionActions.setSpams(response5.data));

      const response10 = await axios.get(`${configs.userSerivce}/api/users/${user.id}/question-star`);
      dispatch(questionActions.setVote(response10.data));

      const response6 = await axios.get(`${configs.userSerivce}/api/users/${user.id}/questions`);
      dispatch(questionActions.setQuestionUser(response6.data));

      const response11 = await axios.get(`${configs.userSerivce}/api/users/admin-email`);
      dispatch(questionActions.setAdminAccept(response11.data));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
