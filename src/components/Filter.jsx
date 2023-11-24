import { useDispatch, useSelector } from 'react-redux';
import css from './PhoneBook.module.css';
import { setFilter } from 'redux/filterReducer';

export const Filter = () => {
  const dispatch = useDispatch();

  const filter = useSelector(state => state.filter);

  const setNewFilter = newFilter => {
    dispatch(setFilter(newFilter));
  };

  return (
    <input
      className={css.input}
      type="text"
      name="filter"
      value={filter.filter}
      onChange={event => setNewFilter(event.target.value)}
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      placeholder="Search..."
      autoComplete="off"
      required
    />
  );
};
