import React, { useState } from 'react';
import { Outlet, Link as LinkRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import DeblurIcon from '@mui/icons-material/Deblur';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Dashboard() {
    const [value, setValue] = useState(-1);

    const cleanStorage = () => {
        localStorage.removeItem('userid')
    }

    return (
        <Fade in={true}>
            <Box>
                <Box sx={{ mt: 2 }} align="center">
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        sx={{
                            backgroundColor: 'grey.200',
                            width: 'fit-content',
                            borderRadius: '20px',
                            boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <BottomNavigationAction label="Perfil" icon={<PersonIcon />} component={LinkRouter} to={`perfil`}/>
                        <BottomNavigationAction label="Juego" icon={<DeblurIcon />} component={LinkRouter} to={`juego`}/>
                        <BottomNavigationAction label="Reportes" icon={<QueryStatsIcon />} component={LinkRouter} to={`reportes`}/>
                        <BottomNavigationAction label="Salir" icon={<LogoutIcon />} component={LinkRouter} to={`/`} onClick={cleanStorage}/>
                    </BottomNavigation>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        mt: 2
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Fade>
    )
}