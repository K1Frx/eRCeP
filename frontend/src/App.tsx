import Container from 'react-bootstrap/esm/Container';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import LandingPage from './pages/landingPage/landingPage';
import Workers from './pages/workers/workers';
import NotFound from './pages/notFound/notFound';
import About from './pages/about/about';
import Admin from './pages/admin/admin';
import Settings from './pages/settings/settings';
import Timesheets from './pages/timesheets/timesheets';
import Employers from './pages/employers/employers';
import { createContext, useState } from 'react';
import Header from './components/header/Header';
import { Loader } from './components/loader/Loader';
import { useStorageState } from './hooks/useStorageState';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import ErrorModal from './components/errorModal/errorModal';

export const AppContext = createContext<{
  setShowError: (React.Dispatch<React.SetStateAction<boolean>> | Function),
  setError: (React.Dispatch<React.SetStateAction<string>> | Function),
  setLoading: (React.Dispatch<React.SetStateAction<boolean>> | Function),
}>({ setShowError: () => { }, setError: () => { }, setLoading: () => { }  });


function App() {
  const [showError, setShowError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Container fluid="true" className="main-container">
      <Router>
        <AppContext.Provider value={{ setShowError, setError, setLoading }}>
          <div className='navbar'><Navbar /></div>
          <div className='header'><Header /></div>
          <div className="pageContainer">
            {loading && <Loader />}
            {showError && <ErrorModal errorMessage={error} />}
            <Routes>
              <Route path="/" Component={LandingPage} />
              <Route path="/about" Component={About} />
              <Route path="/settings" element={<Settings />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/employers" element={<Employers />} />
                <Route path="/timesheets" element={<Timesheets />} />
                <Route path="/workers" element={<Workers />} />
              </Route>
              <Route path="/404" Component={NotFound} />
              <Route
                path="*"
                element={<Navigate to="/404" replace />}
              />
            </Routes>
          </div>
          {/* <Footer /> */}
        </AppContext.Provider>
      </Router>
    </Container>
  )
}

const ProtectedRoute = () => {
  let loginToken = useStorageState({ state: "loginToken" });
  return loginToken && loginToken.store ? <Outlet /> : <Navigate to="/" replace />;
};


export default App
