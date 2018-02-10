function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(42.351422, -83.068341), zoom: 12,
    mapTypeId: 'hybrid' // Default is 'roadmap'
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);

  google.maps.event.addListener(map, 'click', function(event) {
    var latLng = event.location;
  });
  var infowindow = new google.maps.InfoWindow({

  });
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });


  // Adds marker
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
    infowindow.open(map, marker);
  });

  function placeMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true
    });
  }

}
