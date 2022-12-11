import React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  PolylineF,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import axios from 'axios';
import polyline from '@mapbox/polyline'
import CreatePlan from "./createpage";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import Person from "./Person.svg";
import FlagFill from "./FlagFill.svg";

export default function ProduceMap(props:any) {

const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
})

//console.log('from plan map  '+ (ePoly))
let encodedPolyline = props.ePoly
let decodedPolyline = polyline.decode(encodedPolyline);
let centerPoly = Math.floor(decodedPolyline.length/2)

const center = {lat:21.4858, lng:39.1925}
console.log(decodedPolyline);
 const orig = { lat: decodedPolyline[0][0], lng: decodedPolyline[0][1]}
console.log(orig)
const dest = { lat: decodedPolyline[decodedPolyline.length-1][0], lng: decodedPolyline[decodedPolyline.length-1][1]}
const path:any[] = [
  // {lat: 37.772, lng: -122.214},
  // {lat: 21.291, lng: -157.821},
  // {lat: -18.142, lng: 178.431},
  // {lat: -27.467, lng: 153.027}
];

for(let i=0; i<decodedPolyline.length; i++ ){

   path.push(  { lat: decodedPolyline[i][0], lng: decodedPolyline[i][1]}       )
}



const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.9,
  strokeWeight: 3,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  paths: {path},
  zIndex: 1
};
   return (
<GoogleMap
     zoom={3.2}
     center= {center}
     mapContainerStyle={{width:'80vw', height:'41.5vh' }}
  >
  <MarkerF position={orig} icon={{
        url: Person,
        scale: 6,

      }} />
    <MarkerF position={dest} icon={{
        url: FlagFill,
        scale: 6
      }} />
  <PolylineF
      path={path}
      options={options}
    />
  </GoogleMap>

   );
}