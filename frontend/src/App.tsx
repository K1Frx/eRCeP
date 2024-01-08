import Container from 'react-bootstrap/esm/Container';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import LandingPage from './pages/landingPage/landingPage';
import './index.scss';
import Workers from './pages/workers/workers';
import NotFound from './pages/notFound/notFound';
import About from './pages/about/about';
import Admin from './pages/admin/admin';
import Settings from './pages/settings/settings';
import Timesheets from './pages/timesheets/timesheets';
import Employers from './pages/employers/employers';
import { createContext, useState } from 'react';
import Header from './components/header/Header';

export const AppContext = createContext<{
  loggedIn: boolean,
  setLoggedIn: (React.Dispatch<React.SetStateAction<boolean>> | Function),
  loading: boolean,
  setLoading: (React.Dispatch<React.SetStateAction<boolean>> | Function),
}>({ loggedIn: false, setLoggedIn: () => { }, loading: false, setLoading: () => { } });


function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Container fluid="true" className="main-container">
      <Router>
        <AppContext.Provider value={{ loggedIn, setLoggedIn, loading, setLoading }}>
          <Navbar />
          <Header/>
          <Routes>
            <Route path="/" Component={LandingPage} />
            <Route path="/about" Component={About} />
            <Route path="/admin" Component={Admin} />
            <Route path="/employers" Component={Employers} />
            <Route path="/settings" Component={Settings} />
            <Route path="/timesheets" Component={Timesheets} />
            <Route path="/workers" Component={Workers} />
            <Route path="/404" Component={NotFound} />
            <Route
              path="*"
              element={<Navigate to="/404" replace />}
            />
          </Routes>
          {/* <Footer /> */}
        </AppContext.Provider>
      </Router>
    </Container>
  )
}

export default App
