import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "./UserProvider";
import Home from "./home";
import Root from "./root";
import AuthRedirect from "./AuthRedirect";
import { Markdown } from "./markdown";
import { Notion } from "./notion";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/auth-redirect" element={<AuthRedirect />} />
          <Route element={<Root />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/markdown" element={<Markdown />}></Route>
            <Route path="/notion" element={<Notion />}></Route>
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
