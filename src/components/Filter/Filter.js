import React from 'react';
import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter, getFilter } from 'redux/contacts';

function Filter() {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);
    const onChangeFilter = ({ target }) => dispatch(changeFilter(target.value));

        return <div className={s.labelBlock} >
            <h4  className={s.title}>Find contacts by name, number or level</h4>
            <input className={s.input} type="text" name="filter" value={filter} onChange={onChangeFilter} />
            </div>
}

export default Filter;