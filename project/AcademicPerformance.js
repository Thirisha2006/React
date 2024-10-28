import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AcademicPerformance({ onNavigate }) {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else if (onNavigate) {
      onNavigate('homepage');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backIconContainer}>
        <ArrowBackIcon onClick={handleBack} style={styles.backIcon} />
      </div>

      {/* Academic Performance Heading */}
      <h1 style={styles.academicHeading}>ACADEMIC PERFORMANCE</h1>

      {/* Student Information */}
      <section style={styles.section}>
        <h2 style={styles.studentHeading}>STUDENT INFORMATION</h2>
        <div style={styles.detailsBox}>
          <p style={styles.infoText}><strong>Name:</strong> Thirisha R</p>
          <p style={styles.infoText}><strong>Student ID:</strong> 727723EUCS260</p>
          <p style={styles.infoText}><strong>Program:</strong> Computer Science</p>
        </div>
      </section>

      {/* Grades Table */}
      <section style={styles.section}>
        <h2 style={styles.tableHeading}>CURRENT SEMESTER GRADES</h2>
        <div style={styles.detailsBox}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Course Name</th>
                <th style={styles.th}>Course Code</th>
                <th style={styles.th}>Grade</th>
                <th style={styles.th}>Credits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>React</td>
                <td style={styles.td}>23CS201</td>
                <td style={styles.td}>O</td>
                <td style={styles.td}>4</td>
              </tr>
              <tr>
                <td style={styles.td}>Design Analysis and Design</td>
                <td style={styles.td}>23CS202</td>
                <td style={styles.td}>A+</td>
                <td style={styles.td}>4</td>
              </tr>
              <tr>
                <td style={styles.td}>Advanced Java</td>
                <td style={styles.td}>23CS203</td>
                <td style={styles.td}>O</td>
                <td style={styles.td}>4</td>
              </tr>
              <tr>
                <td style={styles.td}>Mathematics</td>
                <td style={styles.td}>23CS204</td>
                <td style={styles.td}>O</td>
                <td style={styles.td}>4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CGPA and Remarks Section */}
      <section style={styles.section}>
        <h2 style={styles.cgpaHeading}>CGPA</h2>
        <div style={styles.detailsBox}>
          <p style={styles.infoText}><strong>Current CGPA:</strong> 9.5</p>
          <p style={styles.infoText}><strong>Remarks:</strong> Excellent performance. Keep up the great work!</p>
        </div>
      </section>

      {/* Feedback Section */}
      <section style={styles.section}>
        <h2 style={styles.feedbackHeading}>INSTRUCTOR FEEDBACK</h2>
        <div style={styles.detailsBox}>
          <p style={styles.infoText}>Your performance this semester has been outstanding. You demonstrate a deep understanding of the material, particularly your recent project. Keep up the fantastic work!</p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Roboto', sans-serif", // Modern font
    backgroundColor: '#f5f7fa', // Lighter background for a cleaner look
    minHeight: '100vh',
    color: '#2c3e50',
  },
  backIconContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '30px',
  },
  backIcon: {
    cursor: 'pointer',
    fontSize: '28px',
    color: '#3498db', // Softer blue for better readability
    transition: 'color 0.3s ease',
  },
  backIconHover: {
    '&:hover': {
      color: '#2980b9',
    },
  },
  academicHeading: {
    fontSize: '36px',
    color: '#2c3e50',
    textAlign: 'center',
    margin: '20px 0',
    fontWeight: '500',
  },
  section: {
    marginBottom: '40px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', // Softer shadow for elegance
    padding: '30px', // More padding for cleaner layout
  },
  studentHeading: {
    fontSize: '24px',
    color: '#2980b9',
    borderBottom: '2px solid #2980b9',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  tableHeading: {
    fontSize: '24px',
    color: '#e67e22',
    borderBottom: '2px solid #e67e22',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  cgpaHeading: {
    fontSize: '24px',
    color: '#27ae60',
    borderBottom: '2px solid #27ae60',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  feedbackHeading: {
    fontSize: '24px',
    color: '#8e44ad',
    borderBottom: '2px solid #8e44ad',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  infoText: {
    fontSize: '16px',
    lineHeight: '1.8', // Increased line height for readability
    color: '#34495e', // Darker shade for text for contrast
  },
  detailsBox: {
    border: '1px solid #dfe6e9',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9fbfc',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px', // Adds spacing between rows for a modern look
    textAlign: 'left',
  },
  th: {
    padding: '12px 15px',
    backgroundColor: '#ecf0f1', // Softer gray background for headers
    fontWeight: '600',
    fontSize: '16px',
    color: '#2c3e50',
    borderBottom: '2px solid #dfe6e9',
  },
  td: {
    padding: '12px 15px',
    fontSize: '15px',
    color: '#2c3e50',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #dfe6e9',
    transition: 'background-color 0.3s ease',
  },
  tdHover: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
};

export default AcademicPerformance;
