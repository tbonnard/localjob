import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
const url = `${baseUrl}api/`

const loginUser = async credentials => {
    const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const response = await axios.post(`${url}login/`, credentials, {headers: {
        'X-CSRFToken': csrftoken
      }})
    return response.data
}

const logoutUser = async ()  => {
    const response = await axios.post(`${url}logout/`)
    return response.data
}

const createAccount = async (accountObject) => {
    const response = await axios.post(`${url}register/`, accountObject)
    return response.data
  }

const userDetails = async (id) => {
    axios.defaults.withCredentials = true;
    const userToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const response = await axios.get(`${url}user/${id}/`, 
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'X-CSRFToken': csrftoken,
        'Content-Type': 'application/json',
      }})
    return response.data
  }
  
const userEdit = async (user) => {
  axios.defaults.withCredentials = true;
  const userToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const csrftoken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const response = await axios.put(`${url}user/${user.uuid}/`, user,
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    }})
  return response.data
}

const exportedObject = { loginUser, logoutUser, createAccount, userDetails,userEdit  }

export default exportedObject