import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function Results(props) {
    const { response } = props;

    return (
        <div>
            <Typography sx={{ fontSize: 20}}>
                Edad: {response.InsightFaceResults.age}
                <br />
                Sexo: {response.InsightFaceResults.gender}
                <br />
                Puntaje: {response.InsightFaceResults.score}
            </Typography>
            <Typography sx={{ fontSize: 20}}>
                Emociones: {response.EmotionResults.Emotions[0]} { }
                {response.EmotionResults.Emotions[1]}
                <br />
                Puntajes: {response.EmotionResults.Scores[0]} { }
                {response.EmotionResults.Scores[1]}
            </Typography>
        </div>
    )
}

Results.propTypes = {
    response: PropTypes.object,
};
