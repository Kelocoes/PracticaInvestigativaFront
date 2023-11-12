import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { useRequest } from '../../Api/ApiUsers';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';


export default function Profile() {
    const { updateProfile, getInfo } = useRequest();
    const [response, setResponse] = useState();
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        setLoading(true)
        try {
            await updateProfile(data, setResponse)
        } catch (error) {
            alert("Ha ocurrido un error al realizar la petición")
        }
    };

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                alert("La información se actualizó correctamente")
            } else {
                alert("La información no se pudo actualizar correctamente")
            }
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [response])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userid = localStorage.getItem('userid');
                await getInfo(userid, setProfile)
            } catch (error) {
                alert("Ha ocurrido un error al obtener la información")
            }
        }

        fetchData()
        // eslint-disable-next-line
    }, [])

    return (
        <Grid container component="main" >
            <Grid item xs={12} elevation={6} square align="center">
                <Box
                    sx={{
                        my: 5,
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
                    <Typography component="h1" variant="h4">
                        Tu perfil
                    </Typography>
                    {
                        profile ?
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    defaultValue={profile.data.user}
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
                                    defaultValue={profile.data.name}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nombre completo"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
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