import '../App.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
function Home(){
    const [showGenerate, setShowGenerate] = useState(false);
    let file = null;
    const handleFileUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/pdf';
        input.onchange = (event) => {
            file = event.target.files[0];
            setShowGenerate(true);
            alert(`Selected file - ${file.name}`);
            // Do something with the selected file
        };
        input.click();
    };

    return(
        <div>
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
                    <Col> <Button color='#F6F6E9' size='lg'>Upload PDF</Button></Col>
                    <Col> <Button color='#F6F6E9' size='lg'>Scan Notes</Button></Col>
                    <Col> <Button color='#F6F6E9' size='lg' className={showGenerate ? 'show' : 'hide'}>Generate</Button></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
            <div>

            </div>
        </div>
    )
}

export default Home;