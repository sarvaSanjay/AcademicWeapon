import React, {Component, useState} from 'react';
import '../App.css';

import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam/>;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

const WebcamCapture = () => {
    const [image, setImage] = useState('');
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc);
        },
        [webcamRef]
    );

    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image === '' ? <Webcam

                    audio={false}

                    height={500}

                    ref={webcamRef}

                    screenshotFormat="image/jpeg"

                    width={600}

                    videoConstraints={videoConstraints}

                /> : <img src={image}/>}
            </div>
            <div className='btn-cam'>
                {image !== '' ?

                    <button onClick={(e) => {

                        e.preventDefault();

                        setImage('')

                    }}

                            className="webcam-btn">

                        Retake Image</button> :

                    <button onClick={(e) => {

                        e.preventDefault();

                        capture();

                    }}

                            className="webcam-btn">Capture</button>

                }
            </div>
        </div>
    );
};

export default WebcamCapture;