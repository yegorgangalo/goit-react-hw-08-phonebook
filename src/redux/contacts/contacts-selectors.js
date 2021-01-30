import { createSelector } from '@reduxjs/toolkit';

export const getItems = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;
export const getLoading = state => state.contacts.loading;
export const getError = state => state.contacts.error;
export const getEditItem = state => state.contacts.editItem;

export const getFilteredContacts = createSelector(
    [getItems, getFilter],
    (contacts, filter) =>
        contacts.filter(contact =>
            Object.values(contact).some(val =>
                val.toString().toLowerCase().includes(filter)))
)