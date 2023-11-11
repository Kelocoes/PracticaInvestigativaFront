import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Typography } from '@mui/material';
import { useRequest } from '../../../Api/ApiModel';
import Results from './Results';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';

export default function MainInfo(props) {
    const { response, setResponse, } = props;
    const webcamRef = useRef(null);
    const { getRecognition } = useRequest();
    const matches = useMediaQuery('(max-width:600px)');

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
        const interval = setInterval(captureImage, 1000);

        return () => {
            clearInterval(interval);
        };
    },);

    return (
        <Grid container spacing={2} sx={{ paddingX: 10, paddingTop: 5, paddingBottom: 2 }}>
            <Grid item xs={12}>
                <Typography variant="h4">
                    Reconocimiento facial y de emociones
                </Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={12} md={12} lg={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: { md:'center', lg:'right'} }}>
                <Webcam
                    height={matches ? 150 : 400}
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
        </Grid>
    );
}

MainInfo.propTypes = {
    response: PropTypes.object,
    setResponse: PropTypes.func
};
