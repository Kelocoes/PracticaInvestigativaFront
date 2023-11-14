import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Skeleton from '@mui/material/Skeleton';
import { useRequest } from '../../Api/ApiReports';
import Fade from '@mui/material/Fade';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Reports() {
    const [responseChart, setResponseChart] = useState()
    const [responsePie, setResponsePie] = useState()
    const { fetchChart, fetchPie } = useRequest();

    const colors = [
        '#4e9e9a',
        '#73c4c1',
        '#246664',
        '#9fe8e6',
        '#004f4b',
    ]

    const optionsChart = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Diagrama de precisión por emociones',
                font: {
                    size: 24,
                    color: '#000000'
                }
            },
        },
    };

    const optionsPie = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Frecuencia de las emociones',
                font: {
                    size: 24,
                    color: '#000000'
                }
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const labels = ['Neutral', 'Felicidad', 'Sorpresa', 'Tristeza', 'Furia', 'Miedo'];

    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Emociones',
                data: typeof responseChart === 'object' ? responseChart.data.results : [],
                backgroundColor: colors,
                borderRadius: 10
            },
        ]
    };

    const dataPie = {
        labels,
        datasets: [
            {
                label: 'Emociones',
                data: typeof responsePie === 'object' ? responsePie.data.results : [],
                backgroundColor: colors,
                borderRadius: 10
            },
        ],
    }

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchChart(localStorage.getItem('userid'), setResponseChart)
                await fetchPie(localStorage.getItem('userid'), setResponsePie)
            } catch (error) {
                alert("Hubo un error al cargar la información")
            }
        }

        fetchData()
        // eslint-disable-next-line
    }, [])

    return (
        <Fade in={true} timeout={750} mountOnEnter unmountOnExit>
            <Box
                align="center"
                sx={{ mt: 5 }}
            >
                <Grid container sx={{ width: { xs: '95%', md: '80%' } }} spacing={2}>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <Typography variant="h4" sx={{ textShadow: '2px 2px 2px rgba(0, 0, 0, 0.15)', textAlign: "center" }}>
                            Reportes
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} align="center">
                        <Box sx={{ maxWidth: '100%', height: { sm: '250px', md: '400px', lg: '500px' } }}>
                            {typeof responseChart === 'object' ? <Bar options={optionsChart} data={dataChart} /> : <Skeleton height="100%" animation="wave" variant="rounded" />}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                        <Box sx={{ maxWidth: '100%', height: { sm: '300px', md: '400px', lg: '500px' } }}>
                            {typeof responsePie === 'object' ? <Pie options={optionsPie} data={dataPie} /> : <Skeleton height="100%" animation="wave" variant="rounded" />}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    )
}