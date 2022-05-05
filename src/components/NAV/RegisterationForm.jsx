import React, { useState, useEffect } from "react";
import { registerUser } from "../../axios-services";
// import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useContact from "../hooks/useContact";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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
  const { setToken } = useAuth();
  const { newEmail, setNewEmail } = useContact();
  const [confirmedPW, setConfirmedPW] = useState("");

  useEffect(() => {
    setIsError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successToast = (e) => {
    toast.success("Registration Success!", { theme: "colored" });
  };
  const failureToast = (error) => {
    toast.error(error, { theme: "colored" });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmedPW && password.length > 0) {
        const response = await registerUser(username, password, newEmail);
        setIsError(false);
        localStorage.setItem("token", response.token);
        setToken(response.token);
        setIsLogin(false);
        successToast();
      } else {
        setIsError(true);
        setErrorMessage("Password does not match.");
        failureToast("Password does not match.");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
      failureToast(error.message);
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPW = (e) => {
    setConfirmedPW(e.target.value);
  };

  const handleEmail = (e) => {
    setNewEmail(e.target.value);
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
            <input
              className="form-control rounded-4"
              type="text"
              value={username}
              onChange={handleUsername}
              required
            />
            <label htmlFor="username">Username: </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="password"
              value={password}
              onChange={handlePassword}
              required
              minLength={8}
            ></input>
            <label htmlFor="password">Password: </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="password"
              value={confirmedPW}
              onChange={handleConfirmPW}
              required
              minLength={8}
            ></input>
            <label htmlFor="Confirm password">Confirm Password: </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              value={newEmail || ""}
              onChange={handleEmail}
              required
            />
            <label htmlFor="email">Email: </label>
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
            className="loginRegisterRedirect"
            style={{ color: "blue" }}
            onClick={() => {
              setIsRegister(false);
            }}
          >
            {" login."}
          </span>
        </small>
      </div>
    </div>
  );
};

export default RegisterationForm;
