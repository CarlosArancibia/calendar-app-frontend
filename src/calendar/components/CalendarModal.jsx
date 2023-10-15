import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { closeModal } from '../../store/ui/uiSlice';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { addHours, differenceInHours, differenceInMilliseconds } from 'date-fns';
import { startSaveEvent } from '../../store/calendar/thunks';
import Swal from 'sweetalert2';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { modalIsOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const validTitle = useMemo(() => {
    if (formSubmitted) return formState.title.length > 1 ? '' : 'is-invalid';
  }, [formSubmitted, formState.title]);

  useEffect(() => {
    if (activeEvent) {
      setFormState({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  const onDateChange = (date, changing) => {
    setFormState({
      ...formState,
      [changing]: date,
    });
  };

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  const onSaveEvent = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // validations
    const timeDifference = differenceInMilliseconds(formState.end, formState.start);

    if (isNaN(timeDifference) || timeDifference <= 0) {
      Swal.fire('Invalid dates', 'Check the dates entered', 'error');
      return;
    }

    if (formState.title.length < 1) return;

    // submit
    dispatch(startSaveEvent(formState));
    onCloseModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      className={'modal mo-2'}
      style={customStyles}
      overlayClassName={'modal-background'}
      contentLabel="Example Modal"
    >
      <h2 className="fs-2 ps-3">New Event</h2>
      <hr />
      <form className="container" onSubmit={onSaveEvent}>
        <div className="form-group">
          <label htmlFor="start">Start date</label>
          <DatePicker
            name="start"
            id="start"
            selected={formState.start}
            showTimeSelect
            dateFormat="Pp"
            className="form-control"
            onChange={(date) => onDateChange(date, 'start')}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="end">End date</label>
          <DatePicker
            name="end"
            id="end"
            minDate={formState.start}
            selected={formState.end}
            showTimeSelect
            dateFormat="Pp"
            className="form-control"
            onChange={(date) => onDateChange(date, 'end')}
          />
        </div>
        <hr />
        <div className="form-group">
          <label htmlFor="title">Title and notes</label>
          <input
            type="text"
            name="title"
            id="title"
            className={`form-control ${validTitle}`}
            placeholder="Event title"
            autoComplete="off"
            value={formState.title}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="description">Short description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            className="form-control"
            placeholder="Notes"
            value={formState.description}
            onChange={onInputChange}
          ></textarea>
          <small id="descriptionHelp" className="form-text text-muted">
            Adicional information
          </small>
        </div>
        <button type="submit" className="btn btn-outline-primary mt-3">
          <i className="fa fa-save"></i> <span>Save</span>
        </button>
      </form>
    </Modal>
  );
};
