import axios from 'axios';

const contactApi = axios.create({
  baseURL: 'https://653bcbb8d5d6790f5ec77443.mockapi.io',
});

export const fetchContacts = async () => {
    const { data } = await contactApi.get('/contacts');
  return data
};

export const addContact = async newContact => {
    const { data } = await contactApi.post('/contacts', newContact);
  return data
};

export const deleteContact = async id => {
    const {data} = await contactApi.delete(`/contacts/${id}`)
    return data
}