import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContextProvider from './UserProvider';
import Home from './home';
import Root from './root';
import AuthRedirect from './AuthRedirect';

function App() {

  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/auth-redirect" element={<AuthRedirect />}/>
          <Route element={<Root />}>
            <Route path="/" element={<Home/>}></Route>
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
