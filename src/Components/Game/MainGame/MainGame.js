import MainInfo from '../MainInfo/MainInfo';
import React, { useState } from 'react';
import CardList from '../CardList/CardList';
import Stats from '../Stats/Stats';
import Box from '@mui/material/Box';

export default function MainGame() {
    const [response, setResponse] = useState(null)
    const [emotions, setEmotions] = useState([])
    const [randomCount, setRandomCount] = useState(0);
    const [score, setScore] = useState(0);
    const [emotionsCount, setEmotionsCount] = useState([
        { name: "Neutral", count: 0, maxCount: 0, accuracy: 0},
        { name: "Felicidad", count: 0, maxCount: 0, accuracy: 0},
        { name: "Sorpresa", count: 0, maxCount: 0, accuracy: 0},
        { name: "Tristeza", count:0, maxCount: 0, accuracy: 0},
        { name: "Furia", count: 0, maxCount: 0, accuracy: 0},
        { name: "Miedo", count: 0, maxCount:0, accuracy: 0}
    ])


    return (
        <Box sx={{ 
            textAlign:"center",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"left"
        }}>
                <MainInfo
                    response={response}
                    setResponse={setResponse}
                />
                <Stats
                    setScore={setScore}
                    score={score}
                    emotions={emotions}
                    setEmotions={setEmotions}
                    randomCount={randomCount}
                    setRandomCount={setRandomCount}
                    emotionsCount={emotionsCount}
                    setEmotionsCount={setEmotionsCount}
                />
                <CardList
                    setScore={setScore}
                    response={response}
                    emotions={emotions}
                    emotionsCount={emotionsCount}
                    setEmotionsCount={setEmotionsCount}
                />
        </Box>
    );
}
