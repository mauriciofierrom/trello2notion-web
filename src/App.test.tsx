import { render, screen } from '@testing-library/react';
import App from './App';
import { UserContext } from './UserProvider';
import Home from './home';

test('renders Title', () => {
  render(<App />);
  const titleElement = screen.getByText(/trello2notion/i);
  expect(titleElement).toBeInTheDocument();
});

test('contains footer with copyright notice', () => {
  render(<App/>);
  const copyrightElement = screen.getByText(/Copyright/i);
  expect(copyrightElement).toBeInTheDocument();
})

describe('with a logged in user', () => {
  test('shows the email of the logged in user', () => {
    render(
      <UserContext.Provider value={{ isLoggedIn: true, email: 'some@some.com'}}>
        <Home/>
      </UserContext.Provider>
    );
    const email = screen.getByText(/some@some.com/i);
    expect(email).toBeInTheDocument();
  })

  test('shows the logout link', () => {
    render(
      <UserContext.Provider value={{ isLoggedIn: true, email: 'some@some.com'}}>
        <Home/>
      </UserContext.Provider>
    );

    screen.getByRole('button', { name: /logout/i });
  })
})
