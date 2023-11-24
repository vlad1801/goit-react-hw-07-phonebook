import css from "./PhoneBook.module.css"

export const ContactList = ({ contacts, handleDelete }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: <span className={css.contactNumber}>{contact.phone}</span>
          <button className={css.deleteBtn} type="button" onClick={() => handleDelete(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
