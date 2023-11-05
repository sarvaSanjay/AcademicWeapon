import { usePDF } from 'react-to-pdf';

const Export = (props) => {
    const { toPDF, targetRef } = usePDF({filename: 'file.pdf'});
    return (
        <div className='export'>
            <button onClick={() => toPDF()}>Export as PDF</button>
            <div ref={targetRef} className='hide'>
                Helloooo
            </div>
        </div>
    )
}

export default Export;