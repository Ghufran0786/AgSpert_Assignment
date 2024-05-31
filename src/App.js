import React, { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    const savedColorMode = localStorage.getItem('chakra-ui-color-mode');
    if (savedColorMode) {
      setColorMode(savedColorMode);
    }
  }, [setColorMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
