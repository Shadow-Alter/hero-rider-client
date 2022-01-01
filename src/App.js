import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import RegisterRider from './pages/Register/RegisterRider';
import RegisterLearner from './pages/Register/RegisterLearner';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div className="">
      <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/rider" element={<RegisterRider />} />
        <Route path="/register/learner" element={<RegisterLearner />} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
