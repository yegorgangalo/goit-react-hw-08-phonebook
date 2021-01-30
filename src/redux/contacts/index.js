export {fetchContacts, addContact, deleteContact, patchContact} from './contacts-operations';
export { getItems, getFilter, getLoading, getError } from './contacts-selectors';
export { changeFilter, editContact } from './contacts-actions';
export {default as contactsReducer} from './contacts-reducer'