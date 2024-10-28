import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'; 

const ExamManagement = () => {
  const navigate = useNavigate(); 
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/exams')
      .then((response) => response.json())
      .then((data) => setExams(data))
      .catch((error) => console.error('Error fetching exams:', error));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <ArrowBackIcon 
          onClick={() => navigate('/')} 
          style={styles.backIcon} 
        />
        <h1 style={styles.title}>Exams</h1>
      </div>

      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow style={styles.tableHeaderRow}>
              <TableCell style={styles.tableHeader}>Exam Name</TableCell>
              <TableCell style={styles.tableHeader}>Date and Time</TableCell>
              <TableCell style={styles.tableHeader}>Duration</TableCell>
              <TableCell style={styles.tableHeader}>Course</TableCell>
              <TableCell style={styles.tableHeader}>Instructions</TableCell>
              <TableCell style={styles.tableHeader}>Weightage (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map(exam => (
              <TableRow key={exam.id} style={styles.tableRow}>
                <TableCell>{exam.name}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.duration} minutes</TableCell>
                <TableCell>{exam.course}</TableCell>
                <TableCell>{exam.instructions}</TableCell>
                <TableCell>{exam.weightage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginLeft: '20px',
  },
  tableContainer: {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeaderRow: {
    backgroundColor: '#2E3B55',
  },
  tableHeader: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '12px 8px',
  },
  tableRow: {
    backgroundColor: '#ffffff',
    '&:nth-of-type(odd)': {
      backgroundColor: '#f9f9f9', // Alternating row color
    },
    textAlign: 'center',
  },
  backIcon: {
    cursor: 'pointer',
    fontSize: '30px',
    color: '#2E3B55',
  },
};

export default ExamManagement;
