import Container from 'react-bootstrap/esm/Container';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import LandingPage from './pages/landingPage/landingPage';
import './index.scss';

function App() {

  return (
    <Container fluid="true">
      <Router>
          <Navbar />
          <div className="main-container">
          <Routes>
            <Route path="/" Component={LandingPage} />
            {/* <Route path='/404' Component={NotFound} /> */}
            <Route
              path="*"
              element={<Navigate to="/404" replace />}
            />
          </Routes>
          {/* <Footer /> */}
          </div>
      </Router>
    </Container>
  )
}

export default App
