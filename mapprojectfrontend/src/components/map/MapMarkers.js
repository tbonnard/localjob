
import React from 'react';

import Icons from './Icons';

const MapMarkers = ({mapQueryData}) => {

  return (
    <>
 
         {mapQueryData.map((mapData, inde) => {
            let sourceOSM = true
            if (mapData['with_suggestions']) {sourceOSM = false}   
                return (
                  <Icons key={inde+mapData.uuid+mapData.id} sourceOSM={sourceOSM} ind={mapData.uuid} markerData={mapData} />
                );
              })}
    </>

      
  )
}

export default MapMarkers