import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

// const tempEvent = {
//   id: 'a',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   title: 'Test',
//   description: 'notes',
//   bgColor: '#333',
//   user: { id: 123, name: 'Carlos' },
// };

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    setActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    addNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.isLoadingEvents = false;
    },
    updateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) return payload;
        return event;
      });
    },
    deleteEvent: (state, { payload }) => {
      state.activeEvent = null;
      state.events = state.events.filter(({ id }) => id !== payload);
    },
    loadEvents: (state, { payload }) => {
      state.events = payload;
      state.isLoadingEvents = false;
    },
    clearEvents: (state) => {
      state.events = [];
      state.activeEvent = null;
      state.isLoadingEvents = true;
    },
  },
});

export const { setActiveEvent, addNewEvent, updateEvent, deleteEvent, loadEvents, clearEvents } =
  calendarSlice.actions;
