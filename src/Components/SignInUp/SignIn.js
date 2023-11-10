import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundImage from '../../Assets/backgroundLanding.webp';
import { useNavigate } from "react-router-dom";
import { useRequest } from '../../Api/ApiUsers';
import CircularProgress from '@mui/material/CircularProgress';

const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const { signIn } = useRequest();
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        setLoading(true)
        signIn(data, setResponse)
    };

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                navigate('/dashboard/perfil');
            } else {
                alert("No has podido ingresar correctamente")
            }
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [response])

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${BackgroundImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Ingreso
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
                                Ingresar
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="#/registro" variant="body2">
                                        ¿No tienes una cuenta? Regístrate
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}