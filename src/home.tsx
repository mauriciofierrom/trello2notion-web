import React, { useCallback, useContext } from 'react';
import authgear from '@authgear/web';
import { UserContext } from './UserProvider';
import Login from './login';

const Home: React.FC = () => {
  const { isLoggedIn, email } = useContext(UserContext)

  const logout = useCallback(() => {
    authgear
      .logout({
        redirectURI: "http://localhost:4000/",
      })
      .then(
        () => {
          console.log("logged out")
        },
        (err) => {
          console.error(err);
        }
    );
  }, []);

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
