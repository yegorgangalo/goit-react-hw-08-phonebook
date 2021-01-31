import {useContext} from 'react';
import { useDispatch } from 'react-redux';
import Context from 'components/Context';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import {deleteContact} from 'redux/contacts/contacts-operations';
import {editContact} from 'redux/contacts/contacts-actions';
import IconButton from 'components/IconButton';
import s from './ContactItem.module.css';

function ContactItem({ id, name, number/* , experience, skills  */}) {
    const dispatch = useDispatch();
    const { toggleModal } = useContext(Context);

    const openEditModal = () => {
        toggleModal();
        const contactInfo = { id, name, number/* , experience, skills */ };
        dispatch(editContact(contactInfo));
    }

    const deleteContactById = () => dispatch(deleteContact(id));
    return (
        <>
            <span className={s.point}>{name}:</span>
            <span className={s.point}>{number}</span>
            {/* <span className={s.point}>{experience},</span>
            <span className={s.point}>skills: {skills && skills.join(', ')}</span> */}
            <span className={s.positionBtn}>
                <IconButton onClick={openEditModal} aria-label="Edit Contact" classNames={s.colorBtn}>
                    <FaRegEdit />
                </IconButton>
                <IconButton onClick={deleteContactById} aria-label="Delete Contact" classNames={s.colorBtn}>
                    <MdDelete />
                </IconButton>
            </span>
        </>
    )
}

export default ContactItem;