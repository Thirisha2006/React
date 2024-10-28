import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState({ id: null, course: '', questions: '', deadline: '', maxMarks: '' });
  const [error, setError] = useState('');
  const [isStaff, setIsStaff] = useState(true); // Assume staff login
  const navigate = useNavigate(); // Initialize navigate

  // Fetch assignments from json-server
  useEffect(() => {
    fetch('http://localhost:3000/deadline')
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error('Error fetching assignments:', error));
  }, []);

  // Open the dialog for adding/editing
  const handleOpen = (assignment = {}) => {
    setCurrentAssignment(assignment);
    setError('');
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setCurrentAssignment({ id: null, course: '', questions: '', deadline: '', maxMarks: '' });
    setError('');
  };

  // Save assignment (edit or add)
  const handleSave = () => {
    if (!currentAssignment.course || !currentAssignment.questions || !currentAssignment.deadline || !currentAssignment.maxMarks) {
      setError('All fields are required');
      return;
    }

    if (currentAssignment.id) {
      // Update existing assignment
      fetch(`http://localhost:3000/deadline${currentAssignment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentAssignment)
      })
      .then(() => {
        setAssignments(assignments.map(a => (a.id === currentAssignment.id ? currentAssignment : a)));
        handleClose();
      });
    } else {
      // Add new assignment
      fetch('http://localhost:3000/deadline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentAssignment, id: assignments.length + 1 })
      })
      .then((response) => response.json())
      .then((newAssignment) => {
        setAssignments([...assignments, newAssignment]);
        handleClose();
      });
    }
  };

  // Delete assignment
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/deadline${id}`, { method: 'DELETE' })
      .then(() => setAssignments(assignments.filter(a => a.id !== id)));
  };

  if (!isStaff) {
    return <div>Access denied. This page is only for staff members.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.backIconContainer}>
        {/* Replace window.location.href with navigate to go back */}
        <ArrowBackIcon 
          onClick={() => navigate('/')} // Navigate back to homepage
          style={styles.backIcon} 
        />
      </div>
      <h1 style={styles.title}>Assignment Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Assignment
      </Button>

      <TableContainer style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Assignment Questions</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Max Marks</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map(assignment => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.course}</TableCell>
                <TableCell>{assignment.questions}</TableCell>
                <TableCell>{assignment.deadline}</TableCell>
                <TableCell>{assignment.maxMarks}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(assignment)}>Edit</Button>
                  <Button onClick={() => handleDelete(assignment.id)} color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentAssignment.id ? 'Edit Assignment' : 'Add Assignment'}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Course Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentAssignment.course}
            onChange={(e) => setCurrentAssignment({ ...currentAssignment, course: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Assignment Questions"
            type="text"
            fullWidth
            variant="outlined"
            value={currentAssignment.questions}
            onChange={(e) => setCurrentAssignment({ ...currentAssignment, questions: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Deadline"
            type="datetime-local"
            fullWidth
            variant="outlined"
            value={currentAssignment.deadline}
            onChange={(e) => setCurrentAssignment({ ...currentAssignment, deadline: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Max Marks"
            type="number"
            fullWidth
            variant="outlined"
            value={currentAssignment.maxMarks}
            onChange={(e) => setCurrentAssignment({ ...currentAssignment, maxMarks: e.target.value })}
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

export default AssignmentManagement;
