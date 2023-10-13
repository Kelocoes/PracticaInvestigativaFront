import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Cardlist(props) {
    const { numberOfCards, response, emotions } = props
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
        if (selectedEmotion < numberOfCards && response && response.EmotionResults.Emotions[0] === emotions[selectedEmotion].name ) {
            setSelectedEmotion((prevCount) => prevCount + 1)
        }
    }

    useEffect(() => {
        checkEmotion()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])

    useEffect(() => {
        setSelectedEmotion(0)
    }, [numberOfCards])

    return (
        <div>
            <Typography variant="body2">
                Selected emotion: {selectedEmotion}
            </Typography>
            {numberOfCards > 0 &&
                <Grid container spacing={2}>
                    {cards}
                </Grid>
            }
            {
                (numberOfCards !== 0 && numberOfCards === selectedEmotion) &&
                <Typography variant="h5">
                    ¡Felicidades! Has completado el juego
                </Typography>
            }
        </div>
    );
}