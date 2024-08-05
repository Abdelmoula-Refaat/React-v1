import React, { useState } from 'react';

function Register() {
  const [details, setDetails] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    emailErr: '',
    nameErr: '',
    usernameErr: '',
    passwordErr: '',
    confirmPasswordErr: ''
  });

  const [showPasswordOne, setShowPasswordOne] = useState(false);

  const handleForm = (e) => {
    const { name, value } = e.target;

    setDetails({
      ...details,
      [name]: value
    });

   
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors({
          ...errors,
          emailErr: !value ? 'This field is required' : (!emailRegex.test(value) ? 'Invalid email format' : '')
        });
        break;

      case 'name':
        setErrors({
          ...errors,
          nameErr: !value ? 'This field is required' : ''
        });
        break;

      case 'username':
        setErrors({
          ...errors,
          usernameErr: !value ? 'This field is required' : (/\s/.test(value) ? 'Username should not contain spaces' : '')
        });
        break;

      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        setErrors({
          ...errors,
          passwordErr: !value ? 'This field is required' : (!passwordRegex.test(value) ? 'Password must be at least 8 characters and include uppercase, lowercase, digit, and special character' : '')
        });
        break;

      case 'confirmPassword':
        setErrors({
          ...errors,
          confirmPasswordErr: value !== details.password ? 'Passwords do not match' : ''
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.emailErr && !errors.nameErr && !errors.usernameErr && !errors.passwordErr && !errors.confirmPasswordErr) {
      console.log(details);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
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
          <label htmlFor="formName" className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${errors.nameErr ? 'border-danger' : ''}`}
            id="formName"
            name="name"
            value={details.name}
            onChange={handleForm}
            required
          />
          {errors.nameErr && <p className="text-danger">{errors.nameErr}</p>}
        </div>

        
        <div className="mb-3">
          <label htmlFor="formUsername" className="form-label">Username</label>
          <input
            type="text"
            className={`form-control ${errors.usernameErr ? 'border-danger' : ''}`}
            id="formUsername"
            name="username"
            value={details.username}
            onChange={handleForm}
            required
          />
          {errors.usernameErr && <p className="text-danger">{errors.usernameErr}</p>}
        </div>

       
        <div className="mb-3">
          <label htmlFor="formPassword" className="form-label">Password</label>
          <input
            type={showPasswordOne ? 'text' : 'password'}
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
              checked={showPasswordOne}
              onChange={() => setShowPasswordOne(prevState => !prevState)}
            />
            <label className="form-check-label" htmlFor="showPasswordCheck">Show Password</label>
          </div>
          {errors.passwordErr && <p className="text-danger">{errors.passwordErr}</p>}
        </div>

        
        <div className="mb-3">
          <label htmlFor="formConfirmPassword" className="form-label">Confirm Password</label>
          <input
            type={showPasswordOne ? 'text' : 'password'}
            className={`form-control ${errors.confirmPasswordErr ? 'border-danger' : ''}`}
            id="formConfirmPassword"
            name="confirmPassword"
            value={details.confirmPassword}
            onChange={handleForm}
            required
          />
          {errors.confirmPasswordErr && <p className="text-danger">{errors.confirmPasswordErr}</p>}
        </div>

        
        <button type="submit" className="btn btn-primary" disabled={errors.emailErr || errors.nameErr || errors.usernameErr || errors.passwordErr || errors.confirmPasswordErr}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
