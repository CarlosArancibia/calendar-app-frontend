import Swal from 'sweetalert2';
import calendarApi from '../../api/calendarApi';
import { parseDateEvents } from '../../helpers/parseDateEvents';
import { addNewEvent, deleteEvent, loadEvents, setActiveEvent, updateEvent } from './calendarSlice';

export const startSaveEvent = (eventData) => {
  return async (dispatch) => {
    try {
      if (eventData.id) {
        //update
        await calendarApi.put(`/events/${eventData.id}`, eventData);
        dispatch(updateEvent({ ...eventData }));
        return;
      }

      //create
      const { data } = await calendarApi.post('/events', eventData);

      dispatch(addNewEvent({ ...eventData, id: data.event.id }));
    } catch (error) {
      Swal.fire('Error saving', error.response.data?.msg, 'error');
    }
  };
};

export const startDeleteEvent = (eventId) => {
  return async (dispatch) => {
    try {
      await calendarApi.delete(`/events/${eventId}`);
      dispatch(deleteEvent(eventId));
    } catch (error) {
      Swal.fire('Delete error', error.response.data?.msg, 'error');
    }
  };
};

export const startLoadingEvents = () => {
  return async (dispatch) => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = parseDateEvents(data.events);

      dispatch(loadEvents(events));
    } catch (error) {
      Swal.fire('Error loading Events', 'Something went wrong loading the events', 'error');
    }
  };
};

export const startSetActiveEvent = (eventData) => {
  return async (dispatch, getState) => {
    const { user } = getState().auth;

    dispatch(setActiveEvent({ ...eventData, user }));
  };
};
