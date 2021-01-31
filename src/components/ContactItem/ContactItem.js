import {useContext, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Context from 'components/Context';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import {deleteContact} from 'redux/contacts/contacts-operations';
import {editContact} from 'redux/contacts/contacts-actions';
import {getLoading, getItems} from 'redux/contacts/contacts-selectors';
import IconButton from 'components/IconButton';
import Spinner from 'components/Spinner';
import s from './ContactItem.module.css';

function ContactItem({ id, name, number }) {
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const { toggleModal } = useContext(Context);
    const loading = useSelector(getLoading);
    const contacts = useSelector(getItems);

    useEffect(() => {
        setIsEdit(false);
    }, [contacts])

    const openEditModal = () => {
        toggleModal();
        const contactInfo = { id, name, number};
        dispatch(editContact(contactInfo));
        setIsEdit(true);
    }

    const deleteContactById = () => {
        dispatch(deleteContact(id));
        setIsEdit(true);
    };
    return (
        <>
            <span className={s.point}>{name}:</span>
            <span className={s.point}>{number}</span>
            <span className={s.positionBtn}>
                {loading && isEdit ?
                    <IconButton onClick={openEditModal} aria-label="Loading" classNames={s.colorBtn}>
                        <Spinner classNames={s.spinner} />
                    </IconButton>
                : <>
                    <IconButton onClick={openEditModal} aria-label="Edit Contact" classNames={s.colorBtn}>
                        <FaRegEdit />
                    </IconButton>
                    <IconButton onClick={deleteContactById} aria-label="Delete Contact" classNames={s.colorBtn}>
                        <MdDelete />
                    </IconButton>
                </>}
            </span>
        </>
    )
}

export default ContactItem;