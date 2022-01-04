import {useState} from 'react';
import Output from './Output';

const Greeting = () => {
    const [changedText,setChangedText]=useState(false);

    const changeTextHandler = () => {
        setChangedText(true);
    }

    return (
        <div>
            <h2>Hello World!</h2>
            {!changedText && <Output>It's good to see you!</Output>}
            {changedText && <p>Change!</p>}
            <button onClick={changeTextHandler}>Change text!</button>
        </div>
    )
}

export default Greeting;

// testy stale funguji, i kdyz nahradime <p> tim <Output>
// ten render v testech vyrenderuje i ty komponenty vlozene do te nasi hlavni komponenty (zde nas Output)
