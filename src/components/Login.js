import React, { useState } from 'react';

function LogIn() {
  const [details, setDetails] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    emailErr: '',
    passwordErr: ''

  });
  
  const [showPassword, setShowPassword] = useState(false);
  
  const handleForm = (e) => {
    const { name, value } = e.target;
  

    setDetails({
      ...details,
      [name]: value
    });
  
   
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        emailErr: !value ? 'This field is required' : (!emailRegex.test(value) ? 'Invalid email format' : '')
      });
    } else if (name === 'password') {
      setErrors({
        ...errors,
        passwordErr: !value ? 'This field is required' : (value.length < 8 ? 'Password must be at least 8 characters' : '')
      });
    }
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.emailErr && !errors.passwordErr) {
     
      console.log(details);
    }
  };
  
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formEmail" className="form-label">Email address</label>
          <input
            type="email"
            className={`form-control ${errors.emailErr ? 'border-danger' : ''}`}
            id="formEmail"
            name="email"
            value={details.email}
            onChange={handleForm}
            required
          />
          {errors.emailErr && <p className="text-danger">{errors.emailErr}</p>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="formPassword" className="form-label">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control ${errors.passwordErr ? 'border-danger' : ''}`}
            id="formPassword"
            name="password"
            value={details.password}
            onChange={handleForm}
            required
            minLength="8"
          />
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPasswordCheck"
              checked={showPassword}
              onChange={() => setShowPassword(prevState => !prevState)}
            />
            <label className="form-check-label" htmlFor="showPasswordCheck">Show Password</label>
          </div>
          {errors.passwordErr && <p className="text-danger">{errors.passwordErr}</p>}
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={errors.emailErr || errors.passwordErr}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LogIn;
