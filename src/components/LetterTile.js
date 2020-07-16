import React, {useState} from 'react';
import './LetterTile.css';


// green: #4bbf6a
// red: #bf4b4b
function LetterTile(props) {



    return (
    <a onClick={props.getLetterMethod} className="LetterTile">
        <p>
            {props.letter.toUpperCase()}
        </p>
    </a>
  );
}

export default LetterTile;

//props.chosen ? {fontSize: 20} : {},
//props.exists ? {backgroundColor: "#bfb4b"} : {backgroundColor: "#4bbf6a"}