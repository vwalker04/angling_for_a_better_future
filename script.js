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

  // Handlebars variables for Info Window HTML.
  // Each Info Window will render with 'entry-template' ID
  var source   = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);
  google.maps.event.addListener(map, 'click', function(event) {
    updateMap(event);
  });

  function placeWindow(location,template) {
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

  function updateMap(event){
    var latLng = event.location;
    if (infowindow){
      infowindow.close();
    }
    placeWindow(event.latLng,template);
    placeMarker(event.latLng);
  }


  $('body').on('click','#formSubmit',{},function(evt){
    if (infowindow){
      infowindow.close();
    }
    var source   = document.getElementById("weather").innerHTML;
    var template = Handlebars.compile(source);
    placeWindow(event.latLng,template);


  });

}
