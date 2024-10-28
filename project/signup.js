import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Sign({ onCancel }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formValues, setFormValues] = useState({
    name: '',
    registerNumber: '',
    email: '',
    mobileNumber: '',
    age: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    const errors = {};

    // Basic validation for empty fields
    if (!formValues.name) errors.name = 'Name is required';
    if (!formValues.registerNumber) errors.registerNumber = 'Register Number is required';
    if (!formValues.email) errors.email = 'Email is required';
    if (!formValues.mobileNumber) errors.mobileNumber = 'Mobile Number is required';
    if (!formValues.age) errors.age = 'Age is required';
    if (!formValues.gender) errors.gender = 'Gender is required';

    // Password validation
    if (!formValues.password) errors.password = 'Password is required';
    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      alert('Sign Up Successful');
      navigate('/dashboard'); // Navigate to the desired route after sign-up
      // You might want to reset form values here
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div style={styles.box}>
      <h1 style={styles.header}>SIGN UP</h1>
      <div style={styles.formRow}>
        <div style={styles.column}>
          <p style={styles.label}>Name</p>
          <TextField
            id="name-input"
            label="Enter Your First Name"
            name="name"
            type="text"
            autoComplete="off"
            variant="outlined"
            fullWidth
            value={formValues.name}
            onChange={handleChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
        </div>
        <div style={styles.column}>
          <p style={styles.label}>Register Number</p>
          <TextField
            id="register-number-input"
            label="Enter Your Register Number"
            name="registerNumber"
            type="text"
            autoComplete="off"
            variant="outlined"
            fullWidth
            value={formValues.registerNumber}
            onChange={handleChange}
            error={!!formErrors.registerNumber}
            helperText={formErrors.registerNumber}
          />
        </div>
      </div>
      <div style={styles.formRow}>
        <div style={styles.column}>
          <p style={styles.label}>Email</p>
          <TextField
            id="email-input"
            label="Enter Your Email"
            name="email"
            type="email"
            autoComplete="off"
            variant="outlined"
            fullWidth
            value={formValues.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
        </div>
        <div style={styles.column}>
          <p style={styles.label}>Mobile Number</p>
          <TextField
            id="mobile-number-input"
            label="Enter Your Mobile Number"
            name="mobileNumber"
            type="text"
            autoComplete="off"
            variant="outlined"
            fullWidth
            value={formValues.mobileNumber}
            onChange={handleChange}
            error={!!formErrors.mobileNumber}
            helperText={formErrors.mobileNumber}
          />
        </div>
      </div>
      <div style={styles.formRow}>
        <div style={styles.column}>
          <p style={styles.label}>Age</p>
          <TextField
            id="age-input"
            label="Enter Your Age"
            name="age"
            type="number"
            autoComplete="off"
            variant="outlined"
            fullWidth
            value={formValues.age}
            onChange={handleChange}
            error={!!formErrors.age}
            helperText={formErrors.age}
          />
        </div>
        <div style={styles.column}>
          <FormControl component="fieldset" style={styles.genderGroup} error={!!formErrors.gender}>
            <FormLabel component="legend" style={styles.label}>Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            {formErrors.gender && <p style={styles.errorText}>{formErrors.gender}</p>}
          </FormControl>
        </div>
      </div>
      <div style={styles.formRow}>
        <div style={styles.column}>
          <p style={styles.label}>Password</p>
          <TextField
            id="password-input"
            label="Enter Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
            variant="outlined"
            fullWidth
            value={formValues.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div style={styles.column}>
          <p style={styles.label}>Confirm Password</p>
          <TextField
            id="confirm-password-input"
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
            variant="outlined"
            fullWidth
            value={formValues.confirmPassword}
            onChange={handleChange}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div style={styles.buttonRow}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LoginIcon />}
          style={styles.button}
          fullWidth
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={styles.cancelButton}
          fullWidth
          onClick={onCancel} // Call the onCancel function when clicking Cancel
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

const styles = {
  box: {
    width: '500px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  column: {
    flex: '0 0 48%',
  },
  label: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  button: {
    marginBottom: '10px',
  },
  cancelButton: {
    marginTop: '10px',
  },
  genderGroup: {
    marginTop: '15px',
  },
  errorText: {
    color: 'red',
    fontSize: '12px',
  },
};

export default Sign;
