import calendarApi from '../../api/calendarApi';
import { clearEvents } from '../calendar/calendarSlice';
import { checking, login, logout } from './authSlice';

export const startSignUp = (name, email, password) => {
  return async (dispatch) => {
    dispatch(checking());
    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password });
      localStorage.setItem('token', data.token);

      dispatch(login({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(logout(error.response?.data || '-'));
    }
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(checking());

    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);

      dispatch(login({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(logout(error.response?.data || '-'));
    }
  };
};

export const startCheckAuthToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) return dispatch(logout());

    try {
      const { data } = await calendarApi.get('/auth/renew');

      localStorage.setItem('token', data.token);

      dispatch(login({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(startLogout());
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(clearEvents());
    dispatch(logout());
  };
};
