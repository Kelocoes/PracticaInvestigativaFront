import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Typography } from '@mui/material';
import { useRequest } from '../../../Api/ApiModel';
import Results from './Results';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Fade from '@mui/material/Fade';

export default function MainInfo(props) {
    const { response, setResponse, } = props;
    const webcamRef = useRef(null);
    const { getRecognition } = useRequest();

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
        <Fade in={true} timeout={750} mountOnEnter unmountOnExit>
            <Grid container sx={{ paddingX: { sm: 2, md: 10 }, paddingTop: 5, paddingBottom: 2 }}>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography variant="h4" sx={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.15)', textAlign: "center" }}>
                        Reconocimiento facial y de emociones
                    </Typography>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={12} md={12} lg={5} >
                    <Webcam
                        width="75%"
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
        </Fade>
    );
}

MainInfo.propTypes = {
    response: PropTypes.object,
    setResponse: PropTypes.func
};
