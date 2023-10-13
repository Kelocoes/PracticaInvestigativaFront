import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Typography, Button } from '@mui/material';
import { useRequest } from '../../Api/ApiModel';
import Results from './Results';

export default function CameraCanvas(props) {
    const { setNumberOfCards, response, setResponse, setEmotions } = props;
    const webcamRef = useRef(null);
    const { getRecognition } = useRequest();

    const emotions = [
        { name: "Neutral", emoji: "😐" },
        { name: "Felicidad", emoji: "😄" },
        { name: "Sorpresa", emoji: "😲" },
        { name: "Tristeza", emoji: "😢" },
        { name: "Furia", emoji: "😡" },
        { name: "Miedo", emoji: "😨"}
    ];

    const captureImage = () => {
        try {
            const imageSrc = webcamRef.current.getScreenshot();
            const base64image = imageSrc.split(',')[1];
            getRecognition(base64image, setResponse);
        } catch (error) {
            console.log("No se pudo capturar la imagen");
        }
    }

    const generateRandomCards = () => {
        const randomCount = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
        const randomEmotions = Array.from({ length: randomCount }, () => {
            const randomIndex = Math.floor(Math.random() * emotions.length);
            return emotions[randomIndex];
        });
        setNumberOfCards(randomCount);
        setEmotions(randomEmotions)
    }

    useEffect(() => {
        const interval = setInterval(captureImage, 1000);

        return () => {
            clearInterval(interval);
        };
    },);

    return (
        <>
            <Typography variant="h3">
                Reconocimiento facial y de emociones
            </Typography>
            <div style={{ display: 'flex' }}>
                <Webcam
                    height= {425}
                    screenshotFormat="image/jpeg"
                    ref={webcamRef}
                    audio={false}
                    mirrored={true}
                    screenshotQuality={1}
                ></Webcam>
                {response &&
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <Results response={response}></Results>
                    </div>
                }
            </div>
            <div>
                <Button 
                    variant="contained" 
                    style={{ textTransform: 'none' }}
                    onClick={generateRandomCards}
                >
                    Generar cartas
                </Button>
            </div>
        </>
    );
}
