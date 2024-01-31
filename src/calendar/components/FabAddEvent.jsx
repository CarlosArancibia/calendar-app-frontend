import { useDispatch } from 'react-redux';
import { openModal } from '../../store/ui/uiSlice';
import { addHours } from 'date-fns';
import { startSetActiveEvent } from '../../store/calendar/thunks';

export const FabAddEvent = () => {
  const dispatch = useDispatch();

  const onAddNewEvent = () => {
    const newEvent = {
      start: new Date(),
      end: addHours(new Date(), 2),
      title: '',
      description: '',
    };

    dispatch(startSetActiveEvent(newEvent));
    dispatch(openModal());
  };

  return (
    <button className="btn btn-success fab fab-add" onClick={onAddNewEvent}>
      <i className="fa fa-add"></i>
    </button>
  );
};
