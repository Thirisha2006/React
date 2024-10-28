import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const styles = {
  
    appBar: {
      backgroundColor: '#000000', // Black color for App Bar
    },
    mainContainer: {
      backgroundImage: `url('/admindash.jpg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center', 
      height: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      overflow: 'visible', // Ensure content is visible if overflowing
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    content: {
      flexGrow: 1, 
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center',
      color: 'white', 
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      overflow: 'visible', // Ensure no content gets hidden
    },
  
  // Navigate to Exam Management page
  };

  return (
    <div style={styles.mainContainer}>
      <AppBar position="static" style={styles.appBar}>
        <Toolbar style={styles.toolbar}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Staff Dashboard
          </Typography>
          <Button color="inherit" onClick={handleStudentList}>
            Student List
          </Button>
          <Button color="inherit" onClick={handleAttendance}>
            Attendance
          </Button>
          <Button color="inherit" onClick={handleExamManagement}>
            Exam Management
          </Button>
        </Toolbar>
      </AppBar>

      {/* Content area with background image */}
      <div style={styles.content}>
        <Typography variant="h4">Welcome to the Staff Dashboard!</Typography>
      </div>
    </div>
  );

export default StaffDashboard;
