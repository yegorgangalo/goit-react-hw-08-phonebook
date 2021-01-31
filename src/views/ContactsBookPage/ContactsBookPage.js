import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Context from 'components/Context';
import ContactFormik from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Modal from 'components/Modal';
import IconButton from 'components/IconButton';
import s from './ContactsBookPage.module.css';
import { IoClose } from 'react-icons/io5';
import { editContact, fetchContacts, getLoading, getError, getItems } from 'redux/contacts';
/* ----------------------------------------------------------------------- */

function ContactsBookPage () {
  const [showModal, setShowModal] = useState(false);

  const loading = useSelector(getLoading);
  const contactsError = useSelector(getError);
  const contacts = useSelector(getItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch])

  const toggleModal = () => {
    setShowModal(value => !value);
  }

  const openFreshModal = () => {
    toggleModal();
    dispatch(editContact(null));
  }

  const contactsNotify = () => {toast(contactsError)};

      return (
        <>
          {/* <h1 className={s.title}>Phonebook</h1> */}
          <div className={s.row}>
          <h1 className={s.title}>My Contacts</h1>
          <IconButton onClick={openFreshModal} aria-label="Open Modal" classNames={s.iconButtonOpenModal}> Add Contact </IconButton>
          </div>
          {showModal && (
            <Modal onClose={toggleModal}>
              <ContactFormik toggleModal={toggleModal}/>
              <IconButton onClick={toggleModal} aria-label="Close Modal" classNames={s.iconButtonCloseModal}>
                  <IoClose/>
              </IconButton>
            </Modal>
          )}

          {contacts.length>1 && (<Filter/>)}
          <Context.Provider value={{toggleModal}}>
            <ContactList/>
          </Context.Provider>
          {loading && <h1>is loading...</h1>}
          {contactsError && contactsNotify()}
        </>
      )
}

export default ContactsBookPage;