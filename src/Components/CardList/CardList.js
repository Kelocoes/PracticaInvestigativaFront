import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Cardlist(props) {
    const { response, emotions } = props
    const [selectedEmotion, setSelectedEmotion] = useState(0)

    const cards = emotions.map((emotion, index) => (
        <Grid item key={index}>
            <Card style={{ backgroundColor: selectedEmotion === index ? 'lightgreen' : 'white'}}>
                <CardContent>
                    <Typography variant="h2">{emotion["emoji"]}</Typography>
                </CardContent>
            </Card>
        </Grid>
    ));

    const checkEmotion = () => {
        if (selectedEmotion < emotions.length && response.EmotionResults.Emotions[0] === emotions[selectedEmotion].name ) {
            setSelectedEmotion((prevCount) => prevCount + 1)
        }
    }

    useEffect(() => {
        checkEmotion()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])

    useEffect(() => {
        setSelectedEmotion(0)
    }, [emotions])

    return (
        <div>
            {emotions.length > 0 &&
                <Grid container spacing={2} marginTop={1}>
                    {cards}
                </Grid>
            }
            {
                (emotions.length !== 0 && emotions.length === selectedEmotion) &&
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                    ¡Felicidades! Has completado el juego.
                </Typography>
            }
        </div>
    );
}