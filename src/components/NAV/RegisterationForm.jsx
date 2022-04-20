import React, { useEffect } from 'react';
import { registerUser } from '../../axios-services';
// import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const RegisterationForm = ({
  setIsLogin,
  setIsRegister,
  username,
  setUsername,
  password,
  setPassword,
  isError,
  setIsError,
  errorMessage,
  setErrorMessage,
}) => {
  const { user, setToken } = useAuth();

  useEffect(() => {
    setIsError(false);
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(username, password);
      setIsError(false);
      console.log('REGISTER USER RESPONSE: ', response);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setIsLogin(false);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <header className="modal-header p-5 pb-4 border-bottom-0">
        <h2 className="fw-bold mb-0">Register</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setIsLogin(false)}
        ></button>
      </header>
      <div className="modal-body p-5 pt-0">
        <form onSubmit={handleRegistration}>
          <div className="form-floating mb-3">
            <label htmlFor="username">Username: </label>
            <input
              className="form-control rounded-4"
              type="text"
              value={username}
              onChange={handleUsername}
              required
            />
          </div>
          <div className="form-floating mb-3">
            <label htmlFor="password">Password: </label>
            <input
              className="form-control rounded-4"
              type="password"
              value={password}
              onChange={handlePassword}
              required
              minLength={8}
            ></input>
          </div>
          <button
            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
            type="submit"
          >
            Register
          </button>
        </form>
        {isError ? (
          <div className="errorMessage">
            <p>{`${errorMessage}`}</p>
          </div>
        ) : null}
        <small className="text-center text-muted">
          Go back to
          <span
            style={{ color: 'blue' }}
            onClick={() => {
              setIsRegister(false);
            }}
          >
            {' login.'}
          </span>
        </small>
      </div>
    </div>
  );
};

export default RegisterationForm;
