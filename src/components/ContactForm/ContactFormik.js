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
  const defaultFormikStateValues = contactEditInfo ? { ...contactEditInfo, licence: true } : defaultStateValues;

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
           <div  role="group" aria-labelledby="radio-group" className={`${s.labelBlock} ${s.groupBlock}`}>
                <h3 className={s.title}>Your Level</h3>
                {expLevel.map(exp =>
                    <label key={exp}>
                        <Field type="radio"  className={s.inputBox} name="experience" value={exp} />
                        {exp}
                    </label>
                )}
            </div>
            <div role="group" aria-labelledby="checkbox-group" className={`${s.labelBlock} ${s.groupBlock}`}>
              <h3 className={s.title}>Your Skills</h3>
              {skills.map(skill =>
                <label key={skill}>
                    <Field type="checkbox"  className={s.inputBox} name="skills" value={skill} />
                    {skill}
                </label>
              )}
            </div>
            <label className={s.labelBlock}>
                <Field type="checkbox"  className={s.inputBox} name="licence" id="licence" />
                All data is right
            </label>

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
const expLevel = ['junior', 'middle', 'senior'];
const skills = ['HTML', 'CSS', 'JS', 'SCSS', 'Git', 'React'];
const defaultStateValues = {
  name: '',
  number: '',
  experience: '',
  licence: false,
  skills: [],
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
  const { experience, licence, name, number, skills } = formValues;
  return isSubmitting || experience === '' || !licence || name === '' || number === '' || skills.length === 0;
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