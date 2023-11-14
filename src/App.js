import MainGame from './Components/Game/MainGame/MainGame';
import SignIn from './Components/SignInUp/SignIn';
import SignUp from './Components/SignInUp/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import Reports from './Components/Reports/Reports';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';

function App() {
  const customTheme = createTheme({
    palette: {
      background: {
        default: '#efefef'
      },
      primary: {
        main: '#4e9e9a'
      }
    },
    typography: {
      fontFamily: 'MyFont'
    }
  })
  return (
    <ThemeProvider theme={customTheme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/registro" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="juego" element={<MainGame />} />
            <Route path="perfil" element={<Profile />} />
            <Route path="reportes" element={<Reports />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
