import { USER_SCORE } from '../actions';

const INITIAL_STATE = {
  totalHits: 0,
};

const score = (state = INITIAL_STATE, { type, payLoad }) => {
  switch (type) {
  case USER_SCORE:
    return {
      ...state,
      totalHits: payLoad,
    };
  default:
    return state;
  }
};

export default score;
