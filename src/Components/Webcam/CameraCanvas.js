import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@mui/material';
import { useRequest } from '../../Api/ApiModel';
import JSONPretty from 'react-json-pretty';

export default function CameraCanvas() {
    const webcamRef = useRef(null);
    const { getRecognition } = useRequest();
    const [response, setResponse] = useState(null);

    const captureImage = () => {
        try {
            const imageSrc = webcamRef.current.getScreenshot();
            const base64image = imageSrc.split(',')[1];
            console.log("Imagen capturada");
            getRecognition(base64image, setResponse);
        } catch (error) {
            console.log("No se pudo capturar la imagen");
        }
    }

    useEffect(() => {
        const interval = setInterval(captureImage, 1000);

        return () => {
            clearInterval(interval);
        };
    },);

    return (
        <>
            <div>
                <Webcam
                    screenshotFormat="image/jpeg"
                    ref={webcamRef}
                    audio={false}
                    mirrored={true}
                    screenshotQuality={1}
                />
            </div>
            <Button onClick={captureImage}>Capturar foto</Button>
            <JSONPretty data={response}></JSONPretty>
        </>
    );
}
