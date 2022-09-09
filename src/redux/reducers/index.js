import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import questions from './questions';
import score from './score';

const rootReducer = combineReducers({ user, token, questions, score });

export default rootReducer;
