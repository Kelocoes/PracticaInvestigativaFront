import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Typography, Button } from '@mui/material';
import { useRequest } from '../../Api/ApiModel';

export default function CameraCanvas() {
    const webcamRef = useRef(null);
    const { getRecognition } = useRequest();
    const [response, setResponse] = useState(null);

    const captureImage = () => {
        try {
            const imageSrc = webcamRef.current.getScreenshot();
            const base64image = imageSrc.split(',')[1];
            getRecognition(base64image, setResponse);
        } catch (error) {
            console.log("No se pudo capturar la imagen");
        }
    }

    useEffect(() => {
        const interval = setInterval(captureImage, 10000);

        return () => {
            clearInterval(interval);
        };
    },);

    return (
        <>
            <div>
                <Webcam
                    height= {400}
                    screenshotFormat="image/jpeg"
                    ref={webcamRef}
                    audio={false}
                    mirrored={true}
                    screenshotQuality={1}
                />
            </div>
            {response &&
                <div>
                    <Typography variant="h6">
                        Resultados de reconocimiento facial
                    </Typography>
                    <Typography>
                        Edad: {response.InsightFaceResults.age}
                        <br />
                        Sexo: {response.InsightFaceResults.gender}
                        <br />
                        Puntaje: {response.InsightFaceResults.score}
                    </Typography>
                    <Typography variant="h6">
                        Resultados de reconocimiento de emociones
                    </Typography>
                    <Typography>
                        Emociones: {response.EmotionResults.Emotions[0]} { }
                        {response.EmotionResults.Emotions[1]} 
                        <br />
                        Puntajes: {response.EmotionResults.Scores[0]} { }
                        {response.EmotionResults.Scores[1]} 
                    </Typography>
                    <Button variant="contained" style={{ textTransform: 'none' }}>
                        Generar cartas
                    </Button>
                </div>
            }
        </>
    );
}
