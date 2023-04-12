import React, {useState} from 'react';
import '../style.css';
import card1 from '../images/bleu/1_blue.jpg';
import card2 from '../images/bleu/2_blue.jpg';
import card3 from '../images/bleu/3_blue.jpg';
import card4 from '../images/bleu/4_blue.jpg';
import card5 from '../images/bleu/5_blue.jpg';
import card6 from '../images/bleu/6_blue.jpg';
import card7 from '../images/bleu/7_blue.jpg';
import card8 from '../images/bleu/8_blue.jpg';
import card9 from '../images/bleu/9_blue.jpg';
import card10 from '../images/jaune/1_yellow.jpg';
import card11 from '../images/jaune/2_yellow.jpg';
import card12 from '../images/jaune/3_yellow.jpg';
import card13 from '../images/jaune/4_yellow.jpg';
import card14 from '../images/jaune/5_yellow.jpg';
import card15 from '../images/jaune/6_yellow.jpg';
import card16 from '../images/jaune/7_yellow.jpg';
import card17 from '../images/jaune/8_yellow.jpg';
import card18 from '../images/jaune/9_yellow.jpg';
import card19 from '../images/rouge/1_red.jpg';
import card20 from '../images/rouge/2_red.jpg';
import card21 from '../images/rouge/3_red.jpg';
import card22 from '../images/rouge/4_red.jpg';
import card23 from '../images/rouge/5_red.jpg';
import card24 from '../images/rouge/6_red.jpg';
import card25 from '../images/rouge/7_red.jpg';
import card26 from '../images/rouge/8_red.jpg';
import card27 from '../images/rouge/9_red.jpg';
import card28 from '../images/vert/1_green.jpg';
import card29 from '../images/vert/2_green.jpg';
import card30 from '../images/vert/3_green.jpg';
import card31 from '../images/vert/4_green.jpg';
import card32 from '../images/vert/5_green.jpg';
import card33 from '../images/vert/6_green.jpg';
import card34 from '../images/vert/7_green.jpg';
import card35 from '../images/vert/8_green.jpg';
import card36 from '../images/vert/9_green.jpg';
import {Link} from "react-router-dom";
import {Case} from "./Case";

// Import des autres images de cartes

function Game() {
    const [grid, setGrid] = useState([]);

    const handleClick = (row, col) => {
        // Fonction qui sera appelée lorsque l'on cliquera sur une carte
        // Elle sera à adapter en fonction de ce que tu souhaites faire
    };

    const renderCard = (row, col) => {
        // Fonction qui permet de rendre une carte à une position donnée
        // Ici, on choisit la carte à afficher en fonction de la position
        let card = card1;
        if (row === 1 && col === 1) {
            card = card2;
        }
        // On retourne la carte avec les propriétés CSS pour qu'elle s'affiche au bon endroit
        return (
            <img
                key={`${row}-${col}`}
                className="card"
                src={card}
                alt={`Card at (${row}, ${col})`}
                style={{top: `${row * 100}px`, left: `${col * 100}px`}}
                onClick={() => handleClick(row, col)}
            />
        );
    };

    const renderGrid = () => {
        // Fonction qui permet de rendre la grille de cartes
        // On part de la position (-3, -3) pour avoir les cases centrées sur l'écran
        let rows = [];
        for (let i = -3; i <= 3; i++) {
            let cols = [];
            for (let j = -3; j <= 3; j++) {
                cols.push(renderCard(i, j));
            }
            rows.push(<div key={`row-${i}`} className="card-row">{cols}</div>);
        }
        // On retourne la grille avec les propriétés CSS pour qu'elle s'affiche au bon endroit
        return (
            <div className="grid" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                {rows}
            </div>
        );
    };
//Permet de faire apparaitre la grille + des cartes aléatoires

    const board = [];
    const randomNumber1 = Math.floor(Math.random() * 36) + 1;
    const randomNumber2 = Math.floor(Math.random() * 36) + 1;
    const randomNumber3 = Math.floor(Math.random() * 36) + 1;

    for (let y = 0; y < 11; y++) {
        const row = [];
        for (let x = 0; x < 11; x++) {
            if (x == 5 && y == 5) {
                row.push(
                    <Case key={`${x}-${y}`}>
                        <img src={randomNumber1 <= 9 ? eval(`card${randomNumber1}`) : eval(`card${randomNumber2}`)} alt="description of image" style={{width: '100%'}} />
                    </Case>
                );
            } else if (x == 6 && y == 6) {
                row.push(
                    <Case key={`${x}-${y}`}>
                        <img src={randomNumber2 <= 9 ? eval(`card${randomNumber2}`) : eval(`card${randomNumber1}`)} alt="description of image" style={{width: '100%'}} />
                    </Case>
                );
            } else if (x == 5 && y == 7) {
                row.push(
                    <Case key={`${x}-${y}`}>
                        <img src={randomNumber3 <= 9 ? eval(`card${randomNumber1}`) : eval(`card${randomNumber3}`)} alt="description of image" style={{width: '100%'}} />
                    </Case>
                );
            } else {
                row.push(<Case key={`${x}-${y}`}/>);
            }
        }
        board.push(<div className="row" key={y}>{row}</div>);
    }


    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1 className="Punto">
                    <span className="red">P</span>
                    <span className="blue">U</span>
                    <span className="yellow">N</span>
                    <span className="green">T</span>
                    <span className="red">O</span>
                </h1>
                <div style={{display: 'flex', justifyContent: 'start'}}>
                    <Link to={"/rules"}>
                        <button type="button" className="regles-button" style={{marginLeft: '1rem'}}>
                            Règles du jeu
                        </button>
                    </Link>
                    <h5></h5>
                    <Link to={"/lobby"}>
                        <button type="button" className="lobby-button" style={{marginLeft: '1rem'}}>
                            Lobby
                        </button>
                    </Link>
                    <h5></h5>
                    <Link to={"/"}>
                        <button type="button" className="logout-button" style={{marginLeft: '1rem'}}>
                            Déconnexion
                        </button>
                    </Link>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {board}
            </div>


        </div>

    );
}

export default Game;
