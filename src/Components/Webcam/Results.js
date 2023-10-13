import React from 'react';
import Typography from '@mui/material/Typography';

export default function Results(props) {
    const { response } = props;

    return (
        <div>
            <Typography variant="h5">
                Resultados de reconocimiento facial
            </Typography>
            <Typography variant="body1">
                Edad: {response.InsightFaceResults.age}
                <br />
                Sexo: {response.InsightFaceResults.gender}
                <br />
                Puntaje: {response.InsightFaceResults.score}
            </Typography>
            <Typography variant="h5">
                Resultados de reconocimiento 
                <br />
                de emociones
            </Typography>
            <Typography variant="body1">
                Emociones: {response.EmotionResults.Emotions[0]} { }
                {response.EmotionResults.Emotions[1]}
                <br />
                Puntajes: {response.EmotionResults.Scores[0]} { }
                {response.EmotionResults.Scores[1]}
            </Typography>
        </div>
    )
}