import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockedTokenResponse from './helpers/mockedTokenResponse';
import {questionsResponse} from './helpers/mockedQuestionResponse'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

const [validEmail, validName] = ['joaozinhoDoMinecraft@gmail.com', 'adimin4002'];
const urlToTakeToken = "https://opentdb.com/api_token.php?command=request"
const sleep = ms => new Promise(r => setTimeout(r, ms)); // by https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep

const repeatFuncNTimes = async (func,times) => {
 for(let i = 0; i < times; i++) {
  await func();
 }
};

const loseQuestion = async () => {
  userEvent.click(screen.getByTestId('wrong-answer-0'));
  userEvent.click(screen.getByTestId('btn-next'));
};

const gainQuestion = async () => {
  await sleep(100);
  userEvent.click(screen.getByTestId('correct-answer'));
  userEvent.click(screen.getByTestId('btn-next'));
};

const generateScoreGame = async (gains) =>{
  const loses = 5 - gains;
  await repeatFuncNTimes(gainQuestion,gains);
  await repeatFuncNTimes(loseQuestion,loses);
};

describe('feedbacks page tests part1', ()=>{
  beforeEach(()=>{
    global.fetch = jest.fn((url) => {
      const mResponse = (url === urlToTakeToken) ? mockedTokenResponse : questionsResponse;
      return({
      json: jest.fn().mockReturnValue(mResponse),
    })});

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/game'],
      initialState: {
          user: {
            name: validName,
            email: validEmail,
          },
          token: {
            isFetching: false,
            tokenObj: {
              response_code: 0,
              response_message: 'Token Generated Successfully!',
              token: '84e0fce4b4d2966a83c6b52cad893076c434fd29d754a1c4b7ec3894c1c6d313'
            },
            error: ''
          },
      }
    });
  });

  it('verify if the feedback message is correct (lose case)', async () => {
    await generateScoreGame(1);
    expect(screen.getByTestId('feedback-text').textContent).toEqual('Could be better...')
  });

  it('verify if the feedback message is correct (winer case)', async () => {
    await generateScoreGame(3);
    expect(screen.getByTestId('feedback-text').textContent).toEqual('Well Done!')
  });

  it('verify if the user feedback data is in the document', async () => {
    await generateScoreGame(2);
    expect(screen.getByTestId('header-player-name').textContent).toBe(validName);
    expect(screen.getByTestId('feedback-total-score').textContent).toBe('140');
    expect(screen.getByTestId('feedback-total-question').textContent).toBe('2');
  });

  // it('verify if the ranking button works as expected', async () => {
  //   await generateScoreGame(1);
  //   const btnRanking = screen.getByTestId('btn-ranking');
  //   userEvent.click(btnRanking);
  //   expect(screen.getByTestId('ranking-title').textContent).toBe('Ranking');
  // });

});
/*
describe('feedback pages test part2',()=>{
  beforeEach(()=>{
    global.fetch = jest.fn().mockReturnValue({
      json: jest.fn().mockReturnValue(questionsResponse), 
    });
  });

  it('verify if the play again button work as expected', async ()=>{
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/game'],
      initialState: {
          user: {
            name: validName,
            email: validEmail,
          },
          token: {
            isFetching: false,
            tokenObj: {
              response_code: 0,
              response_message: 'Token Generated Successfully!',
              token: '84e0fce4b4d2966a83c6b52cad893076c434fd29d754a1c4b7ec3894c1c6d313'
            },
            error: ''
          },
      }
    });
    
    await generateScoreGame(1); // in the end it will be change
    userEvent.click(screen.getByTestId('btn-play-again'));

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');

    expect(playBtn).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    expect(store.getState().player).toEqual({score: 0 , assertions: 0});

    // aprender a trocar o mock de acordo com a chamada pra fzr a proxima parte
  });
}); */