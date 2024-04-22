
import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../../reducers/notificationTempReducer'
import { getMapQueryDataSearchNearLocation } from '../../reducers/mapQueryReducer'
import { setUserLocationFlag } from '../../reducers/userLocationReducer'
import { setPositionCenter } from '../../reducers/centerPositionReducer'
import { setBounds } from '../../reducers/boundsReducer'

const CurrentLocation = ({defaultCoordinates, setIsGeoloc}) => {    
    
    const dispatch = useDispatch()
    const userLocationFlag = useSelector(store => store.userLocationFlag )
    
    const [coordinates, setCoordinates] = useState({})

    const SuccessGeoLoc = (position) => {
        dispatch(setNotification({message:'commerces locaux dans un rayon de 10km', style:'success', time:5000}))
        if (position.coords) {
            // { latitude: 45.5371696, longitude: -73.5905203, altitude: null, accuracy: 12.706, altitudeAccuracy: null, heading: null, speed: null }
            // console.log(position.coords)
            setCoordinates(position.coords)
            dispatch(setPositionCenter([position.coords.latitude,position.coords.longitude] ))
            const itemObject = {latitude:position.coords.latitude, longitude:position.coords.longitude}
            dispatch(getMapQueryDataSearchNearLocation(itemObject))
            setIsGeoloc(true);
          } else {
            dispatch(setNotification({message:'une erreur dans la localisation, un lieu par défaut est affiché', style:'warning', time:5000}))
        }
    }


    const updateErrorCount = (error) => {
        if (error.code) {
            dispatch(setNotification({message:'la localisation est bloquée, un lieu par défaut est affiché', style:'warning', time:5000}))
            setCoordinates(defaultCoordinates);
            const itemObject = { latitude: defaultCoordinates.latitude, longitude: defaultCoordinates.longitude };
            dispatch(getMapQueryDataSearchNearLocation(itemObject));
            dispatch(setPositionCenter([defaultCoordinates.latitude, defaultCoordinates.longitude]));
            setIsGeoloc(false);
            dispatch(setUserLocationFlag(false));
            }
        }


        useEffect(() => {
            const options = {
                enableHighAccuracy: true,
            };
            // Check if the user's location is already available
            navigator.geolocation.getCurrentPosition(
                SuccessGeoLoc,
                updateErrorCount,
                options
            );
            dispatch(setNotification({message:"Merci d'accepter/refuser la géolocalisation ou bouger la carte pour continuer", style:'warning', time:5000}))

            // If user location flag is still false and coordinates are not set yet, center map on default coordinates
            // if (!userLocationFlag && !coordinates.latitude) {
            //     setCoordinates(defaultCoordinates);
            //     const itemObject = { latitude: defaultCoordinates.latitude, longitude: defaultCoordinates.longitude };
            //     dispatch(getMapQueryDataSearchNearLocation(itemObject));
            //     dispatch(setPositionCenter([defaultCoordinates.latitude, defaultCoordinates.longitude]));
            //     setIsGeoloc(false);
            //     dispatch(setUserLocationFlag(true));
            // }
        }, []);

        useEffect(() => {
            if (!userLocationFlag && coordinates.latitude) {
                const itemObject = { latitude: coordinates.latitude, longitude: coordinates.longitude };
                dispatch(getMapQueryDataSearchNearLocation(itemObject));
                dispatch(setUserLocationFlag(true));
                setIsGeoloc(true);
            }
        }, [coordinates, dispatch, setIsGeoloc, userLocationFlag]);


    // useEffect(() => {
    //     if (coordinates.latitude) {
    //         const itemObject = {latitude:coordinates.latitude, longitude:coordinates.longitude}
    //         console.log("Dispatching action with itemObject:", itemObject);
    //         dispatch(getMapQueryDataSearchNearLocation(itemObject))
    //     } 
    // },[coordinates, dispatch])

 
    return (
            <></>
    )
}

export default CurrentLocation

