import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginType, setLoginType] = useState('student');
  const [registerNumber, setRegisterNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const emailPattern = /^[a-z]+@gmail\.com$/;
  const registerNumberPattern = /^727723EUCS(00[1-9]|0[1-9]\d|[1-2]\d{2}|300)$/; // Pattern for 727723EUCS001-300
  const navigate = useNavigate();

  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
    setErrors({});
    if (event.target.value === 'student') {
      setEmail('');
    } else {
      setRegisterNumber('');
    }
  };

  const handleLogin = () => {
    const validationErrors = {};
    
    // Student validation
    if (loginType === 'student') {
      if (!registerNumber) {
        validationErrors.registerNumber = 'Register Number is required';
      } else if (!registerNumberPattern.test(registerNumber)) {
        validationErrors.registerNumber = 'Register Number must be in the format: 727723EUCS001-300';
      }
    }

    // Staff validation
    if (loginType === 'staff') {
      if (!email) {
        validationErrors.email = 'Email is required';
      } else if (!emailPattern.test(email)) {
        validationErrors.email = 'Email must be in the format: lowercase@gmail.com';
      }
    }

    // Password validation
    if (!password) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Redirect based on the user type
      if (loginType === 'student') {
        navigate('/home'); // Redirect to HomePage for students
      } else {
        navigate('/admin-home'); // Redirect to AdminHomePage for staff
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.box}>
      <h1 style={styles.header}>LOGIN</h1>
      <FormControl component="fieldset" style={styles.formControl}>
        <FormLabel component="legend" style={styles.legend}>Are you a student or staff?</FormLabel>
        <RadioGroup
          aria-label="login-type"
          name="login-type"
          value={loginType}
          onChange={handleLoginTypeChange}
          row
        >
          <FormControlLabel value="student" control={<Radio />} label="Student" />
          <FormControlLabel value="staff" control={<Radio />} label="Staff" />
        </RadioGroup>
      </FormControl>
      {loginType === 'student' ? (
        <TextField
          id="register-number-input"
          label="Enter Register Number"
          type="text"
          autoComplete="off"
          variant="outlined"
          fullWidth
          value={registerNumber}
          onChange={(e) => setRegisterNumber(e.target.value)}
          error={!!errors.registerNumber}
          helperText={errors.registerNumber}
        />
      ) : (
        <TextField
          id="email-input"
          label="Enter Email"
          type="email"
          autoComplete="off"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
      )}
      <TextField
        id="password-input"
        label="Enter Password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<LoginIcon />}
        style={styles.button}
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
}

const styles = {
  box: {
    width: '450px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
    marginTop: '100px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    marginTop: '20px',
  },
  formControl: {
    marginTop: '20px',
  },
  legend: {
    marginBottom: '10px',
  },
};

export default Login;
