import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import useCountDown from 'react-countdown-hook';
import { generateRandomCards } from '../Emotions/Emotion';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Proptypes from 'prop-types';
import { useRequest } from '../../../Api/ApiModel';

export default function Stats(props) {
    const initialTime = 10000;
    const { setRandomCount, emotions, setEmotions,
        randomCount, score, setScore, emotionsCount,
        setEmotionsCount } = props;
    const [increase, setIncrease] = useState(2000);
    const [timeLeft, actions] = useCountDown(initialTime, 100);
    const [flag, setFlag] = useState(false)
    const [finished, setFinished] = useState(false)
    const [rounds, setRounds] = useState(5)
    const { saveData } = useRequest();

    const start = () => {
        setFinished(false)
        setIncrease(2000)
        setScore(0)
        setRandomCount(3)
        setFlag(prevCount => !prevCount)
        actions.start()
    }

    const handleSliderChange = (event, newValue) => {
        setRounds(newValue)
    }

    const updateCount = (actualEmotionsList) => {
        const newArray = [...emotionsCount]
        for (const emotionElement of actualEmotionsList) {
            newArray.find(emotion => emotion.name === emotionElement.name).maxCount += 1
        }
        setEmotionsCount(newArray)
    }

    const updateAccuracy = () => {
        const newArray = [...emotionsCount]
        for (const emotionElement of emotionsCount) {
            newArray.find(emotion => emotion.name === emotionElement.name)
                .accuracy = emotionElement.maxCount !== 0 
                    ? parseFloat((emotionElement.count / emotionElement.maxCount).toFixed(3)) 
                    : 0
        }

        setEmotionsCount(newArray)
    }

    useEffect(() => {
        if (timeLeft === 100) {
            if (randomCount - 2 !== rounds) {
                setRandomCount(prevCount => prevCount + 1)
                actions.start(initialTime + increase)
                setIncrease(prevCount => prevCount + 2000)
            } else {
                setRandomCount(0)
                updateAccuracy()
                setFinished(true)
            }
        }
        // eslint-disable-next-line
    }, [timeLeft])

    useEffect(() => {
        generateRandomCards(setEmotions, randomCount)
        // eslint-disable-next-line
    }, [randomCount, flag])

    useEffect(() => {
        if (emotions.length !== 0) {
            updateCount(emotions)
        }
        // eslint-disable-next-line
    }, [emotions])

    useEffect(() => {

        async function sendData() {
            try {
                if (finished) {
                    await saveData(emotionsCount, localStorage.getItem('userid'))
                    console.log("Información guardada")
                }
            } catch (error) {
                console.log("Hubo un error al guardar la inforamción")
            }
        }

        sendData()
        // eslint-disable-next-line
    }, [finished, emotionsCount])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body">Número de rondas máximas</Typography>
            <Slider value={rounds} onChange={handleSliderChange} valueLabelDisplay="auto" min={2} max={20} step={1} marks />
            <Button style={{ maxWidth: '100px', minWidth: '100px' }} variant="contained" onClick={start}>Iniciar</Button>
            <Typography variant="body">{(timeLeft / 1000).toFixed(2)} Segundos</Typography>
            <Typography variant="body">Ronda: {randomCount ? randomCount - 2 : 0}</Typography>
            <Typography variant="body">Puntaje{finished ? " total:" : ":"} {score}</Typography>
            {finished && <Typography variant="body">Juego terminado</Typography>}
        </Box>
    )
}

Stats.propTypes = {
    setRandomCount: Proptypes.func,
    setEmotions: Proptypes.func,
    randomCount: Proptypes.number,
    score: Proptypes.number,
    setScore: Proptypes.func
};
