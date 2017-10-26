var map, pos;
//var infowindow = null;
var marcadorDirecto;
var cidCampeador= {lat: -34.607576, lng: -58.445711};


function initMap() {

map = new google.maps.Map(document.getElementById('map'), {
  center: cidCampeador,
  zoom: 15
});



//geolocation
function autodetectarFunction() {
  var marcadorAutodetectar= new google.maps.Marker({map: map, position: null});

//var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      marcadorAutodetectar.setPosition(pos);
      marcadorAutodetectar.setMap(map);
      //infoWindow.setPosition(pos);
      //infoWindow.setContent('Estas acá!');
      
      map.setCenter(pos);
    }, function() {
  handleLocationError(true, infoWindow, map.getCenter());
  });
  } else {
// Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  }
}


 // escucha el evento click en boton autodetectar
function startButtonEvents () {
  document.getElementById('autodetectar'
  ).addEventListener('click', function(){
    autodetectarFunction();
  });
}
startButtonEvents();





// SearchBox 
// Create the search box and link it to the UI element.
var input = document.getElementById('pac-input');

var searchBox = new google.maps.places.SearchBox(input);

//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
// Bias the SearchBox results towards current map's viewport.
map.addListener(
  'bounds_changed',
  function() {
    searchBox.setBounds(map.getBounds());
  });

var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.

searchBox.addListener(
  'places_changed', 
  function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

// Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
    });
  markers = [];


// For each place, get the icon, name and location.

  var bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
  


// Create a marker for each place.

  markers.push(new google.maps.Marker({
    map: map,
    title: place.name,
    position: place.geometry.location
  })
  );

  if (place.geometry.viewport) {
  // Only geocodes have viewport.
    bounds.union(place.geometry.viewport);
    }
  else {
    bounds.extend(place.geometry.location);
  }
});
  map.fitBounds(bounds);
}
);


// devuelve posicion seleccionada por usuario directo en mapa


google.maps.event.addListener(map, 'click', function(e) {
  marcadorDirecto= new google.maps.Marker({
    map: map,
    position: e.latLng,
    title: 'Marcaste esta posición!'
  });
});

//cierra initMap
}

