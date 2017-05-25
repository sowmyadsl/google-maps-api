var Thing = require('./../js/google.js').googleModule;

  $(document).ready(function() {
    var map;
    function initialize() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 45.5231, lng: -122.6765},
        mapTypeId: 'terrain'
      });
    }
    initialize(map);
    $("#submit").click(locateUser);
    $("#locateAddress").click(locateAddress);

  });

// var script = document.createElement('script');
// script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
// document.getElementsByTagName('head')[0].appendChild(script);
//
// map.data.setStyle(function(feature) {
//   var magnitude = feature.getProperty('mag');
//   return {
//     icon: getCircle(magnitude)
//   };
// });
//
// function getCircle(magnitude) {
//   return {
//     path: google.maps.SymbolPath.CIRCLE,
//     fillColor: 'red',
//     fillOpacity: .2,
//     scale: Math.pow(2, magnitude) / 2,
//     strokeColor: 'white',
//     strokeWeight: .5
//   };
// }
//
//
// function eqfeed_callback(results) {
//   map.data.addGeoJson(results);
// }



// ------Find Current Address

function locateUser() {
    if (navigator.geolocation){
      var positionOptions = {
        enableHighAccuracy: true,
        timeout: 10 * 1000
      };
      navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
    } else {
      alert("browser ain't right");
    }
}

function geolocationSuccess(position) {
  var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var myOptions = {
    zoom : 16,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.TERRAIN
  };
  var mapObject = new google.maps.Map(document.getElementById('map'), myOptions);

  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
}

function geolocationError(positionError) {
  alert(positionError);
}

// -----Locate New Address------

function locateAddress() {
  if (navigator.geolocation){
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000
    };
      navigator.geolocation.getCurrentPosition(NewPosition, geolocationError, positionOptions);
  } else {
    alert("browser ain't right");
  }
}

function NewPosition(position) {
  var address = document.getElementById('address').value;

  var locationData = function(lat, long) {
    var userLatLng = new google.maps.LatLng(lat, long);

    var myOptions = {
      zoom : 16,
      center : userLatLng,
      mapTypeId : google.maps.MapTypeId.TERRAIN
    };
    var mapObject = new google.maps.Map(document.getElementById('map'), myOptions);

    new google.maps.Marker({
      map: mapObject,
      position: userLatLng
    });
  }

  var spot = new Thing();
  spot.geocodeAddress(address, locationData);
}
