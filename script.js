function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(42.351422, -83.068341), zoom: 12,
    mapTypeId: 'hybrid' // Default is 'roadmap'
  };

  var infowindow;
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });

  google.maps.event.addListener(map, 'click', function(event) {
    var latLng = event.location;
  	if (infowindow){
  		infowindow.close();
  	}
    placeWindow(event.latLng);
    placeMarker(event.latLng);
  });

  // Handlebars variables for Info Window HTML.
  // Each Info Window will render with 'entry-template' ID
  var source   = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);

  function placeWindow(location) {
      infowindow = new google.maps.InfoWindow({
      position: location,
      map: map,
      content: template({})
    });
  }
  function placeMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }

    // $('#formSubmit').click(function(){
    //   if()
    // })
}
