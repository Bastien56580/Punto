import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import "./style.css";
import './App.css';
import {Link} from "react-router-dom";
//App.jsx
function App() {
    return (
        <div className="App">
            <main>
                <LoginPage />
            </main>
        </div>
    );
}


export default App;
