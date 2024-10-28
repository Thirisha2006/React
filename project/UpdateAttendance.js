import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateAttendance() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attendanceSummary, setAttendanceSummary] = useState(null);

  useEffect(() => {
    // Fetch the student data from the JSON file
    axios.get('http://localhost:3000/attenance') // Assuming you meant attendance
      .then(response => {
        setStudents(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleAttendanceChange = (id, newAttendance) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, attendance: newAttendance } : student
      )
    );

    // Update the student's attendance on the server side
    axios.put(`http://localhost:3000/attenance/${id}`, { attendance: newAttendance })
      .then(response => {
        console.log('Updated successfully on server:', response.data);
      })
      .catch(error => {
        console.error('Error updating attendance on server:', error);
      });
  };

  const handleSubmit = () => {
    const totalStudents = students.length;
    const presentCount = students.filter(student => student.attendance === 'Present').length;
    const absentCount = totalStudents - presentCount;
    const attendancePercentage = ((presentCount / totalStudents) * 100).toFixed(2);

    setAttendanceSummary({
      presentCount,
      absentCount,
      attendancePercentage,
    });

    alert('Attendance updated successfully!');
  };

  if (isLoading) {
    return <p>Loading student data...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Update Student Attendance</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Attendance Status</th>
            <th style={styles.th}>Update Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td style={styles.td}>{student.id}</td>
              <td style={styles.td}>{student.name}</td>
              <td style={styles.td}>{student.attendance}</td>
              <td style={styles.td}>
                <select
                  value={student.attendance}
                  onChange={e => handleAttendanceChange(student.id, e.target.value)}
                  style={styles.select}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit} style={styles.button}>Submit Attendance</button>

      {/* Display attendance summary after submission */}
      {attendanceSummary && (
        <div style={styles.summaryContainer}>
          <div style={styles.summary}>
            <h3>Attendance Summary</h3>
            <p>Number of Present Students: {attendanceSummary.presentCount}</p>
            <p>Number of Absent Students: {attendanceSummary.absentCount}</p>
            <p>Attendance Percentage: {attendanceSummary.attendancePercentage}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
  },
  select: {
    padding: '5px',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  summaryContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  summary: {
    padding: '20px',
    backgroundColor: '#e0f7fa',
    border: '1px solid #00796b',
    borderRadius: '5px',
    textAlign: 'center',
    width: '50%',
  },
};

export default UpdateAttendance;
