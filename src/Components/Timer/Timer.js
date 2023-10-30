import React from 'react';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import useCountDown from 'react-countdown-hook';
import { generateRandomCards } from '../Emotions/Emotion';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function Timer(props) {
    const initialTime = 10000;
    const { setRandomCount, setEmotions, randomCount, score, setScore } = props;
    const [increase, setIncrease] = useState(2000);
    const [timeLeft, actions] = useCountDown(initialTime, 100);
    const [flag, setFlag] = useState(false)
    const [finished, setFinished] = useState(false)
    const [rounds, setRounds] = useState(5)

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

    useEffect(() => {
        if (timeLeft === 100) {
            if (randomCount - 2 !== rounds) {
                setRandomCount(prevCount => prevCount + 1)
                actions.start(initialTime + increase)
                setIncrease(prevCount => prevCount + 2000)
            } else {
                setFinished(true)
                setRandomCount(0)
            }
        }
        // eslint-disable-next-line
    }, [timeLeft])

    useEffect(() =>{
        generateRandomCards(setRandomCount, setEmotions, randomCount)
        // eslint-disable-next-line
    }, [randomCount, flag])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body">Número de rondas máximas</Typography>
            <Slider value={rounds} onChange={handleSliderChange} valueLabelDisplay="auto" min={2} max={20} step={1} marks/>
            <Button style={{maxWidth: '100px', minWidth: '100px'}} variant="contained" onClick={start}>Iniciar</Button>
            <Typography variant="body">{(timeLeft / 1000).toFixed(2)} Segundos</Typography>
            <Typography variant="body">Ronda: {randomCount ? randomCount - 2 : 0}</Typography>
            <Typography variant="body">Puntaje{finished ? " total:" : ":"} {score}</Typography>
            {finished && <Typography variant="body">Juego terminado</Typography>}
        </Box>
    )
}