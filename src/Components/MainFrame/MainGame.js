import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Typography, Button } from '@mui/material';
import { useRequest } from '../../Api/ApiModel';
import Results from './Results';
import CardList from '../CardList/CardList';
import Grid from '@mui/material/Grid';

export default function MainGame() {
    const webcamRef = useRef(null);
    const { getRecognition } = useRequest();
    const [randomCount, setRandomCount] = useState(3);
    const [response, setResponse] = useState(null)
    const [emotions, setEmotions] = useState([])

    const emotionsPool = [
        { name: "Neutral", emoji: "😐", probability: 0.05 },
        { name: "Felicidad", emoji: "😄", probability: 0.2 },
        { name: "Sorpresa", emoji: "😲", probability: 0.2 },
        { name: "Tristeza", emoji: "😢", probability: 0.25 },
        { name: "Furia", emoji: "😡", probability: 0.2 },
        { name: "Miedo", emoji: "😨", probability: 0.1 }
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

    const getRandomEmotion = () => {
        const rand = Math.random();
        let cumulativeProbability = 0;

        for (const emotion of emotionsPool) {
            cumulativeProbability += emotion.probability;
            if (rand <= cumulativeProbability) {
                return emotion;
            }
        }
    }

    const generateRandomCards = () => {
        setRandomCount(prevState => prevState + 1);
        const randomEmotions = [];
        for (let i = 0; i < randomCount; i++) {
            const randomEmotion = getRandomEmotion();
            randomEmotions.push(randomEmotion);
        };
        setEmotions(randomEmotions)
    }

    useEffect(() => {
        const interval = setInterval(captureImage, 1000);

        return () => {
            clearInterval(interval);
        };
    },);

    return (
        <Grid container spacing={2} sx={{ paddingX: 10, paddingY: 5 }}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    Reconocimiento facial y de emociones
                </Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={12} md={12} lg={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Webcam
                    height={400}
                    screenshotFormat="image/jpeg"
                    ref={webcamRef}
                    audio={false}
                    mirrored={true}
                    screenshotQuality={1}
                ></Webcam>
            </Grid>
            <Grid item xs={12} md={12} lg={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {response &&
                    <Results response={response}></Results>
                }
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    style={{ textTransform: 'none' }}
                    onClick={generateRandomCards}
                >
                    Iniciar el juego
                </Button>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardList response={response} emotions={emotions} />
            </Grid>
        </Grid>
    );
}
