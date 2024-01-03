import { useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/landingPage/landingPage';

function App() {

  return (
    <Container fluid="true">
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" Component={LandingPage} />
            {/* <Route path='/404' Component={NotFound} /> */}
            <Route
              path="*"
              element={<Navigate to="/404" replace />}
            />
          </Routes>
          {/* <Footer /> */}
      </Router>
    </Container>
  )
}

export default App
