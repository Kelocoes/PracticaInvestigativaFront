import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';

export default function Cardlist(props) {
    const { response, emotions, setScore, emotionsCount, setEmotionsCount } = props
    const [selectedEmotion, setSelectedEmotion] = useState(0)

    const cards = emotions.map((emotion, index) => (
        <Grid item key={index}>
            <Card style={{ backgroundColor: selectedEmotion === index ? 'lightgreen' : 'white'}} elevation={10}>
                <CardContent>
                    <Typography variant="h2">{emotion["emoji"]}</Typography>
                </CardContent>
            </Card>
        </Grid>
    ));

    const checkEmotion = () => {
        if (selectedEmotion < emotions.length && response.EmotionResults.Emotions[0] === emotions[selectedEmotion].name ) {
            const newArray = [...emotionsCount]
            newArray.find(emotion => emotion.name === emotions[selectedEmotion].name).count += 1
            setEmotionsCount(newArray)
            setScore((prevCount) => prevCount + emotions[selectedEmotion].score)
            setSelectedEmotion((prevCount) => prevCount + 1)
        }
    }

    useEffect(() => {
        checkEmotion()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])

    useEffect(() => {
        setSelectedEmotion(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emotions])


    return (
        <div>
            {emotions.length > 0 &&
                <Grid container spacing={2} marginTop={1} sx={{ paddingX:10 }}>
                    {cards}
                </Grid>
            }
        </div>
    );
}

Cardlist.propTypes = {
    response: PropTypes.object,
    emotions: PropTypes.array,
    setScore: PropTypes.func
};
