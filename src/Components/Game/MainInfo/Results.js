import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { emotionsPool } from '../Emotions/Emotion';
import Divider from '@mui/material/Divider';

export default function Results(props) {
    const { response } = props;



    return (
        <>
            {
                response.InsightFaceResults.age ?
                    <Box>
                        <Divider sx={{ borderBottomWidth: 3 }} />
                        <Typography sx={{ fontSize: 20 }}>
                            ¡Hola tú!
                            <br />
                            Parece que tienes {response.InsightFaceResults.age} años 😯
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={6} align="right">
                                <FaceIcon
                                    sx={{
                                        fontSize: 50,
                                        color: response.InsightFaceResults.gender === "Masculino" ? "primary.main" : "gray"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} align="left">
                                <Face2Icon
                                    sx={{
                                        fontSize: 50,
                                        color: response.InsightFaceResults.gender === "Femenino" ? "primary.main" : "gray"
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Typography sx={{ fontSize: 20 }}>
                            Estoy un {(response.InsightFaceResults.score * 100).toFixed(1)}% seguro 🤔
                        </Typography>
                        <Divider sx={{ borderBottomWidth: 3 }} />
                        <Typography sx={{ fontSize: 20 }}>
                            Pareces estar con
                            <br />
                            un poco de {' '}
                            <span style={{ fontSize: 25 }}>
                                {emotionsPool.find(
                                    (emotion) => emotion.name === response.EmotionResults.Emotions[0]
                                ).emoji}
                            </span>
                            <br />
                            y algo de {' '}
                            <span style={{ fontSize: 25 }}>
                                {emotionsPool.find(
                                    (emotion) => emotion.name === response.EmotionResults.Emotions[1]
                                ).emoji}
                            </span>
                        </Typography>
                        <Typography sx={{ fontSize: 20 }}>
                            Con valores de
                            {" "}{(response.EmotionResults.Scores[0]).toFixed(1)} y
                            {" "}{(response.EmotionResults.Scores[1]).toFixed(1)} 😯
                        </Typography>
                        <Divider sx={{ borderBottomWidth: 3 }} />
                    </Box>
                    :
                    <Typography sx={{ fontSize: 20 }}>
                        ¡Ay no!
                        <br />
                        Parece que no hemos encontrado ningún rostro 😢
                    </Typography>
            }
        </>
    )
}

Results.propTypes = {
    response: PropTypes.object,
};
