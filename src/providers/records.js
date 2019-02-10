import axios from 'axios';
const api = process.env.REACT_APP_RECORDS_API_URL

export const getAllRecords = () =>
  axios.get(`${api}/accountdata`)

export const postRecord = (body) =>
  axios.post(`${api}/accountdata`, body)

export const update = (id, body) =>
  axios.put(`${api}/accountdata/${id}`, body)

export const deleteRecord = (id) =>
  axios.delete(`${api}/accountdata/${id}`)