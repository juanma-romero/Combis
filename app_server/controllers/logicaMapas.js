var map, pos;
var consulta={};
//var infowindow = null;
var marcadorDirecto;
var cidCampeador= {lat: -34.607576, lng: -58.445711};
var markers = [];

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: cidCampeador,
    zoom: 15
  });



  //geolocation
  function autodetectarFunction() {
    var marcadorAutodetectar= new google.maps.Marker({map: map, position: null});
                  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      marcadorAutodetectar.setPosition(pos);
      marcadorAutodetectar.setMap(map);
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

  


/*
  // SearchBox 
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input1');

  var searchBox = new google.maps.places.SearchBox(input);

  
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
*/

  // devuelve posicion seleccionada por usuario directo en mapa


  google.maps.event.addListener(map, 'click', function(e) {
    
    marcadorDirecto= new google.maps.Marker({
      map: map,
      position: e.latLng,
      title: 'Marcaste esta posición!'
    });
  });

  new AutocompleteDirectionsHandler(map);
  //cierra initMap
}

function AutocompleteDirectionsHandler(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  
  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');

      // configura autocomplete
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-40.91351257612757,-63.314208984375),
    new google.maps.LatLng(-33.30298618122412,-56.810302734375));

  var optionsAuto = {
    bounds: defaultBounds,
    componentRestrictions: {country: 'ar'},
    placeIdOnly: true
  };
      // inicia Autocomplete
  var originAutocomplete = new google.maps.places.Autocomplete(
      originInput, optionsAuto);
  var destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput, optionsAuto);

  

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

  
}
AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
  var me = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.place_id) {
      window.alert("Seleccione una dirección de la lista ");
      return;
    }
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
    } else {
      me.destinationPlaceId = place.place_id;
    }
    
  });
  /*markers.forEach(function(marker) {
    marker.setMap(null);
    });
  markers = [];
  // Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
    });
    // Create a marker for each place.

  markers.push(new google.maps.Marker({
    map: map,
    title: place.name,
    position: place.geometry.location
    })
  );*/

};
