import React, {useState, useEffect} from 'react';

import Modal from 'react-modal';

import './Board.css';

import LetterTile from './LetterTile';

function Board(props) {
    const [attemptedLetters, setAttemptedLetters] = useState([]);
    const [currentWord, setCurrentWord] = useState("");
    const [currentVisibleWord, setCurrentVisibleWord] = useState("");
    const [won, setWon] = useState(false);
    const [lost, setLost] = useState(false);
    const [failCount, setFailCount] = useState(0);
    const [modalIsOpen,setIsOpen] = React.useState(false);

    const [availableLetters, setAvailableLetters] = useState([
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", 
        "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ]);

    const availableWords = [
        "titanic",
        "bambi",
        "jaws",
        "batman",
        "cinderella",
        "up",
        "aladdin",
        "psycho",
        "goodfellas",
        "alien",
        "halloween",
        "rocky",
        "spaceballs",
        "poltergeist",
        "shrek",
        "inception",
        "speed",
        "predator"
    ]

    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal(){
        setIsOpen(false);
        window.location.reload(false);
      }

    useEffect(() => {
        let word = availableWords[Math.floor(Math.random() * availableWords.length)];
        setCurrentWord(word);
        let tempWord = "";
        for (let i = 0; i < word.length; i++) {
            if (word[i] == " ") {
                tempWord += " ";
            }
            else {
                tempWord += "_"
            }
        }
        console.log(tempWord);
        setCurrentVisibleWord(tempWord);
    }, [])

    const useLetter = (event) => {
        let currentLetter = event.target.innerText.toLowerCase();
        console.log("Current letter: " + currentLetter);
        setAttemptedLetters(attemptedLetters => [...attemptedLetters, currentLetter]);
        setAvailableLetters(availableLetters.filter(item => item !== currentLetter));

        if (currentWord.includes(currentLetter)) {
            let tempWord = currentVisibleWord;
            let indexes = [];
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] == currentLetter) {
                    indexes.push(i);
                }
            }
            for (let i = 0; i < indexes.length; i++) {
                tempWord = tempWord.replaceAt(indexes[i], currentLetter);
            }
            setCurrentVisibleWord(tempWord);
            if (!tempWord.includes("_")) {
                setWon(true);
                setIsOpen(true);
                console.log("Win!");
            }
        }
        else {
            // increment failures
            setFailCount(failCount + 1);
            if (failCount == 5) {
                setLost(true);
                setIsOpen(true);
                console.log("Lost!");
            }
        }
    }

    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          textAlign: "center"
        }
      };

  return (
      <div>
        <div className="Board">
            <div>
                <div className="ChosenLettersContainer">
                {
                    attemptedLetters.map((letter, key) => (
                        <p key={key} style={{fontSize: 30}}>{letter.toUpperCase()}</p>
                    ))
                }
                </div>
                <div className="AvailableLettersContainer">
            {
                availableLetters.map((letter, key) => (
                    <LetterTile key={key} getLetterMethod={useLetter} letter={letter.toUpperCase()} chosen={false} />
                ))
            }
        </div>
            </div>
            <div className="HangmanCharacter">
                <h1>Category: Movies</h1>
                <img className="hangmanImg" src={require(`./assets/img/${failCount}.png`)}/>
                <h1>{currentVisibleWord.toUpperCase()}</h1>
            </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
            {
                won ? <h1>You win!</h1> : <h1>You lost!</h1>
            }
            <br />
          <button onClick={closeModal}>Play Again?</button>
        </Modal>
    </div>
  );    
}

export default Board;
