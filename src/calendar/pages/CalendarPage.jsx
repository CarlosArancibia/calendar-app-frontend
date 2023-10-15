import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../helpers/calendarLocalizer';
import { CalendarModal, FabAddEvent, Navbar } from '../components';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveEvent } from '../../store/calendar/calendarSlice';
import { openModal } from '../../store/ui/uiSlice';
import { FabDeleteEvent } from '../components/FabDeleteEvent';
import { useEffect } from 'react';
import { startLoadingEvents } from '../../store/calendar/thunks';

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') ?? 'month');
  const { events } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onViewChange = (view) => {
    localStorage.setItem('lastView', view);
    setLastView(view);
  };

  const onClickEvent = (event) => {
    dispatch(setActiveEvent(event));
  };

  const onDoubleClickEvent = () => {
    dispatch(openModal());
  };

  useEffect(() => {
    dispatch(startLoadingEvents());
  }, []);

  const changeStyleEvent = (event) => {
    const isMyEvent = event.user._id === user.uid || event.user.uid === user.uid;

    const style = {
      backgroundColor: isMyEvent ? '#0062cc' : '#465660',
      opacity: 0.8,
      color: '#fff',
    };

    return { style };
  };

  return (
    <div>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 'calc(100vh - 130px)', margin: '30px' }}
        components={{
          event: CalendarEvent,
        }}
        defaultView={lastView}
        onView={onViewChange}
        onSelectEvent={onClickEvent}
        onDoubleClickEvent={onDoubleClickEvent}
        eventPropGetter={changeStyleEvent}
      />
      <CalendarModal />
      <FabAddEvent />
      <FabDeleteEvent />
    </div>
  );
};
