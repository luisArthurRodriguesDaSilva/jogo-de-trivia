import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockedTokenResponse from './helpers/mockedTokenResponse';
import {questionsResponse} from 'cypress/mocks/questions.js'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

const repeatFuncNTimes = (func,times) => {
 for(let i = 0; i < times; i++) {
  func();
 }
};

const doTheLogin = () => {
  const [validEmail, validName] = ['joaozinhoDoMinecraft@gmail.com', 'adimin4002'];
  const emailInput = screen.getByTestId('input-gravatar-email');
  const nameInput = screen.getByTestId('input-player-name');
  const playBtn = screen.getByTestId('btn-play');
  userEvent.type(emailInput, validEmail);
  userEvent.type(nameInput, validName);
  userEvent.click(playBtn);
};

const loseQuestion = () => {
  userEvent.click(screen.getByTestId(/(wrong-answer-)+[1-9]/));
  userEvent.click(screen.getByTestId('btn-next'));
};

const gainQuestion = () => {
  screen.getByTestId('correct-answer')
  userEvent.click(screen.getByTestId('btn-next'));
};

const generateScoreGame = (gains) =>{
  const loses = 5 - gains;
  repeatFuncNTimes(gainQuestion,gains);
  repeatFuncNTimes(loseQuestion,loses);
};

describe('feedbacks page tests', ()=>{
  beforeEach(()=>{
    global.fetch = jest.fn().mockReturnValue({
      json: jest.fn().mockReturnValue(mockedTokenResponse), 
    }); 
    renderWithRouterAndRedux(<App />);
    doTheLogin();
    global.fetch = jest.fn().mockReturnValue({
      json: jest.fn().mockReturnValue(questionsResponse), 
    });
  });

  it('',()=>{});
});