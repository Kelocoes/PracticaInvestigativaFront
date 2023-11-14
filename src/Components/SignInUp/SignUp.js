import React, { useState, useEffect, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useRequest } from '../../Api/ApiUsers';
import CircularProgress from '@mui/material/CircularProgress';
import Particles from 'react-particles';
import { useMediaQuery } from '@mui/material';
import { loadFull } from 'tsparticles';
import configParticlesDesktop from './configParticlesDesktop.json';
import configParticlesMobile from './configParticlesMobile.json';


export default function SignUp() {
    const navigate = useNavigate();
    const { signUp } = useRequest();
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState();
    const matches = useMediaQuery('(max-width:600px)');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        setLoading(true)
        try {
            await signUp(data, setResponse)
        } catch (error) {
            alert("Ha ocurrido un error al realizar el registro")
            setLoading(false)
        }
    };

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                localStorage.setItem('userid', response.data.userid);
                navigate('/dashboard/perfil');
            } else {
                alert("No has podido registrarte correctamente")
            }
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [response])

    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={matches ? configParticlesMobile : configParticlesDesktop}
                style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}
            />
            <Grid container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Grid item xs={12} sm={8} md={5} lg={4} xl={3} component={Paper} elevation={6} square align="center" sx={{ zIndex: 1 }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 7,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registro
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="user"
                                label="Usuario"
                                name="user"
                                autoComplete="user"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Nombre completo"
                                name="name"
                                autoComplete="name"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading && <CircularProgress size={20} color="inherit" />}
                                &nbsp;
                                Registrarse
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        ¿Tienes una cuenta? Ingresa
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}