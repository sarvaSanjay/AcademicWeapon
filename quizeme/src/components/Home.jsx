import '../App.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FlashCards from "./FlashCards";
import Flashcards from "./FlashCards";
import {useState} from "react";

function Home(){

    const [generated,setGenerated]=useState(false)
    const [sample,setSample]=useState(null)
    function handleClick(){
        setGenerated(!generated)
        const SAMPLE= [{question:"Hi",answer:"1"},{question:"Bye",answer:"2"}]
    setSample(SAMPLE)
    }
    return (
        generated ? (
            <FlashCards flashcards={sample} />
        ) : (
            <div className='home'>
                <div>
                    <Navbar className="navbar">
                        <Container>
                            <Navbar.Brand className='brand' size='lg'>QuizMe</Navbar.Brand>
                        </Container>
                    </Navbar>
                </div>
                <Container>
                    <Row>
                        <Col className='heading'>SIMPLIFY STUDYING:</Col>
                    </Row>
                    <Row className='heading-2'>
                        <Col>NOTES IN, FLASHCARDS OUT</Col>
                    </Row>
                    <Row>
                        <Col className='sub-heading'> UPLOAD NOTES BELOW</Col>
                        <Col></Col>
                    </Row>
                    <Row className='buttons'>
                        <Col> <Button size='lg'>Upload PDF</Button></Col>
                        <Col> <a href='/webcam'><Button size='lg'>Scan Notes</Button></a></Col>
                        <Col><Button size='lg' onClick={handleClick}>generated</Button></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Container>
                <footer></footer>
            </div>
        )
    );

}

export default Home;