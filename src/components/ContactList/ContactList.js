import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ContactItem from 'components/ContactItem';
import { getFilteredContacts} from 'redux/contacts/contacts-selectors';
import s from './ContactList.module.css';

function ContactList() {
  const contacts = useSelector(getFilteredContacts);

  return (
    <ul>
      {contacts.map(({ id, name, number, /* experience, skills  */}) =>
        <li className={s.item} key={id}>
          <ContactItem
            id={id}
            name={name}
            number={number}
            /* experience={experience}
            skills={skills} */
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
          /* experience: PropTypes.string.isRequired,
          skills: PropTypes.arrayOf(PropTypes.string.isRequired), */
      })),
}

export default ContactList;








// const toFilterContacts = (contactsArray, filter) =>
//      contactsArray.filter(contact =>
//            Object.values(contact)
//             .some(val => val.toString().toLowerCase().includes(filter)))

// const mapStateToProps = ({contacts:{items, filter}}) => ({
//   contacts: toFilterContacts(items, filter) ,
// })

// export default connect(mapStateToProps)(ContactList);