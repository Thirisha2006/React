import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Container,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import studentsData from '../students.json'; // Import the JSON data

function Reports() {
  const [studentID, setStudentID] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [cgpa, setCgpa] = useState(null);

  // Search student by ID
  const handleSearch = () => {
    if (!studentID) {
      setError('Please enter a valid student ID.');
      return;
    }

    const foundStudent = studentsData.find((student) => student.id === studentID);
    if (!foundStudent) {
      setError('Student not found.');
      setStudentData(null);
    } else {
      setStudentData(foundStudent);
      setError('');
    }
  };

  // Calculate CGPA for a student based on grades
  const calculateCGPA = () => {
    if (!studentData || !studentData.courses || studentData.courses.length === 0) {
      setCgpa(null);
      return;
    }

    const gradePoints = { 'O': 5, 'A': 4, 'B': 3, 'C': 2, 'D': 1 };
    let totalPoints = 0;
    let totalCredits = 0;

    studentData.courses.forEach((course) => {
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });

    const calculatedCGPA = (totalPoints / totalCredits).toFixed(2);
    setCgpa(calculatedCGPA);
  };

  return (
    <Container maxWidth="md" style={styles.container}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Student Reports
        </Typography>
      </Box>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Enter Student ID"
            variant="outlined"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {studentData && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2">
            Student Details:
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><strong>Student Name</strong></TableCell>
                  <TableCell>{studentData.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Student ID</strong></TableCell>
                  <TableCell>{studentData.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Attendance Percentage</strong></TableCell>
                  <TableCell>{studentData.attendancePercentage}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>CGPA</strong></TableCell>
                  <TableCell>{studentData.cgpa}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Year</strong></TableCell>
                  <TableCell>{studentData.year}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Semester</strong></TableCell>
                  <TableCell>{studentData.semester}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" component="h3" sx={{ mt: 4 }}>
            Courses and Grades:
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Course Name</strong></TableCell>
                  <TableCell><strong>Grade</strong></TableCell>
                  <TableCell><strong>Credits</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.courses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell>{course.grade}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={calculateCGPA}
            >
              Calculate CGPA
            </Button>
          </Box>

          {cgpa && (
            <Typography variant="h5" component="h3" sx={{ mt: 3, textAlign: 'center' }}>
              Calculated CGPA: {cgpa} / 5
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
}

const styles = {
  container: {
    backgroundColor: '#f7f7f7',
    padding: '40px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
};

export default Reports;
