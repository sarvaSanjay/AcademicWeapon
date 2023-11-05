import Carousel from 'react-bootstrap/Carousel';
import Flashcard from "./Flashcard";
import Button from "react-bootstrap/Button";
import '../App.css'
import {useState} from "react";

function Flashcards(props) {
    const [isQuiz,setIsQuiz]= useState(false)
    return (
        <div className='flashcards'>
            <a href = '/'><Button>Back To Home</Button></a>
            <h1 className='heading'>FlashCards:</h1>
        <Carousel interval={null}>
            {props.flashcards.map(flashcard => {return (<Carousel.Item><Flashcard question ={flashcard.question} answer={flashcard.answer} /></Carousel.Item>)})};
        </Carousel>
        </div>
    );
}

export default Flashcards;