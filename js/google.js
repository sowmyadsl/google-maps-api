function Thing() {

}

Thing.prototype.geocodeAddress = function(address, locationData) {
  $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`)
  .then(function(response) {
    locationData(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng);
  })
};


exports.googleModule = Thing;
