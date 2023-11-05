import Carousel from 'react-bootstrap/Carousel';
import Flashcard from "./Flashcard";
import Button from "react-bootstrap/Button";
import {useState} from "react";

function Flashcards(props) {
    const [isQuiz,setIsQuiz]= useState(false)
    return (
        <div className='flashcards'>
            <Button>Go To the Quiz</Button>
            <h1 className='heading'>FlashCards:</h1>
        <Carousel interval={null}>
            {props.flashcards.map(flashcard => {return (<Carousel.Item><Flashcard question ={flashcard.question} answer={flashcard.answer} /></Carousel.Item>)})};
        </Carousel>
        </div>
    );
}

export default Flashcards;