import { addContact, deleteContact, fetchContacts } from 'servise/api';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const INITIAL_STATE = {
  contacts: [],
  isLoading: false,
  error: null,
};

export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetch',
  async (_, thunkAPI) => {
    try {
      const contacts = await fetchContacts();

      console.log(`contacts:`, contacts);
      return contacts;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/add',
  async (newContact, thunkAPI) => {
    try {
      const addedContact = await addContact(newContact);
      return addedContact;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/del',
  async (contactId, thunkAPI) => {
    try {
      const deletedContact = await deleteContact(contactId);
      return deletedContact;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState: INITIAL_STATE,

  extraReducers: builder =>
    builder
      // FETCH CONTACTS
      .addCase(fetchContactsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ADD CONTACT
      .addCase(addContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
      })
      .addCase(addContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(`state:`, state.error);
      }),
});

export const { delNumber } = phoneBookSlice.actions;
export const phoneBookReducer = phoneBookSlice.reducer;
