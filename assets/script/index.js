'use strict';

import { onEvent, select, selectById, selectAll, print } from "./utility.js";

mapboxgl.accessToken = 
'pk.eyJ1Ijoic2F6aWUxMDEiLCJhIjoiY2xxMTlpdmppMDN4MjJpcjJmMWEwMGtocyJ9.E-0dRa3RSkJ5qftTffADcQ';

function showMarker(map, position) {
    new mapboxgl.Marker()
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(map);
}

function makMap(position) {
    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v12', // stylesheet location
        center: [position.coords.longitude, position.coords.latitude], // starting position [lng, lat]
        zoom: 16 // starting zoom level
    });

    showMarker(map, position);

    map.dragPan.disable();
    map.keyboard.disable();
    map.scrollZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 0
};

function errorHandler(event) {
    // console.log('Unable to retrieve your location');
    console.log(event.message);
}

if ('geolocation' in navigator) {
    const geo = navigator.geolocation;
    geo.watchPosition(makMap, errorHandler, options);
} else {
    console.log('Geolocation API is not supported by your browser');
}