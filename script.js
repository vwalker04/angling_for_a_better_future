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
  var pos;

  google.maps.event.addListener(map, 'click', function(event) {
    pos = event.latLng;
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
    placeWindow(pos,template);
    placeMarker(pos);
  }


  $('body').on('click','#formSubmit',{},function(evt){
    $('#form-test').trigger('submit');
    if (infowindow){
      infowindow.close();
    }
    var source   = document.getElementById("weather").innerHTML;
    var template = Handlebars.compile(source);
    placeWindow(pos,template);

    //var selValue = $('input[id="radio1"]:checked').val();
    //console.log(selValue);

  }).on('submit','#form-test',{},function(evt){
      evt.preventDefault();
      var formData = $(this).serializeArray();
      console.log(formData);
      // if formData.length > 0, then submit to api
      // make api cal
  });

}
