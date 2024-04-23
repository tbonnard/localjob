
import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../../reducers/notificationTempReducer'
import { getMapQueryDataSearchNearLocation } from '../../reducers/mapQueryReducer'
import { setUserLocationFlag } from '../../reducers/userLocationReducer'
import { setPositionCenter } from '../../reducers/centerPositionReducer'
import { setBounds } from '../../reducers/boundsReducer'

const CurrentLocation = ({defaultCoordinates, setIsGeoloc, setCoordinatesToSet}) => {    
    
    const dispatch = useDispatch()
    const userLocationFlag = useSelector(store => store.userLocationFlag )
    
    const [coordinates, setCoordinates] = useState({})

    const SuccessGeoLoc = (position) => {
        if (position.coords) {
            console.log("SUCC")
            // console.log("WHEN ALLOWED", {latitude:position.coords.latitude, longitude:position.coords.longitude})
            setCoordinates({latitude:position.coords.latitude, longitude:position.coords.longitude})
            dispatch(setPositionCenter([position.coords.latitude,position.coords.longitude] ))
            setCoordinatesToSet({latitude:position.coords.latitude, longitude:position.coords.longitude})
            const itemObject = {latitude:position.coords.latitude, longitude:position.coords.longitude}
            dispatch(getMapQueryDataSearchNearLocation(itemObject))
            dispatch(setNotification({message:'commerces locaux dans un rayon de 10km', style:'success', time:5000}))
            setIsGeoloc(true);
        } else {
            dispatch(setNotification({message:'une erreur dans la localisation, un lieu par défaut est affiché', style:'warning', time:5000}))
            setIsGeoloc(true);
        }
    }


    const updateErrorCount = (error) => {
        if (error.code) {
            console.log("TEST ERROR")
            dispatch(setNotification({message:'la localisation est bloquée, un lieu par défaut est affiché', style:'warning', time:5000}))
            setCoordinates(defaultCoordinates);
            const itemObject = { latitude: defaultCoordinates.latitude, longitude: defaultCoordinates.longitude };
            // console.log("WHEN BLOCKED", itemObject)
            dispatch(getMapQueryDataSearchNearLocation(itemObject));
            dispatch(setPositionCenter([defaultCoordinates.latitude, defaultCoordinates.longitude]));
            setIsGeoloc(true);
            }
        }


        useEffect(() => {
            console.log("TEST")
            const options = {
                enableHighAccuracy: true,
            };
            navigator.geolocation.getCurrentPosition(
                SuccessGeoLoc,
                updateErrorCount,
                options
            );

            dispatch(setNotification({message:"Merci d'accepter/refuser la géolocalisation ou bouger la carte pour continuer", style:'warning', time:5000}))

        }, []);

 
    return (
            <></>
    )
}

export default CurrentLocation

