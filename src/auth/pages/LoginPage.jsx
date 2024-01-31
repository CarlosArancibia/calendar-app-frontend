import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import { startLogin, startSignUp } from '../../store/auth/thunks';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

export const LoginPage = () => {
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginChange,
  } = useForm({
    loginEmail: '',
    loginPassword: '',
  });

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    formState,
    onInputChange: onRegisterChange,
  } = useForm({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
  });

  const { errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(startLogin(loginEmail, loginPassword));
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();

    const isFormValid = Object.values(formState).every((field) => field.length > 0);

    if (!isFormValid) {
      Swal.fire('Sign up failed', 'All fields are required', 'error');
      return;
    }

    if (registerPassword !== registerPassword2) {
      Swal.fire('Sign up failed', 'Passwords do not match', 'error');
      return;
    }

    dispatch(startSignUp(registerName, registerEmail, registerPassword));
  };

  useEffect(() => {
    if (errorMessage) {
      Swal.fire(
        'Authentication failed',
        errorMessage.msg ?? Object.values(errorMessage.errors)[0].msg,
        'error'
      );
    }
  }, [errorMessage]);

  return (
    <section className="vh-100 bg-custom d-flex justify-content-center align-items-center">
      <div className="container row">
        <article className="form form-left col-sm-12 col-md-6">
          <h1 className="title title-left">Cale</h1>
          <h2 className="fw-bold mt-md-5">Log In</h2>
          <small>Enter your account details</small>
          <form onSubmit={onLoginSubmit} noValidate>
            <div className="form-group mt-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginChange}
              />
            </div>
            <div className="form-group mt-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginChange}
              />
            </div>
            <div className="form-group mt-3">
              <button className="btn btn-success w-100">Log In</button>
            </div>
          </form>
          <article className="d-none d-sm-none d-md-block position-absolute bottom-0 text-secondary">
            <h3 className="fs-6 fw-bold">Log in with these users:</h3>
            <ul className="list-unstyled">
              <li>
                <small>
                  <i className="fa fa-user-alt fs-5 me-2 me-2"></i>
                  carlos@calendar.com
                </small>
                <small>
                  <i className="fa fa-unlock-alt fs-5 mx-2"></i> secret-calendar
                </small>
              </li>
              <li>
                <small>
                  <i className="fa fa-user-alt fs-5 me-2"></i>
                  mel@calendar.com
                </small>
                <small>
                  <i className="fa fa-unlock-alt fs-5 ms-4 me-2"></i> secret-calendar
                </small>
              </li>
            </ul>
          </article>
        </article>
        <article className="form form-right col-sm-12 col-md-6">
          <h1 className="title title-right">ndar</h1>
          <h2 className="fw-bold mt-md-5">Sign Up</h2>
          <small>Let's join with us</small>
          <form onSubmit={onRegisterSubmit} noValidate>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={onRegisterChange}
              />
            </div>
            <div className="form-group mt-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterChange}
              />
            </div>
            <div className="form-group mt-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterChange}
              />
            </div>
            <div className="form-group mt-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repeat password"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterChange}
              />
            </div>
            <div className="form-group mt-3">
              <button className="btn btn-primary w-100">Create account</button>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
};
