var Thing = require('./../js/google.js').googleModule;

$(document).ready(function() {
  $("#submit").click(locateUser);
  $("#locateAddress").click(locateAddress);
});

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
    mapTypeId : google.maps.MapTypeId.ROADMAP
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
      mapTypeId : google.maps.MapTypeId.ROADMAP
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
