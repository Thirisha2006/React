import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AdminHomePage() {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <div style={styles.root}>
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            AcademicHive
          </Typography>

          {/* Replace onNavigate with navigate to specific routes */}
          <Button color="inherit" onClick={() => navigate('/attendance')}>
            Update Attendance
          </Button>
          <Button color="inherit" onClick={() => navigate('/exam-management')}>
            Exam Management
          </Button>
          <Button color="inherit" onClick={() => navigate('/reports')}>
            Reports
          </Button>
          <Button color="inherit" onClick={() => navigate('/assignment-management')}>
            Deadlines
          </Button>
        </Toolbar>
      </AppBar>

      <div style={styles.container}>
        
        
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: '100vh',
    backgroundImage: 'url("https://cdn.gamma.app/vmfjvutrx6f5mez/generated-images/-nQAqWKv1EFQbyo3vvovb.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: 0,
    padding: 0,
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    marginTop: '20px',
    borderRadius: '8px',
  },
};

export default AdminHomePage;
