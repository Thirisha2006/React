import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AssignmentSubmission = () => {
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch assignments from json-server
  useEffect(() => {
    fetch('http://localhost:3000/deadline')
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error('Error fetching assignments:', error));
  }, []);

  const handleOpen = (assignment) => {
    setSelectedAssignment(assignment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAssignment(null);
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleHandIn = () => {
    if (file) {
      // Mock file upload
      setTimeout(() => {
        setSnackbarOpen(true);
        handleClose();
      }, 1000); // Simulate a network request delay
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={styles.container}>
      <h1>Assignments</h1>
      <Button onClick={() => navigate('/')} style={styles.backButton}>
        Back to Dashboard
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Assignment Questions</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.course}</TableCell>
                <TableCell>{assignment.questions}</TableCell>
                <TableCell>{assignment.deadline}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(assignment)}>Upload Assignment</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Assignment for {selectedAssignment?.course}</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleHandIn} color="primary">Hand In</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Your assignment has been handed in successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    marginBottom: '20px',
    backgroundColor: '#3f51b5',
    color: 'white',
  },
};

export default AssignmentSubmission;
