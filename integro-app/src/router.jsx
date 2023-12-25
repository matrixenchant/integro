import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useApp } from './hooks/useApp';
import { Home, Profile, Project, Shop, Welcome } from './pages';

export default function Router() {
  const isFirstLaunch = !localStorage.getItem('integro-welcome');
  const navigate = useNavigate();
  const { projects, user } = useApp();

  useEffect(() => {
    if (isFirstLaunch) navigate('/welcome');
  }, []);

  if (!projects.length) return <div className="app-wrapper"></div>;

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
