import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
const urlCreate = `${baseUrl}api/project/`
const url = `${baseUrl}api/projects/`
const urlAll = `${baseUrl}api/allprojects/`
const urlActiveOrNot = `${baseUrl}api/projectsall/`


const getProjectsfromProperty = async (itemObject) => {
  const response = await axios.post(`${url}`, itemObject );
  return response.data
}

const getProjectsfromPropertyActiveOrNot =  async (itemObject) => {
  const response = await axios.post(`${urlActiveOrNot}`, itemObject );
  return response.data
}


const createProject = async (itemObject) => {
    axios.defaults.withCredentials = true;
    const userToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const response = await axios.post(`${urlCreate}`, itemObject,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'X-CSRFToken': csrftoken,
        'Content-Type': 'application/json',
      }} );
    return response.data
}

const getNearbyProjectsfromProperties = async (itemObject) => {
  const response = await axios.post(`${urlAll}`, itemObject );
  return response.data
}

const getProjectDetails = async (uuid) => {
  const response = await axios.get(`${urlCreate}${uuid}` );
  return response.data
}

const editProject = async (itemObject) => {
  axios.defaults.withCredentials = true;
  const userToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const response = await axios.put(`${urlCreate}${itemObject.uuid}/`, itemObject,
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    }} );
  return response.data
}

const exportedObject = {editProject, getProjectsfromProperty,getProjectsfromPropertyActiveOrNot, createProject, getNearbyProjectsfromProperties, getProjectDetails } 

export default exportedObject

