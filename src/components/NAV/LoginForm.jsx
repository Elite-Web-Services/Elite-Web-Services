import React, { useEffect } from 'react';
import { loginUser } from '../../axios-services/';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const LoginForm = ({
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
  const { setToken } = useAuth();

  useEffect(() => {
    setIsError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successToast = (e) => {
    toast.success('Log In Successful!', { theme: 'colored' });
  };
  const failureToast = (error) => {
    toast.error(error, { theme: 'colored' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      setIsError(false);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setIsLogin(false);
      successToast();
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
      failureToast(error.message);
    }
  };

  return (
    <div>
      <header className="modal-header p-5 pb-4 border-bottom-0">
        <h2 className="fw-bold mb-0">Login</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setIsLogin(false)}
        ></button>
      </header>
      <div className="modal-body p-5 pt-0">
        <form>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="loginFormUsername"
              name="loginFormUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="loginFormUsername">Username: </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password: </label>
          </div>
          <button
            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>
        {isError ? (
          <div className="errorMessage">
            <p>{`${errorMessage}`}</p>
          </div>
        ) : null}
        <small className="text-center text-muted">
          Don't have an account?
          <span
            className="loginRegisterRedirect"
            style={{ color: 'blue' }}
            onClick={() => {
              setIsRegister(true);
            }}
          >
            {' Register instead.'}
          </span>
        </small>
      </div>
    </div>
  );
};

export default LoginForm;
