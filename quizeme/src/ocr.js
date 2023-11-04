import Tesseract from 'tesseract.js';

function read_words(image) {
    Tesseract.recognize(image, 'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        console.log(text);
    })
}