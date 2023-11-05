import Carousel from 'react-bootstrap/Carousel';
import Flashcard from "./Flashcard";

function Flashcards(props) {
    return (
        <div className='flashcards'>
            <h1 className='heading'>FlashCards:</h1>
        <Carousel interval={null}>
            {props.flashcards.map(flashcard => {return (<Carousel.Item><Flashcard question ={flashcard.question} answer={flashcard.answer} /></Carousel.Item>)})};
        </Carousel>
        </div>
    );
}

export default Flashcards;