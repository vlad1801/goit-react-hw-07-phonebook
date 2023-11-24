import {  useState } from 'react';
import css from "./PhoneBook.module.css"


export const PhoneForm = ({handleAddNumber}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')


  const handleInput = (event) =>{
    switch(event.target.name){
      case "name": setName(event.target.value);break;
      case "number": setPhone(event.target.value);break;
      default:
    }
  }

  return (
    <form className={css.contactForm}
      onSubmit={event => {
        handleAddNumber({
          event,
          name,
          phone,
        });
        setName('')
        setPhone('')
      }}
    >
      <label>
        Name
        <input
        className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleInput}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Contact name"
          required
        />
      </label>
      <label>
        Number
        <input
        className={css.input}
          type="tel"
          name="number"
          value={phone}
          onChange={handleInput}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Contact number"
          required
        />
      </label>
      <button className={css.addBtn} type="submit">Add contact</button>
    </form>
  );
}

