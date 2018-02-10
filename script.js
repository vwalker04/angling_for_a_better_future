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
  // var infowindow = new google.maps.InfoWindow({
  //   map: map
  // });
  // var marker = new google.maps.Marker({
  //   position: location,
  //   map: map
  // });


    var infowindow;
    // Adds Indo Window
    google.maps.event.addListener(map, 'click', function(event) {
    	if (infowindow){
    		infowindow.close();
    	}
    placeWindow(event.latLng);
  });

  var source   = document.getElementById("entry-template").innerHTML;
  console.log(source);
  var template = Handlebars.compile(source);
  console.log(template);

  function placeWindow(location) {
      infowindow = new google.maps.InfoWindow({
      position: location,
      map: map,
      content: template({})
    });
  }

}
