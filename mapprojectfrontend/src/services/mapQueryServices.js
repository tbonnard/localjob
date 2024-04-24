import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

const url = `${baseUrl}api/querylocation/`
const urldb = `${baseUrl}api/querylocationdb/`
const urlSearchNearbyPosition = `${baseUrl}api/querylocationaround/`
const urlSearchAround = `${baseUrl}api/querylocationaroundall/`
const urlParameter = `${baseUrl}api/querylocationparameter/`


const getMapQueryData = async (parameterData) => {
    axios.defaults.withCredentials = false;
    const urlOSM = `https://nominatim.openstreetmap.org/search.php?q=${parameterData}&polygon_geojson=1&format=jsonv2&addressdetails=1&accept-language=fr-CA`
    const response = await axios.get(`${urlOSM}`)
    // console.log(response.data)
    return response.data
}

const getMapQueryDataParameter = async (itemObject) => {
  const response = await axios.post(`${urlParameter}`  ,  {itemObject})
  // console.log(response.data)
  return response.data
}

const getMapQueryDataSearchNearLocation = async (itemObject) => {
  // console.log(itemObject)
    const response = await axios.post(`${url}`, {itemObject})
    return response.data
}

const getMapQueryDataDBData = async (itemObject) => {
  // console.log(itemObject)
    const response = await axios.post(`${urldb}`, {itemObject})
    return response.data
}

const getMapQueryDataAroundCenterAll =  async (itemObject) => {
    // const urlOverpassTurbo = `https://www.overpass-api.de/api/interpreter?${parameterData}`
    // const exam = `[out:json][timeout:25];(rel[amenities="All"](around:500,${itemObject['lat']},${itemObject['lng']}););(._;>;);out;`
    // const eee = `[out:json];(node["amenity"](around:2000,${itemObject['lat']},${itemObject['lng']});way["amenity"](around:2000,${itemObject['lat']},${itemObject['lng']});relation["amenity"](around:2000,${itemObject['lat']},${itemObject['lng']}););out;>;`
    // const eeenwralltag = `[out:json];(nwr(around:200,${itemObject['lat']},${itemObject['lng']})[~"."~"."];);out;>;`
    // const eeenwr = `[out:json];(nwr["amenity"](around:100,${itemObject['lat']},${itemObject['lng']}););out;>;`

    //TO0 BIG AS A QUERY
    const eeenwrAll = `[out:json];(nwr(around:50,${itemObject['lat']},${itemObject['lng']}););out;>;`
    const urlOverpassTurbo = `https://overpass-api.de/api/interpreter?data=${eeenwrAll}`
    const response = await axios.get(`${urlOverpassTurbo}` )
    // console.log(response.data)
    return response.data

}


const getMapQueryDataAroundSpecificCoordinateParameter = async (itemObject) => {
    const coordinates = `${itemObject['coordinates']['lat']},${itemObject['coordinates']['lng']}`;
    const lat = itemObject['coordinates']['lat']
    const lon = itemObject['coordinates']['lng']
    const radius = 10000; // Adjust the radius to your desired value in meters
    const parameterData = itemObject['parameter']; // Replace with your specific content parameter
    
    const urlOSM = `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(parameterData)}&format=jsonv2&polygon_geojson=1&lat=${itemObject['coordinates']['lat']}&lon=${itemObject['coordinates']['lng']}&radius=${radius}`;
    

    try {

      const response = await axios.get(urlOSM);
    //   console.log(response.data)
        
      if (response.status === 200) {
        const itemObjectSearchAround = {properties:response.data, coordinates:{'lat': lat , 'lon': lon }}
        // console.log(itemObjectSearchAround)
        const responseBis = await axios.post(`${urlSearchAround}`, {itemObjectSearchAround})
        // console.log(responseBis.data)
        return responseBis.data
       
      } else {
        // console.error(`Request failed with status ${response.status}: ${response.statusText}`);
        return false; // or handle the error as needed
      }
    } catch (error) {
    //   console.error('An error occurred:', error.message);
      return false; // or handle the error as needed
    }
    
  

}




const getItemsIdsToOSM =  async (itemObject) => { 

    try {
        const url = `https://nominatim.openstreetmap.org/lookup?osm_ids=${itemObject}&polygon_geojson=1&format=jsonv2`;
        const response = await axios.get(url);
    
        if (response.status === 200) {
          return response.data;
        } else {
          // console.error(`Request failed with status ${response.status}: ${response.statusText}`);
          return false; // or handle the error as needed
        }
      } catch (error) {
        // console.error('An error occurred:', error.message);
        return false; // or handle the error as needed
      }
    };



const exportedObject = { getMapQueryDataParameter, getItemsIdsToOSM, getMapQueryData, getMapQueryDataSearchNearLocation, getMapQueryDataDBData, getMapQueryDataAroundCenterAll, getMapQueryDataAroundSpecificCoordinateParameter } 

export default exportedObject

