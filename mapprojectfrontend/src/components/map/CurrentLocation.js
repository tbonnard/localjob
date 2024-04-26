
import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../../reducers/notificationTempReducer'
import { getMapQueryDataSearchNearLocation } from '../../reducers/mapQueryReducer'
import { setBounds } from '../../reducers/boundsReducer'
import { setFirstTimeUserLocation } from '../../reducers/firstTimeCurrentLocReducer';
import { setBoundsGeolocStart } from '../../reducers/boundsGeolocStartReducer'

const CurrentLocation = ({bounds}) => {    
    
    const dispatch = useDispatch()
    
    const [boundsToSend, setBoundsToSend] = useState({ne_lat: bounds[0][0],
        ne_lng: bounds[0][1],
        sw_lat: bounds[1][0],
        sw_lng: bounds[1][1],
      })

    const SuccessGeoLoc = (position) => {
        if (position.coords) {
            const buffer = 0.04
            // console.log("WHEN ALLOWED")
            const newBoundsToSend = {ne_lat: position.coords.latitude+buffer,
                ne_lng: position.coords.longitude+buffer,
                sw_lat: position.coords.latitude-buffer,
                sw_lng: position.coords.longitude-buffer,
              }
            //   console.log(position.coords.latitude)
            //   console.log(newBoundsToSend)
            dispatch(getMapQueryDataSearchNearLocation(newBoundsToSend))
            const newBoundsToSet = [[position.coords.latitude-buffer, position.coords.longitude-buffer],[position.coords.latitude+buffer,position.coords.longitude+buffer]]
            dispatch(setBounds(newBoundsToSet))
            dispatch(setBoundsGeolocStart(newBoundsToSend))
            dispatch(setNotification({message:'commerces locaux aux alentours', style:'success', time:5000}))
        } else {
            dispatch(setNotification({message:'une erreur dans la localisation, un lieu par défaut est affiché', style:'warning', time:5000}))
        }
    }


    const updateErrorCount = (error) => {
        if (error.code) {
            // console.log("WHEN BLOCKED")
            dispatch(getMapQueryDataSearchNearLocation(boundsToSend));
            dispatch(setNotification({message:'la localisation est bloquée, un lieu par défaut est affiché', style:'warning', time:5000}))
            }
        }

        useEffect(() => {
            navigator.permissions.query({name:'geolocation'}).then(permissionStatus => {
                // console.log('Geolocation permission state:', permissionStatus.state);
                if (permissionStatus.state === "prompt") {
                    dispatch(getMapQueryDataSearchNearLocation(boundsToSend));
                }
              });            

            // console.log("TEST")
            const options = {
                enableHighAccuracy: true,
            };
            navigator.geolocation.getCurrentPosition(
                SuccessGeoLoc,
                updateErrorCount,
                options
            );
            dispatch(setNotification({message:"Merci d'accepter/refuser la géolocalisation ou bouger la carte pour continuer", style:'warning', time:5000}))
            dispatch(setFirstTimeUserLocation())
        }, []);

 
    return (
            <></>
    )
}

export default CurrentLocation
