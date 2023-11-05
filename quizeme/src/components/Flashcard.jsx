import {useState} from "react";
import '../App.css'
function Flashcard(props){
  const [isFlipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(!isFlipped);
  };

  return (
      <div className='flashcard'>
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>


          {isFlipped?<div className="card-back">
              {props.answer}
          </div>:<div className="card-front">
              {props.question}
          </div>}
      </div>
      </div>
  );
  }

export default Flashcard;