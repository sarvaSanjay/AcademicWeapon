import '../App.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FlashCards from "./FlashCards";
import { useState, useEffect } from 'react';
import { read_from_image } from '../ocr';
function Home(){
    const [showGenerate, setShowGenerate] = useState(false);
    const [filename, setFilename] = useState('No file selected');
    const [file, setFile] = useState(null);
    const [showFlashCard,setFlashCard]=useState(false)
    const [sample,setSample]=useState(null)

    const handleFileUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*, application/pdf';
        input.onchange = (event) => {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setShowGenerate(true);
            setFilename(selectedFile.name);
            // Do something with the selected file
        };
        input.click();
    };

    const generateFlashcards = () => {
        const array_text = read_from_image(file).then(text => {
            console.log('Recognized text:', text);
            // You can use the recognized text here
          })
          .catch(error => {
            console.error('Recognition error:', error);
            });
    }
    return(
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
                    <Col> <Button color='#F6F6E9' size='lg' onClick={handleFileUpload}>Upload PDF/Image</Button></Col>
                    <Col> <Button color='#F6F6E9' size='lg'>Scan Notes</Button></Col>
                    <Col> <Button color='#F6F6E9' size='lg' className={showGenerate ? '' : 'hide'} onClick={showGenerate ? generateFlashcards : () => {}}>Generate</Button></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <div>
                    <p className={showGenerate ? 'text' : 'hide'}>
                        File Name: {filename}
                    </p>
                </div>
            </Container>
            <footer>
                   
            </footer>
        </div>
    )
}

export default Home;