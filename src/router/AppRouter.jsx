import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startCheckAuthToken } from '../store/auth/thunks';
import { Loader } from '../ui/components/Loader';

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startCheckAuthToken());
  }, []);

  if (status === 'checking') return <Loader />;

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to={'auth/login'} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to={'/'} />} />
        </>
      )}

      <Route path="/*" element={<Navigate to={'/auth/login'} />} />
    </Routes>
  );
};
