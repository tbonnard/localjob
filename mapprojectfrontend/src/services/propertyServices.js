import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
const url = `${baseUrl}api/property/`
const urlCheck = `${baseUrl}api/propertycheck/`
const urlowner = `${baseUrl}api/propertyowner/`

const propertyCreation = async (itemObject) => {
  console.log(itemObject)
  axios.defaults.withCredentials = true;
  const userToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const response = await axios.post(`${url}`, itemObject ,
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    }} );
  // localStorage.setItem('propertyProjectApp', JSON.stringify(response.data));
  return response.data
}

const propertyEdit =  async (itemObject) => {
  axios.defaults.withCredentials = true;
  const userToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const response = await axios.put(`${url}${itemObject.uuid}/`, itemObject ,
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    }} );
  // localStorage.setItem('propertyProjectApp', JSON.stringify(response.data));
  return response.data
}



const checkIfPropertyCreated = async (itemObject) => {
  const response = await axios.post(`${urlCheck}`, itemObject );
  if (response.status === 200) {
    // localStorage.setItem('propertyProjectApp', JSON.stringify(response.data));
  }
  return response.data
}

const getPropertyDetails = async (uuid) => {
  const response = await axios.get(`${url}${uuid}` );
  // localStorage.setItem('propertyProjectApp', JSON.stringify(response.data));
  return response.data
}

const getPropertyOwner = async (uuid) => {
  const response = await axios.get(`${urlowner}${uuid}` );
  return response.data
}



const exportedObject = { propertyCreation, checkIfPropertyCreated, getPropertyDetails,getPropertyOwner, propertyEdit } 

export default exportedObject

