import React from 'react';
import StudentProfile from './studentprofile'; 

function StudentInfo() {
  return (
    <div style={styles.container}>
      <h1>Student Information</h1>
      <StudentProfile />
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
};

export default StudentInfo;
