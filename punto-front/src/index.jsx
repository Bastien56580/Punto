import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Router} from "react-router-dom";
import {render} from "react-dom";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Root from "./routes/root";
import "./style.css";
import LoginPage from "./components/LoginPage";
import Game from "./components/Game";
import Rules from "./components/Rules";
import Account from "./components/Account";
import SignIn from "./components/SignIn";
import Lobby from "./components/Lobby";
const router = createBrowserRouter([
    //Routes qui se font : path : lien pour accéder à la page
    // element : page affichée
    {
        path: "/",
        element: <LoginPage />,

    },
    {
        path: "signin",
        element: <SignIn/>,
    },
    {
        path: "/game",
        element: <Game/>,
    },

    {
        path: "/rules",
        element: <Rules/>,
    },

    {
        path: "/account",
        element: <Account/>,
    },

    {
        path: "/lobby",
        element: <Lobby/>,
    }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
/*ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);*/


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();