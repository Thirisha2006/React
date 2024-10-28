import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Alert 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ExamManagement = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [exams, setExams] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState({ id: null, name: '', date: '', duration: '', course: '', instructions: '', weightage: '' });
  const [error, setError] = useState('');
  const [isStaff, setIsStaff] = useState(true); // Assume staff login

  // Fetch exams from json-server
  useEffect(() => {
    fetch('http://localhost:3000/exams')
      .then((response) => response.json())
      .then((data) => setExams(data))
      .catch((error) => console.error('Error fetching exams:', error));
  }, []);

  // Open the dialog for adding/editing
  const handleOpen = (exam = {}) => {
    setCurrentExam(exam);
    setError('');
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setCurrentExam({ id: null, name: '', date: '', duration: '', course: '', instructions: '', weightage: '' });
    setError('');
  };

  // Save exam (edit or add)
  const handleSave = () => {
    if (!currentExam.name || !currentExam.date || !currentExam.duration || !currentExam.course || !currentExam.instructions || !currentExam.weightage) {
      setError('All fields are required');
      return;
    }

    if (currentExam.id) {
      // Update existing exam
      fetch(`http://localhost:3000/exams/${currentExam.id}`, { // Fixed URL here
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentExam)
      })
      .then(() => {
        setExams(exams.map(exam => (exam.id === currentExam.id ? currentExam : exam)));
        handleClose();
      });
    } else {
      // Add new exam
      fetch('http://localhost:3000/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentExam, id: exams.length + 1 })
      })
      .then((response) => response.json())
      .then((newExam) => {
        setExams([...exams, newExam]);
        handleClose();
      });
    }
  };

  // Delete exam
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/exams/${id}`, { method: 'DELETE' }) // Fixed URL here
      .then(() => setExams(exams.filter(exam => exam.id !== id)));
  };

  if (!isStaff) {
    return <div>Access denied. This page is only for staff members.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.backIconContainer}>
        <ArrowBackIcon 
          onClick={() => navigate('/')} // Navigate to the homepage using React Router
          style={styles.backIcon} 
        />
      </div>
      <h1 style={styles.title}>Exam Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Exam
      </Button>

      <TableContainer style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exam Name</TableCell>
              <TableCell>Date and Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Instructions</TableCell>
              <TableCell>Weightage (%)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map(exam => (
              <TableRow key={exam.id}>
                <TableCell>{exam.name}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.duration} minutes</TableCell>
                <TableCell>{exam.course}</TableCell>
                <TableCell>{exam.instructions}</TableCell>
                <TableCell>{exam.weightage}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(exam)}>Edit</Button>
                  <Button onClick={() => handleDelete(exam.id)} color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentExam.id ? 'Edit Exam' : 'Add Exam'}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Exam Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentExam.name}
            onChange={(e) => setCurrentExam({ ...currentExam, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date and Time"
            type="datetime-local"
            fullWidth
            variant="outlined"
            value={currentExam.date}
            onChange={(e) => setCurrentExam({ ...currentExam, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Duration (minutes)"
            type="number"
            fullWidth
            variant="outlined"
            value={currentExam.duration}
            onChange={(e) => setCurrentExam({ ...currentExam, duration: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Course"
            type="text"
            fullWidth
            variant="outlined"
            value={currentExam.course}
            onChange={(e) => setCurrentExam({ ...currentExam, course: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Instructions"
            type="text"
            fullWidth
            variant="outlined"
            value={currentExam.instructions}
            onChange={(e) => setCurrentExam({ ...currentExam, instructions: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Weightage (%)"
            type="number"
            fullWidth
            variant="outlined"
            value={currentExam.weightage}
            onChange={(e) => setCurrentExam({ ...currentExam, weightage: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  tableContainer: {
    marginTop: '20px'
  },
  backIconContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '20px'
  },
  backIcon: {
    cursor: 'pointer'
  }
};

export default ExamManagement;
