import { ADD_PLAYER_SCORE } from '../actions';

const dez = 10;

const INITIAL_STATE = {
  score: 0,
};

const converterDificultData = { hard: 3, medium: 2, easy: 1 };

const convertedDificult = (dif) => converterDificultData[dif];

const player = (state = INITIAL_STATE, action) => {
  const { score } = state;
  const { time, dificulty } = action;
  switch (action.type) {
  case ADD_PLAYER_SCORE:
    return { score: score + dez + (time * convertedDificult(dificulty)) };
  default:
    return state;
  }
};

export default player;
