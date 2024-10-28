import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NewInstance from './createInstance';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CourseManagement() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [courses, setCourses] = useState([]);
  const [additionalCourses, setAdditionalCourses] = useState([
    { id: 1, name: 'Artificial Intelligence and Machine Learning ', image: 'https://i.ytimg.com/vi/GhTREKMYp34/maxresdefault.jpg',},
    { id: 2, name: 'Programming using Python', image: 'https://i.ytimg.com/vi/sxTmJE4k0ho/maxresdefault.jpg'},
    { id: 3, name: 'Front End Development using React', image: 'https://i.ytimg.com/vi/t8o4QM0eYA4/maxresdefault.jpg', },
    { id: 4, name: 'Data Structures and Algorithms', image: 'https://tse3.mm.bing.net/th?id=OIP.Sp0t5mOavegNBHaBWjfatgHaEK&pid=Api&P=0&h=180', },
    { id: 5, name: 'Design Thinking Fundamentals', image: 'https://tse4.mm.bing.net/th?id=OIP.joHqYtkAF9KAdyA_ar0jHQAAAA&pid=Api&P=0&h=180',},
    { id: 6, name: 'Programming using Java', image: 'https://i.ytimg.com/vi/Ku20QtzU5oQ/maxresdefault.jpg', },
    // Add more courses as needed
  ]); 
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [credits, setCredits] = useState('');
  const [instructor, setInstructor] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch courses from JSON server
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await NewInstance.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Add a new course
  const handleAddCourse = async () => {
    const newCourse = {
      courseName,
      courseCode,
      credits,
      instructor,
      description,
      startDate,
      endDate,
    };

    try {
      const response = await NewInstance.post('/courses', newCourse);
      setCourses([...courses, response.data]);

      // Clear the form
      setCourseName('');
      setCourseCode('');
      setCredits('');
      setInstructor('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Cannot add course:', error);
      alert('Cannot add course: ' + (error.response ? error.response.data : 'Network error'));
    }
  };

  // Remove a course
  const handleRemoveCourse = async (id) => {
    try {
      await NewInstance.delete(`/courses/${id}`);
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Cannot remove course:', error);
      alert('Cannot remove course: ' + (error.response ? error.response.data : 'Network error'));
    }
  };

  // Navigate back using React Router
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleEnroll = (courseName) => {
    alert(`Enrolled in ${courseName}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.backIconContainer}>
        <ArrowBackIcon onClick={handleBack} style={styles.backIcon} />
      </div>

      <h2 style={styles.title}>Course Management</h2>
      
      <div style={styles.formContainer}>
        <h3>Add New Course</h3>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddCourse} style={styles.button}>
          Add Course
        </button>
      </div>

      <h3>Course List</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Course Name</th>
            <th style={styles.th}>Course Code</th>
            <th style={styles.th}>Credits</th>
            <th style={styles.th}>Instructor</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Start Date</th>
            <th style={styles.th}>End Date</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td style={styles.td}>{course.courseName}</td>
              <td style={styles.td}>{course.courseCode}</td>
              <td style={styles.td}>{course.credits}</td>
              <td style={styles.td}>{course.instructor}</td>
              <td style={styles.td}>{course.description}</td>
              <td style={styles.td}>{course.startDate}</td>
              <td style={styles.td}>{course.endDate}</td>
              <td style={styles.td}>
                <button onClick={() => handleRemoveCourse(course.id)} style={styles.removeButton}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Additional Courses</h3>
      <div style={styles.additionalCoursesContainer}>
        {additionalCourses.map((course) => (
          <div key={course.id} style={styles.card}>
            <img src={course.image} alt={course.name} style={styles.courseImage} />
            <h4>{course.name}</h4>
            <p>{course.code}</p>
            <button onClick={() => handleEnroll(course.name)} style={styles.enrollButton}>Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    marginBottom: '20px',
  },
  backIcon: {
    cursor: 'pointer',
    fontSize: '24px',
  },
  title: {
    marginBottom: '20px',
  },
  formContainer: {
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    margin: '10px auto',
    padding: '10px',
    width: '80%',
    maxWidth: '400px',
  },
  textarea: {
    display: 'block',
    margin: '10px auto',
    padding: '10px',
    width: '80%',
    maxWidth: '400px',
    height: '60px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2E3B55',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    width: '80%',
    margin: '20px auto',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '10px',
    backgroundColor: '#2E3B55',
    color: 'white',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#FF5733',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  additionalCoursesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '150px',
    margin: '10px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  courseImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  enrollButton: {
    padding: '5px 10px',
    backgroundColor: '#2E3B55',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CourseManagement;
