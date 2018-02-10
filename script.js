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


  // Adds Indo Window
  google.maps.event.addListener(map, 'click', function(event) {
    placeWindow(event.latLng);
  });

  function placeWindow(location) {
    var infowindow = new google.maps.InfoWindow({
      position: location,
      map: map,
      content: contentString
    });
  }

  var contentString = '<div class = "weather">'+
 '<div class = "container-fluid">' +
 '<h1>Weather</h1>' +
 '<p>Ice Thickness: </p>' +
 '<input id="text-field" type = "text" placeholder = "how thick is it?" size = "5" maxLength = "5" required></input>' +
 '<p>Water Temp: </p>' +
 '<input type = "text" placeholder = "temp in fahrenheit" size = "15" maxLength = "3" required></input>' +
 '<button class = "submit">Submit</button>' +
 '</div>' +
 '</div>'
}
