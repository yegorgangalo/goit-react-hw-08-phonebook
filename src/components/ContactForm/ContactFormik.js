import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editContact, addContact, patchContact, getItems } from 'redux/contacts';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import IconButton from 'components/IconButton';
import s from './ContactForm.module.css';
import { getEditItem } from 'redux/contacts/contacts-selectors';

/* ------------------------------------------------------------------------------------------------------------ */
function ContactFormik({ toggleModal }) {
  const contactEditInfo = useSelector(getEditItem);
  const defaultFormikStateValues = contactEditInfo ? contactEditInfo : defaultStateValues;

  const dispatch = useDispatch();
  const onAddContact = (value) => dispatch(addContact(value));
  const onPatchContact = (value) => dispatch(patchContact(value));
  const contacts = useSelector(getItems);

  return <Formik
          initialValues={defaultFormikStateValues}
          validationSchema={Yup.object().shape({
            name: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required'),
            number: Yup.number().max(1000000000000, 'Too Long!').positive().integer().required('Required'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (isContactDublicate(values, contactEditInfo, contacts, setSubmitting)) {
              return;
            }
            contactEditInfo ? onPatchContact({ ...values, id: contactEditInfo.id }) : onAddContact(values);
            setSubmitting(false);
            resetForm(defaultStateValues);
            dispatch(editContact(null));
            toggleModal();
          }}
        >
        {({isSubmitting, values}) => (
         <Form className={s.contactForm}>
           <label  className={s.title} htmlFor="name">Name </label>
           <Field className={s.labelBlock} type="text" name="name" autoFocus/>
           <ErrorMessage name="name" component="div" />
           <label  className={s.title} htmlFor="number">Number </label>
           <Field className={s.labelBlock} type="text" name="number" />
           <ErrorMessage name="number" component="div" />
            <IconButton
                type="submit"
                classNames={s.iconButtonAddContact}
                aria-label="submit button"
                disabled={isDisabledBtn(isSubmitting, values)}
            > {contactEditInfo ? 'Edit Contact' : 'Add Contact' } </IconButton>
         </Form>
       )}
  </Formik>
}

/* ------------------------------------------------------------------------------------------------------------ */
const defaultStateValues = {
  name: '',
  number: '',
};

/* ------------------------------------------------------------------------------------------------------------ */
function isContactDublicate (values, contactEditInfo, contacts, setSubmitting) {
  const { name, number } = values;
  if(!contactEditInfo && contacts.some(contact => contact.name===name || contact.number===number) ){
    alert(`Contact with such ${name} or ${number} is already in Phonebook`);
    setSubmitting(false);
    return true;
  }
  return false;
}

function isDisabledBtn (isSubmitting, formValues) {
  const { name, number} = formValues;
  return isSubmitting || name === '' || number === '';
}
/* ------------------------------------------------- */
ContactFormik.propTypes = {
        formSubmitHandler: PropTypes.shape({
          onAddContact: PropTypes.func.isRequired,
          onEditContact: PropTypes.func.isRequired,
        }),
        contacts: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
        })),
    }
/* ------------------------------------------------- */
export default ContactFormik;