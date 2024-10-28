import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StudentProfile = () => {
  const defaultProfilePicture = 'https://tse1.mm.bing.net/th?id=OIP.K77dPgrHemZZloIRXIJIeQHaLG&pid=Api&P=0&h=180'; // Default profile picture URL
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [name, setName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Load default student details using JSONPlaceholder or your API
    axios.get('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => {
        const data = response.data;
        setName(data.name);
        setStudentID('727723EUCS260'); // Your default student ID
        setDob('2000-01-01'); // Default Date of Birth
        setGender('female'); // Default gender
        setContactInfo(data.email);
      })
      .catch((error) => console.log('Error fetching student details:', error));
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleUpdate = () => {
    // You can replace this with an API call to update the student details
    axios.put('https://jsonplaceholder.typicode.com/users/1', {
      name,
      studentID,
      dob,
      gender,
      contactInfo,
      profilePicture,
    })
    .then(() => {
      alert('Profile updated successfully!');
      navigate('/profile-summary'); // Navigate to a summary or confirmation page
    })
    .catch((error) => console.log('Error updating profile:', error));
  };

  return (
    <div style={styles.container}>
      {/* Back Icon */}
      <div style={styles.backIconContainer}>
        <ArrowBackIcon onClick={handleBack} style={styles.backIcon} />
      </div>

      <h2 style={styles.title}>Student Profile</h2>
      <div style={styles.profilePictureContainer}>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" style={styles.profilePicture} />
        ) : (
          <div style={styles.placeholderPicture}>No Image</div>
        )}
      </div>
      <input type="file" onChange={handleImageChange} accept="image/*" style={styles.fileInput} />
      
      <div style={styles.infoSection}>
        <p>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></p>
        <p>Student ID: <input type="text" value={studentID} onChange={(e) => setStudentID(e.target.value)} /></p>
        <p>Date of Birth: <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} /></p>
        <p>Gender: 
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </p>
        <p>Contact Information: 
          <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder="Email, Phone" />
        </p>
      </div>
      <button onClick={handleUpdate} style={styles.updateButton}>Update Profile</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  backIconContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '10px',
  },
  backIcon: {
    cursor: 'pointer',
    fontSize: '24px',
  },
  title: {
    marginBottom: '20px',
  },
  profilePictureContainer: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  profilePicture: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ccc',
  },
  placeholderPicture: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileInput: {
    marginBottom: '10px',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
  },
  updateButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default StudentProfile;
