import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

function TypingAnimation() {
  const [text, setText] = useState('');
  const fullText = 'Simplify Studying: \n Notes in, Flashcards and Quizzes out'; // The text you want to animate

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust the speed of typing animation (in milliseconds)

    return () => {
      clearInterval(typingInterval); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <>
    <Row>
        <Col className='heading'>{text}</Col>
    </Row>
    </>
  );
}

export default TypingAnimation;
