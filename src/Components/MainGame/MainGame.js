import MainInfo from '../MainInfo/MainInfo';
import React, { useState } from 'react';
import CardList from '../CardList/CardList';
import Timer from '../Timer/Timer';
import Box from '@mui/material/Box';

export default function MainGame() {
    const [response, setResponse] = useState(null)
    const [emotions, setEmotions] = useState([])
    const [randomCount, setRandomCount] = useState(0);
    const [score, setScore] = useState(0);

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
                <Timer
                    setScore={setScore}
                    score={score}
                    setEmotions={setEmotions}
                    randomCount={randomCount}
                    setRandomCount={setRandomCount}
                />
                <CardList
                    setScore={setScore}
                    response={response}
                    emotions={emotions}
                />
        </Box>
    );
}
