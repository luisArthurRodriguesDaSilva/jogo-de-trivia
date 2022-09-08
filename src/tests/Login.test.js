import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('login tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockReturnValue({
      json: jest.fn().mockReturnValue({}), 
    }); 
    renderWithRouterAndRedux(<App />);
  });

  it('verify if the play button is enabled and disabled as expected', ()=>{
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');
    const [validEmail, validName] = ['joaozinhoDoMinecraft@gmail.com', 'adimin4002'];

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput.value).toBe('');
    expect(nameInput.value).toBe('');
    expect(playBtn).toBeDisabled();

    userEvent.type(emailInput, validEmail);
    expect(emailInput.value).toBe(validEmail);
    expect(playBtn).toBeDisabled();

    userEvent.type(nameInput, validName);
    expect(nameInput.value).toBe(validName);
    expect(playBtn).toBeEnabled();

    userEvent.clear(emailInput);
    expect(playBtn).toBeDisabled();
    userEvent.clear(nameInput);
    expect(playBtn).toBeDisabled();
  });

  it('verify if the play button works as expected', )
});