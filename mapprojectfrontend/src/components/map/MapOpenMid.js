
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TileLayer, useMap, Marker } from 'react-leaflet';
import MapMarker from './MapMarker';
import * as L from "leaflet";

import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

import SearchNearPoint from './SearchNearPoint';
import SearchAroundCenterAll from './SearchAroundCenterAll';
import Legend from './Legend';
import MapDraggable from './MapDraggable';
import SearchAroundCenterParameter from './SearchAroundCenterParameter';

import { setPositionCenter } from '../../reducers/centerPositionReducer';

import shop from '../../media/addresstype/shop.png'
import Icons from './Icons';


// FIXME: when new project, marker icon does not update (need to research)

  // TODO: custom images in icon based on type
  // https://blogs.absyz.com/2019/04/03/customizing-the-markers-in-your-leaflet-map
  // https://github.com/pointhi/leaflet-color-markers
  // https://github.com/lennardv2/Leaflet.awesome-markers
  // upload images on server and update url
  //Layer MAP --> https://leaflet-extras.github.io/leaflet-providers/preview/
  //info tuto --> https://www.youtube.com/watch?v=jD6813wGdBA 
  

const MapOpenMid = ({mapQueryData, bounds}) => {


//   icon = L.divIcon({
//     className: 'custom-div-icon',
//     html: "<div style='background-color:#c30b82;' class='marker-pin'></div><i class='material-icons'>weekend</i>",
//     iconSize: [30, 42],
//     iconAnchor: [15, 42]
// });

  // var greenIcon = new L.Icon({
  //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowSize: [41, 41]
  // });

  // var blueIcon = new L.Icon({
  //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowSize: [41, 41]
  // });


  // var GoldIconCenter = new L.Icon({
  //   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowSize: [41, 41]
  // });

  // const iconsList = [, {'icon': greenIcon, 'description':'Avec emploi'}, {'icon': blueIcon, 'description':'Sans emploi'}]
  // , {'icon': GoldIconCenter, 'description':'centre'} 
  
  const map = useMap()
  const dispatch = useDispatch()

  const positionCenter = useSelector(store => store.centerPosition)
  
  useEffect(() => {
    dispatch(setPositionCenter(map.getCenter()))
    },[dispatch, mapQueryData])



  return (
    <>
        <MapDraggable />
        
        {/* <div className='searchMapButtons'>
          <SearchNearPoint map={map} bounds={bounds}/>

          <SearchAroundCenterAll map={map} bounds={bounds}/>

          <SearchAroundCenterParameter map={map} bounds={bounds} />
        </div> */}
     
       {/* marker central si besoin */}
        {/* <Marker position={positionCenter} icon={GoldIconCenter} /> */}

        <Legend />

        {/* <div className='contributionMap'>
          <a href="https://www.openstreetmap.org/copyright" target='_blank'>© OpenStreetMap contributors</a>
        </div> */}
      
          <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors - <a href="https://www.openstreetmap.org/copyright">"ODbL" 1.0</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

{/* ios vibe map - mais un peu sombre */}
           {/* <TileLayer 
                attribution='OpenStreetMap.HOT'
                url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            /> */}

    
    {/* satellite map --long to load */}
    {/* <TileLayer 
                attribution='Stadia.AlidadeSatellite'
                url='https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png'
            />
     */}
    
        {/* light - agreable */}
    <TileLayer 
                attribution='CartoDB.Voyager'
                url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            />

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

export default MapOpenMid