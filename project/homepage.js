import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Login from './login';
import Sign from './signup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function HomePage() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false); 

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  return (
    <div style={styles.container}>
      <AppBar position="static" style={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" style={styles.title}>
            AcademicHive
          </Typography>
          <Button color="inherit" onClick={() => navigate('/student-information')}>Student Information</Button>
          <Button color="inherit" onClick={() => navigate('/course-management')}>Course Management</Button>
          <Button color="inherit" onClick={() => navigate('/academic-performance')}>Academic Performance</Button>
          <Button color="inherit" onClick={() => navigate('/assignment-submission')}>Assignments</Button>
          <Button color="inherit" onClick={() => navigate('/exam-details')}>Exams</Button> {/* Added Exams button */}
        </Toolbar>
      </AppBar>

      <div style={styles.welcomeContainer}>
        <h1 style={styles.hh}>Welcome to AcademicHive!!</h1>
        <h2 style={styles.hh}>The path to success starts here!! Let's make learning easier, together</h2>
      </div>

      {showLogin && (
        <div style={styles.formContainer}>
          <Login onClose={handleClose} />
          <button style={styles.closeButton} onClick={handleClose}>X</button>
        </div>
      )}

      {showSignUp && (
        <div style={styles.formContainer}>
          <Sign onClose={handleClose} />
          <button style={styles.closeButton} onClick={handleClose}>X</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: `url(https://www.teahub.io/photos/full/39-390077_college-graduate-with-diploma.jpg)`, 
    backgroundSize: 'cover',
    backgroundPosition: 'down',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    backgroundColor: '#2E3B55', 
  },
  title: {
    flexGrow: 1,
  },
  welcomeContainer: {
    textAlign: 'center',
    color: 'white',
    marginTop: '20px',
  },
  hh: {
    color: 'black',
    margin: '10px 0',
  },
  formContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    width: '100%',
    maxWidth: '450px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: '8px', 
    padding: '20px', 
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#000',
    fontSize: '1.5em',
    cursor: 'pointer',
  },
};

export default HomePage;
