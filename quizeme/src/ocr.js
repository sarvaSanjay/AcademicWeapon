import Tesseract from 'tesseract.js';

export function read_from_image(image) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(image, 'eng', { logger: m => console.log(m) })
      .then(({ data: { text } }) => {
        resolve([text]); // Resolve the promise with the recognized text
      })
      .catch(error => {
        reject(error); // Reject the promise if an error occurs
      });
  });
}
