import React, { useCallback, useContext } from 'react';
import authgear from '@authgear/web';
import { UserContext } from './UserProvider';
import Login from './login';

const Home: React.FC = () => {
  const { isLoggedIn, email } = useContext(UserContext)
  const { REACT_APP_BASE_URL } = process.env

  const logout = useCallback(() => {
    authgear
      .logout({
        redirectURI: `${REACT_APP_BASE_URL}/`,
      })
      .then(
        () => {
          console.log("logged out")
        },
        (err) => {
          console.error(err);
        }
    );
  }, [REACT_APP_BASE_URL]);

  return (isLoggedIn ?
  <>
    <div className="container columns">
      <div className="column">
        {email}
        <button className="button is-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>

    <div className="container columns">
      <div className="column"/>
    <div className="column">
      <i className="bi-markdown"></i><p>Markdown</p>
    </div>
    <div className="column">
      <i className="bi-markdown"></i><p>Notion</p>
    </div>
    <div className="column"/>
    </div>
  </> : <Login/>
  );
}

export default Home;
