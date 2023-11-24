import { createSelector } from "@reduxjs/toolkit"

const selectPhoneBook = state => state.phoneBook

export const selectContacts = createSelector(selectPhoneBook, phoneBook => phoneBook.contacts)
export const selectIsLoading = createSelector(selectPhoneBook, phoneBook => phoneBook.isLoading)
export const selectError = createSelector(selectPhoneBook, phoneBook => phoneBook.error)

