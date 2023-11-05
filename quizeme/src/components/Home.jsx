import '../App.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FlashCards from "./FlashCards";
import Quiz from "./Quiz";
import TypingAnimation from './TypingAnimation';
import WebcamCapture from "./WebcamCapture";
import { useState, useEffect } from 'react';
import { read_from_image } from '../ocr';


function Home(){
    const [showGenerate, setShowGenerate] = useState(false);
    const [filename, setFilename] = useState('No file selected');
    const [file, setFile] = useState(null);
    const [showState, setShowState] = useState(0);
    const [sample,setSample]=useState(null)
    const [text, setText] = useState('');

    const [flashcards, setFlashcards] = useState([]);
    const [quiz, setQuiz] = useState([{
                question: 'Question?',
                optionA: 'A',
                optionB: 'B',
                optionC:  'C',
                optionD: 'D',
                answer: 'C'
            }]);

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
            // Create a new FormData object
            alert('Uploading file...');
            const formData = new FormData();

            // Append the file to the form data object
            formData.append('file', selectedFile); // 'file' is the name of the field that the server expects
            console.log(formData);
            // Make a POST request with the FormData
            fetch('https://uofthacks.pythonanywhere.com/ocr', {
              method: 'POST',
              body: formData,
            })
              .then((response) => {
                if (response.ok) {
                   return response.json();
                } else {
                  throw new Error('File upload failed');
                }
              })
              .then((data) => {
                // Handle the response data
                setText(data); alert('File uploaded successfully')
              })
              .catch((error) => {
                // Handle errors
                console.error(error);
              });

            };
            input.click();

        };
    
    const generateFlashcards = () => {
        const data = text.text;
        fetch('https://uofthacks.pythonanywhere.com/flashcards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // You can add additional headers here if needed
              },
            body: JSON.stringify({'text': data}), // Convert the data to JSON string
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              response.json().then((data) => {
                console.log(data);
                setFlashcards(data);
                setShowState(1);
              });
            })
            .then((responseData) => {
              console.log('POST request successful:', responseData);
            })
            .catch((error) => {
              console.error('POST request error:', error);
            });
        
    }
        
    const generateQuiz = () => {
      const data = text.text;  
      fetch('https://uofthacks.pythonanywhere.com/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // You can add additional headers here if needed
              },
            body: JSON.stringify({'text': data}), // Convert the data to JSON string
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              response.json().then((data) => {
                console.log(data);
                setQuiz(data);
                setShowState(2);
              });
            })
            .then((responseData) => {
              console.log('POST request successful:', responseData);
            })
            .catch((error) => {
              console.error('POST request error:', error);
            });
        
    }

    const handleScan = () => {
        setShowState(3);
    }

    switch(showState){
        case 0:
            return (
                <div className='home'>
                    <div>
                        <Navbar className="navbar">
                            <Container>
                                <Navbar.Brand className='brand' size='lg'>Academic Weapon</Navbar.Brand>
                            </Container>
                        </Navbar>
                    </div>
                    <Container>
                        <TypingAnimation/>
                        <Row className = 'align-items-center'>
                            <Col className='sub-heading'> UPLOAD NOTES BELOW</Col>
                        </Row>
                        <Row className='buttons'>
                            <Col> <Button color='#F6F6E9' size='lg' className={showGenerate ? '' : 'hide'} onClick={showGenerate ? generateFlashcards : () => {}}>Generate FlashCards</Button></Col>
                            <Col> <Button color='#F6F6E9' size='lg' onClick={handleFileUpload}>Upload PDF/Image</Button></Col>
                            <Col> <Button color='#F6F6E9' size='lg' onClick={handleScan}>Scan Notes</Button></Col>
                            <Col> <Button color='#F6F6E9' size='lg' className={showGenerate ? '' : 'hide'} onClick={showGenerate ? generateQuiz : () => {}}>Generate Quiz</Button></Col>
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
            );
        case 1:
            return <FlashCards flashcards={flashcards}/>;
        case 2:
            return <Quiz quiz={quiz}/>;
        case 3:
            return <WebcamCapture/>;
        default:
            return null;
    }
            
}

export default Home;