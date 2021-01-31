import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ContactItem from 'components/ContactItem';
import { getFilteredContacts} from 'redux/contacts/contacts-selectors';
import s from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(getFilteredContacts);

  return (
    <ul>
      {contacts.length>0 && contacts.map(({ id, name, number}) =>
        <li className={s.item} key={id}>
          <ContactItem
            id={id}
            name={name}
            number={number}
          />
        </li>
      )}
    </ul>
  )
}

ContactList.propTypes = {
      contacts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
      })),
}