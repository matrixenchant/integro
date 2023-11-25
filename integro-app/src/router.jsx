import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home, Welcome } from './pages';
import Project from './pages/Project';
import Profile from './pages/Profile';
import { useApp } from './hooks/useApp';

export default function Router() {
  const isFirstLaunch = !localStorage.getItem('integro-welcome');
  const navigate = useNavigate();
  const { projects, user } = useApp();

  useEffect(() => {
    if (isFirstLaunch) navigate('/welcome');
  }, []);

  if (!projects.length || !user) return <div className="app-wrapper"></div>;

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects/:id" element={<Project />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
