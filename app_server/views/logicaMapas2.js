var map, pos;

var cidCampeador= {lat: -34.607576, lng: -58.445711};
navigator.geolocation.getCurrentPosition(function(position) {
pos = {
lat: position.coords.latitude,
lng: position.coords.longitude}
});

function initMap() {      
map = new google.maps.Map(document.getElementById('mapa'), {
center: cidCampeador,
zoom: 15
});        

// Create the search box and link it to the UI element.
var input1 = document.getElementById('pac-input1');
var input2 = document.getElementById('pac-input2');
var searchBox1 = new google.maps.places.SearchBox(input1);
var searchBox2 = new google.maps.places.SearchBox(input2);
//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
searchBox1.setBounds(map.getBounds());
});
map.addListener('bounds_changed', function() {
searchBox2.setBounds(map.getBounds());
});
var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
//box1
searchBox1.addListener('places_changed', function() {
var places1 = searchBox1.getPlaces();
if (places1.length == 0) {return;}
//box2
searchBox2.addListener('places_changed', function() {
  var places2 = searchBox2.getPlaces();
  if (places2.length == 0) {return;}
// Clear out the old markers.
markers1.forEach(function(marker1) {
marker1.setMap(null);
});
markers2.forEach(function(marker2) {
marker2.setMap(null);
});
markers1 = [];
markers2 = [];

// For each place, get the icon, name and location.
//box1
var bounds1 = new google.maps.LatLngBounds();
places1.forEach(function(place1) {
if (!place1.geometry) {
console.log("Returned place contains no geometry");
return;
}
var icon1 = {
url: place1.icon,
size: new google.maps.Size(71, 71),
origin: new google.maps.Point(0, 0),
anchor: new google.maps.Point(17, 34),
scaledSize: new google.maps.Size(25, 25)
};
//box2
var bounds2 = new google.maps.LatLngBounds();
places2.forEach(function(place2) {
if (!place2.geometry) {
console.log("Returned place contains no geometry");
return;
}
var icon2 = {
url: place2.icon,
size: new google.maps.Size(71, 71),
origin: new google.maps.Point(0, 0),
anchor: new google.maps.Point(17, 34),
scaledSize: new google.maps.Size(25, 25)
};
// Create a marker for each place.
//box1
markers1.push(new google.maps.Marker({
map: map,
icon1: icon1,
title: place1.name,
position1: place1.geometry.location
}));

if (place1.geometry.viewport) {
  // Only geocodes have viewport.
bounds1.union(place1.geometry.viewport);
} else {
bounds1.extend(place1.geometry.location);
}
});
map.fitBounds(bounds1);
});
//box2
markers2.push(new google.maps.Marker({
map: map,
icon2: icon2,
title: place2.name,
position2: place2.geometry.location
}));
  
if (place2.geometry.viewport) {
// Only geocodes have viewport.
bounds2.union(place2.geometry.viewport);
} else {
bounds2.extend(place2.geometry.location);
}
});
map.fitBounds(bounds2
);
});
}