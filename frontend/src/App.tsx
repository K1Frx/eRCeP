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
import { createContext, useEffect, useState } from 'react';
import Header from './components/header/Header';
import { Loader } from './components/loader/Loader';
import { useStorageState } from './hooks/useStorageState';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import ErrorModal from './components/errorModal/errorModal';
import Contracts from './pages/contracts/contracts';

export const AppContext = createContext<{
  setShowError: (React.Dispatch<React.SetStateAction<boolean>> | Function),
  setError: (React.Dispatch<React.SetStateAction<string>> | Function),
  setLoading: (React.Dispatch<React.SetStateAction<boolean>> | Function),
}>({ setShowError: () => { }, setError: () => { }, setLoading: () => { } });


function App() {
  const [showError, setShowError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    switch (true) {
      case localStorage.getItem("themeKey") === "dark":
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem("themeKey", "dark");
        break;
      case localStorage.getItem("themeKey") === "light":
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem("themeKey", "light");
        break;
      case window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches:
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem("themeKey", "dark");
        break;
      default:
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem("themeKey", "light");
        break;
    }
  }, []); //detect preffered color scheme


  return (
    <Container fluid="true" className="main-container">
      <Router>
        <AppContext.Provider value={{ setShowError, setError, setLoading }}>
          {loading && <Loader />}
          <div className='navbar'><Navbar /></div>
          <div className='header'><Header /></div>
          <div className="pageContainer">
            {showError && <ErrorModal errorMessage={error} />}
            <Routes>
              <Route path="/" Component={LandingPage} />
              <Route path="/about" Component={About} />
              <Route path="/settings" element={<Settings />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/employers" element={<Employers />} />
                <Route path="/contracts" element={<Contracts />} />
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
