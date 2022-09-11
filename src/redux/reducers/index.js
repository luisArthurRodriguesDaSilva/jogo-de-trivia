import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import questions from './questions';
import score from './score';
import player from './player';

const rootReducer = combineReducers({ user, token, questions, score, player });

export default rootReducer;
