import Tesseract from 'tesseract.js';

export function read_from_image(image) {
    Tesseract.recognize(image, 'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        return [text];
    })
}