import React from 'react';
import Countdown from 'react-countdown';
import Typography from '@mui/material/Typography';

export default function Timer(props) {
    const { time } = props

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Typography>Holi</Typography>;
        } else {
            return <Typography>{seconds} Segundos</Typography>;
        }
    };

    return (
        <Countdown date={time} renderer={renderer} />
    )
}