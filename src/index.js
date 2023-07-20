import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Results from './results/Results';
import Home from './home/Home';
import Settings from './settings/Settings';
import Quiz from './game/quiz/Quiz';
import SubmittedGame from './game/submittedGame';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: 'previous-games/',
        element: <Results />,
      },
      {
        // dynamic path - will receive game id (note :)
        path: "previous-games/:gameId",
        element: <SubmittedGame />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
