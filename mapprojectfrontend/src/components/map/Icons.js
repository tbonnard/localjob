
import React from 'react';

import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

import MapMarker from './MapMarker';

import aeroway from '../../media/addresstype/aeroway.png'
import aerialway from '../../media/addresstype/aeroway.png'
import amenity from '../../media/addresstype/building.png'
import barrier from '../../media/addresstype/barrier.png'
import boundary from '../../media/addresstype/boundary.png'
import building from '../../media/addresstype/building.png'
import craft from '../../media/addresstype/craft.png'
import emergency from '../../media/addresstype/emergency.png'
import geological from '../../media/addresstype/geological.png'
import healthcare from '../../media/addresstype/healthcare.png'
import historic from '../../media/addresstype/historic.png'
import highway from '../../media/addresstype/route.png'
import landuse from '../../media/addresstype/landuse.png'
import leisure from '../../media/addresstype/leisure.png'
import manMade from '../../media/addresstype/craft.png'
import military from '../../media/addresstype/military.png'
import natural from '../../media/addresstype/natural.png'
import office from '../../media/addresstype/building.png'
import place from '../../media/addresstype/place.png'
import park from '../../media/addresstype/natural.png'
import power from '../../media/addresstype/power.png'
import transport from '../../media/addresstype/transport.png'
import railway from '../../media/addresstype/railway.png'
import residential from '../../media/addresstype/residential.png'
import route from '../../media/addresstype/route.png'
import shop from '../../media/addresstype/shop.png'
import sport from '../../media/addresstype/sport.png'
import telecom from '../../media/addresstype/telecom.png'
import tourism from '../../media/addresstype/tourism.png'
import water from '../../media/addresstype/water.png'
import waterway from '../../media/addresstype/waterway.png'
import city from '../../media/addresstype/city.png'
import village from '../../media/addresstype/village.png'
import suburb from '../../media/addresstype/suburb.png'
import neighbourhood from '../../media/addresstype/neighbourhood.png'
import country from '../../media/addresstype/country.png'
import state from '../../media/addresstype/state.png'
import island from '../../media/addresstype/island.png'
import mountain from '../../media/addresstype/mountain.png'
import industrial from '../../media/addresstype/industrial.png'
import bar from '../../media/addresstype/bar.png'
import cafe from '../../media/addresstype/coffee.png'
import burger from '../../media/addresstype/burger.png'
import food from '../../media/addresstype/food.png'
import icecream from '../../media/addresstype/icecream.png'
import pub from '../../media/addresstype/pub.png'
import school from '../../media/addresstype/school.png'
import music from '../../media/addresstype/music.png'
import book from '../../media/addresstype/book.png'
import bicycle from '../../media/addresstype/bicycle.png'
import boat from '../../media/addresstype/boat.png'
import bus from '../../media/addresstype/bus.png'
import car from '../../media/addresstype/car.png'
import moto from '../../media/addresstype/moto.png'
import fuel from '../../media/addresstype/fuel.png'
import taxi from '../../media/addresstype/taxi.png'
import currency from '../../media/addresstype/currency.png'
import art from '../../media/addresstype/art.png'
import casino from '../../media/addresstype/casino.png'
import cinema from '../../media/addresstype/cinema.png'
import people from '../../media/addresstype/people.png'
import fountain from '../../media/addresstype/fountain.png'
import planet from '../../media/addresstype/planet.png'
import major from '../../media/addresstype/major.png'
import theater from '../../media/addresstype/theater.png'
import law from '../../media/addresstype/law.png'
import fire from '../../media/addresstype/fire.png'
import police from '../../media/addresstype/police.png'
import mailbox from '../../media/addresstype/mailbox.png'
import townhall from '../../media/addresstype/townhall.png'
import barbecue from '../../media/addresstype/barbecue.png'
import bench from '../../media/addresstype/bench.png'
import animal from '../../media/addresstype/animal.png'
import clothes from '../../media/addresstype/clothes.png'
import shelter from '../../media/addresstype/shelter.png'
import toilet from '../../media/addresstype/toilet.png'
import phone from '../../media/addresstype/phone.png'
import recycling from '../../media/addresstype/recycling.png'
import bake_oven from '../../media/addresstype/bake_oven.png'
import child from '../../media/addresstype/child.png'
import time from '../../media/addresstype/time.png'
import dive from '../../media/addresstype/dive.png'
import hunt from '../../media/addresstype/hunt.png'
import web from '../../media/addresstype/web.png'
import kitchen from '../../media/addresstype/kitchen.png'
import religion from '../../media/addresstype/religion.png'
import dock from '../../media/addresstype/dock.png'
import beach from '../../media/addresstype/beach.png'
import shoal from '../../media/addresstype/shoal.png'
import wine from '../../media/addresstype/wine.png'
import gift from '../../media/addresstype/gift.png'
import flower from '../../media/addresstype/flower.png'
import golf from '../../media/addresstype/golf.png'


const Icons = ({sourceOSM, ind, markerData}) => {

    const typeImageIcon = {
        "arts_centre" : art,
        "aeroway" : aeroway,
        "aerialway":aerialway,
        "amenity": amenity,
        "animal_boarding": animal,
        "animal_bleeding": animal,
        "animal_shelter": animal,
        "animal_training": animal,
        "atm" : currency,
        "baking_oven":bake_oven,
        "bank" : currency,
        "bar":bar,
        "barbecue":barbecue,
        "barrier": barrier,
        "bay":beach,
        "beach":beach,
        "bench": bench,
        "brothel": building,
        "bicycle_parking": bicycle,
        "bicycle_repair_station": bicycle,
        "bicycle_rental": bicycle,
        "boat_rental": boat,
        "boat_sharing": boat,
        "bureau_de_change" : currency,
        "bus_station": bus,
        "biergarten":bar,
        "boundary": boundary,
        "building": building,
        "baby_hatch": healthcare,
        "books": book,
        "clinic": healthcare,
        "crematorium": healthcare,
        "cemetery": healthcare,
        "clock": time,
        "clothes": clothes,
        "childcare":child,
        "cafe": cafe,
        "casino": casino,
        "car":car,
        "car_rental":car,
        "car_sharing":car,
        "car_wash":car,
        "cinema": cinema,
        "city": city,
        "college":school,
        "county":state,
        "country":country,
        "craft": craft,
        "compressed_air":car,
        "community_centre": people,
        "conference_centre": school,
        "courthouse": law,
        "charging_station":power,
        "dive_centre": dive,
        "dog_toilet": animal,
        "dentist": healthcare,
        "doctors": healthcare,
        "driver_training":car,
        "dressing_room":clothes,
        "drinking_water":fountain,
        "dentist": healthcare,
        "emergency": emergency,
        "events_venue": building,
        "exhibition_centre": building,
        "ferry_terminal": boat,
        "florist":flower,
        "fire_station": fire,
        "funeral_hall": healthcare, 
        "fast_food": burger,
        "food_court": food,
        "fuel":fuel,
        "fountain": fountain,
        "gambling": casino,
        "gift":gift,
        "give_box": people,
        "grave_yard": healthcare, 
        "grass": natural,
        "geological": geological,
        "golf_course":golf,
        "hunting_stand": hunt, 
        "hamlet":village,
        "healthcare": healthcare,
        "hospital": healthcare,
        "highway": highway,
        "historic": historic,
        "ice_cream":icecream,
        "island":island,
        "industrial": industrial,
        "internet_cafe":web,
        "kindergarten":school,
        "kitchen":kitchen,
        "kneipp_water_cure":water,
        "language_school":school,
        "landuse": landuse,
        "leisure": leisure,
        "library": book,
        "loading_dock":dock,
        "lounger":bench,
        "love_hotel": major,
        "mailbox": mailbox,
        "mailroom": mailbox,
        "man_made": manMade,
        "marketplace": shop,
        "monastery":religion,
        "mountain_pass":mountain,
        "motorcycle_parking": moto,
        "municipality": city,
        "music_school": music,
        "music_venue": music,
        "neighbourhood":neighbourhood,
        "nightclub": music,
        "natural":natural,
        "nursing_home": healthcare,
        "military": military,
        "office": office,
        "parcel_locker": mailbox,
        "parking":car,
        "parking_entrance":car,
        "parking_space":car,
        "park":park,
        "peak":mountain,
        "pet":animal,
        "place": place,
        "place_of_mourning": people,
        "place_of_worship": religion,
        "pharmacy": healthcare,
        "photo_booth": cinema,
        "police": police,
        "post_depot": mailbox,
        "post_box": mailbox,
        "post_office": mailbox,
        "planetarium": planet,
        "prison": police,
        "power": power,
        "pub":pub,
        "public_bath": water,
        "public_bookcase": book,
        "public_transport": transport,
        "ranger_station": police,
        "railway": railway,
        "recycling":recycling,
        "refugee_site": shelter,
        "reasearch_institute":school,
        "residential": residential,
        "restaurant": food,
        "retail": shop,
        "road": route,
        "sanitary_dump_station":recycling,
        "security": police,
        "shelter":shelter,
        "shoal":shoal,
        "shower":water,
        "school":school,
        "social_facility": healthcare,
        "social_centre": people,
        "stripclub": major,
        "studio": music,
        "shop": shop,
        "sport": sport,
        "sports_centre": sport,
        "state":state,
        "stage":theater,
        "suburb":suburb,
        "supermarket":shop,
        "variety_store":shop,
        "swingerclub": major,
        "telecom": telecom,
        "taxi":taxi,
        "telephone": phone,
        "mobile_phone": phone,
        "theater":theater,
        "theatre":theater,
        "toilet":toilet,
        "toilets":toilet,
        "tourism": tourism,
        "town": city,
        "townhall": townhall,
        "toy_libray": book,
        "training":school,
        "traffic_park":school,
        "university":school,
        "village":village,
        "veterinary": healthcare,
        "vehicle_inspection":car,
        "vending_machine": shop,
        "yes": building,
        "waste_basket":recycling,
        "waste_basket;recycling":recycling,
        "waste_disposal":recycling,
        "waste_transfer_station":recycling,
        "water": water,
        "water_point": water,
        "watering_place": water,
        "waterway": waterway,
        "vineyard":wine,
    }
    





    const iconMarkupJob = renderToStaticMarkup(
        <div className='iconMarkerMap iconMarkerMapWithJob'>
            <img src={typeImageIcon[markerData.type]} alt={markerData.type} title={markerData.name}/>
{/*         {markerData.addresstype === 'amenity' ? 
            <img src={typeImageIcon[markerData.type]} alt={markerData.type} title={markerData.type}/>
            :
            <img src={typeImageIcon[markerData.addresstype]} alt={markerData.addresstype} title={markerData.addresstype}/>
            } */}
        </div>
      );
      const customMarkerIconJob = divIcon({
        html: iconMarkupJob
      });
  
      const iconMarkupNoJob = renderToStaticMarkup(
        <div className='iconMarkerMap iconMarkerMapNoJob'>
            <img src={typeImageIcon[markerData.type]} alt={markerData.type} title={markerData.name}/>
            {/* {markerData.addresstype === 'amenity' ? 
            <img src={typeImageIcon[markerData.type]} alt={markerData.type} title={markerData.type}/>
            :
            <img src={typeImageIcon[markerData.addresstype]} alt={markerData.addresstype} title={markerData.addresstype}/>
            } */}
        </div>
      );
      const customMarkerIconNoJob = divIcon({
        html: iconMarkupNoJob
      });
  

    return (
        <MapMarker icon={sourceOSM ? customMarkerIconNoJob : customMarkerIconJob } key={ind} markerData={markerData} />
      )
}

export default Icons