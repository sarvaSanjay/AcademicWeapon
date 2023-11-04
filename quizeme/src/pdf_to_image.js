import {convert} from "pdf-poppler"
async function convertPDFToImages(pdfPath, outputDir) {
    const options = {
        format: 'png',
        out_dir: outputDir,
        out_prefix: 'image'
    };

    try {
        const data = await convert(pdfPath, options);
        console.log('Images converted: ', data);
    } catch (error) {
    console.error('Error converting PDF to images:', error);

    }
}
convertPDFToImages('lab6_handout.pdf', './images')