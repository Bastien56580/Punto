import React from 'react';
import imageSrc from './regles.png';

// Code pour front de la page avec une intégration de l'image des règles.
function Rules() {
    return (
        <div>
            <div className="login-container">
                <h1 className="logo">
                    <span className="red">P</span>
                    <span className="blue">U</span>
                    <span className="yellow">N</span>
                    <span className="green">T</span>
                    <span className="red">O</span>
                </h1>
            </div>
            <div className={"rules"}>
            <img src={imageSrc} alt="Règle" />
            </div>
        </div>
    );
}

export default Rules;
