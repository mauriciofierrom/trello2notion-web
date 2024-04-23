import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authgear from "@authgear/web";

async function init() {
  try {
    await authgear.configure({
      endpoint: "https://trello2notion.authgear.cloud",
      clientID: "123f6884f558297e",
      sessionType: "refresh_token"
    });
  } finally {
    ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    ).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

init().catch((e) => {
  console.error(e)
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
