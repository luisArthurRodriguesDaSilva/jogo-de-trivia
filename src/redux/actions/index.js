export const NEW_LOGIN = 'NEW_LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const CURRENT_TOKEN = 'CURRENT_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const REQUEST_QUESTION = 'REQUEST_QUESTION';
export const CURRENT_QUESTION = 'CURRENT_QUESTION';
export const FAILED_QUESTION = 'FAILED_QUESTION';

export const newLogin = (payLoad) => ({
  type: NEW_LOGIN,
  payLoad,
});

const requestToken = () => ({ type: REQUEST_TOKEN });
const currentToken = (tokenObj) => ({ type: CURRENT_TOKEN, tokenObj });
const failedRequest = (errorMsg) => ({ type: FAILED_REQUEST, errorMsg });

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());

  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(currentToken(data));
  } catch (erro) {
    dispatch(failedRequest(erro.message));
  }
};

const requestQuestion = () => ({ type: REQUEST_QUESTION });
const currentQuestion = (tokenObj) => ({ type: CURRENT_QUESTION, tokenObj });
const failedQuestion = (errorMsg) => ({ type: FAILED_QUESTION, errorMsg });

export const fetchQuestion = (token) => async (dispatch) => {
  dispatch(requestQuestion());

  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    dispatch(currentQuestion(data));
  } catch (erro) {
    dispatch(failedQuestion(erro.message));
  }
};
