import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className="navbar">
      <div className="container-fluid mx-3">
        <a className="navbar-brand">
          <i className="fa fa-calendar-alt fs-4"></i> <h1 className="nav-title">{user?.name}</h1>
        </a>
        <button className="btn btn-outline-light" onClick={onLogout}>
          <i className="fa fa-sign-out-alt"></i> Log Out
        </button>
      </div>
    </nav>
  );
};
