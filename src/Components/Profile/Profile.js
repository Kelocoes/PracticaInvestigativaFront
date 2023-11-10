import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useRequest } from '../../Api/ApiUsers';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';


export default function Profile() {
    const navigate = useNavigate();
    const { updateProfile } = useRequest();
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
        updateProfile(data, setResponse)
    };

    useEffect(() => {
        console.log(response)
        if (response) {
            if (response.status === 200) {
                navigate('/dashboard/perfil');
            } else {
                alert("La información no se pudo actualizar correctamente")
            }
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [response])

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={12} elevation={6} square align="center">
                <Box
                    sx={{
                        my: 8,
                        mx: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: { lg: '80%', xl: '20%' }
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Tu perfil
                    </Typography>
                    {
                        !response ?
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
                                    Actualizar información
                                </Button>
                            </Box>
                            :
                            <Skeleton width="400px" height="400px" animation="wave" variant="rounded" sx={{ marginY: 2 }}/>
                    }
                </Box>
            </Grid>
        </Grid>
    );
}