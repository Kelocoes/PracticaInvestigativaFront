import MainGame from './Components/MainGame/MainGame';
import SignIn from './Components/SignInUp/SignIn';
import SignUp from './Components/SignInUp/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import Reports from './Components/Reports/Reports';

function App() {

  return (
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
  );
}

export default App;
