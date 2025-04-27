import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import api from '../../axiosConfig';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('auth/login', formData);
      const user = await api.get('/auth/me')
      const safeUserData = {
        id: user.data.id,
        name: user.data.name,
        email: user.data.email,
        role:user.data.role
       
       
      };
      localStorage.setItem('user', JSON.stringify(safeUserData));
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  const navigateToForm = () => {
    navigate('/form'); // Navigate to the Form page
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Login</p>
        <p className="message">Login now and get full access to our app.</p>  
        
        {['email', 'password'].map(field => (
          <label key={field}>
            <input
              required
              type={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="input"
              placeholder=" "
            />
            <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
          </label>
        ))}

        <button type="submit" className="submit">Submit</button>
      </form>
      <button onClick={navigateToForm} className="external-submit">
        Login as Admin
      </button>
      <p className="signin">
        Don't have an account? <br />
        <Link to="/signup">Sign Up</Link>
      </p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
  display: flex;
  flex-direction: column;
  gap: 1vw;
  min-height:50vh;
  min-width: 35vw;
  background-color: #fff;
  padding: 5vw;
  margin-left: 2qqqq0vw;
  border-radius: 20px;
  position: relative;
}

.title {
  font-size: 3.5vh;
  color: royalblue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 2vw;
}

.title::before,.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message, .signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: royalblue;
}

.signin a:hover {
  text-decoration: underline royalblue;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 100%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,.form label .input:valid + span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: green;
}

.submit {
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: .3s ease;
}

.submit:hover {
  background-color: rgb(56, 90, 194);
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}`;

export default Login;
