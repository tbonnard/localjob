import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
const url = `${baseUrl}api/follow/`
const urlAll = `${baseUrl}api/follows/`
const urlfollowedproperties = `${baseUrl}api/projectsfollowedpropertiesuser/`
const urlcheckFollowUserAllProjectsPropertiesFollowed =  `${baseUrl}api/projectsfolloweduser/`


const checkFollow = async (itemObject) => {
  axios.defaults.withCredentials = true;
  const userToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

  const response = await axios.post(`${urlAll}`, itemObject,
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    }} );

  const returnedData = response.data
//sort by name
  returnedData.sort((a, b) => {
        const nameA = a.properties[0].name.toUpperCase(); // Convert to uppercase to make it case-insensitive
        const nameB = b.properties[0].name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }); 
      
  return returnedData
}

const removeFollow = async (itemObject) => {
  axios.defaults.withCredentials = true;
  const userToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

  const response = await axios.delete(`${url}${itemObject}`,
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    }} );
  return response.data
}

const addFollow = async (itemObject) => {
  axios.defaults.withCredentials = true;
  const userToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

  const response = await axios.post(`${url}`, itemObject,
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    }} );
  return response.data
}


const checkFollowUserPropertyProjects = async (itemObject) => {
  axios.defaults.withCredentials = true;
  const userToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

  const response = await axios.post(`${urlfollowedproperties}`, itemObject,
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    }} );
  return response.data
}

const exportedObject = { checkFollow, removeFollow, addFollow , checkFollowUserPropertyProjects} 

export default exportedObject

