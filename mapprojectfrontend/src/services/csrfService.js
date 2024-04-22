import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
const url = `${baseUrl}api/get-csrf-token/`

const getCsrfToken = async () => {
    const response = await axios.post(`${url}`)
    document.cookie = `csrftoken=${response.data.csrftoken}; Path=/; samesite=Lax`
    return response.data
}


const exportedObject = { getCsrfToken }
export default exportedObject