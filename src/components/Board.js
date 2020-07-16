import React, {useState, useEffect} from 'react';

import './Board.css';

import LetterTile from './LetterTile';

function Board(props) {
    const [attemptedLetters, setAttemptedLetters] = useState([]);
    const [currentWord, setCurrentWord] = useState("");
    const [currentVisibleWord, setCurrentVisibleWord] = useState("");

    const [availableLetters, setAvailableLetters] = useState([
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", 
        "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ]);

    const availableWords = [
        "TestWord1",
        "Test Word 2"
    ]

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

    const getLetter = (event) => {
        let currentLetter = event.target.innerText;
        setAttemptedLetters(attemptedLetters => [...attemptedLetters, currentLetter]);
        setAvailableLetters(availableLetters.filter(item => item !== currentLetter.toLowerCase()));

        // Check if letter in word
        if (currentWord.includes(currentLetter)) {
            let tempWord = "";
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] == currentLetter) {
                    tempWord += currentLetter;
                }
                else if (currentWord[i] == " ") {
                    tempWord += " ";
                }
                else {
                    tempWord += "_";
                }
            }
            setCurrentVisibleWord(tempWord);
        }
    }

  return (
      <div>
        <div className="Board">
            <div className="ChosenLettersContainer">
                {
                    attemptedLetters.map((letter, key) => (
                        <p key={key} style={{fontSize: 30}}>{letter}</p>
                    ))
                }
            </div>
            <div className="HangmanCharacter">
                <img src="https://via.placeholder.com/400" />
                <h1>{currentVisibleWord}</h1>
            </div>
        </div>
        <div className="AvailableLettersContainer">
            {
                availableLetters.map((letter, key) => (
                    <LetterTile key={key} getLetterMethod={getLetter} letter={letter} chosen={false} />
                ))
            }
        </div>
    </div>
  );    
}

export default Board;
