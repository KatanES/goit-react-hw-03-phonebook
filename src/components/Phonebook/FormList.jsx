import { ContactFilter } from './ContactFilter';

export const FormList = ({
  contacts,
  contactFilter,
  onChangeFilter,
  onDeleteContact,
}) => {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(contactFilter.toLowerCase())
  );

  return (
    <div>
      <ContactFilter value={contactFilter} onChange={onChangeFilter} />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
