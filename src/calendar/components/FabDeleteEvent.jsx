import { useDispatch, useSelector } from 'react-redux';
import { startDeleteEvent } from '../../store/calendar/thunks';

export const FabDeleteEvent = () => {
  const { activeEvent } = useSelector((state) => state.calendar);
  const { modalIsOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const onDeleteEvent = () => {
    dispatch(startDeleteEvent(activeEvent.id));
  };

  return (
    <button
      className="btn btn-danger fab fab-delete"
      style={{ display: Boolean(activeEvent) && !modalIsOpen ? '' : 'none' }}
      onClick={onDeleteEvent}
    >
      <i className="fa fa-trash"></i>
    </button>
  );
};
