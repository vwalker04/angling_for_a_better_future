function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(42.351422, -83.068341), zoom: 12,
    mapTypeId: 'roadmap' // Default is 'roadmap'
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

  var formData;
  $('body').on('click','#formSubmit',{},function(evt){
    $('#form-test').trigger('submit');
    if (infowindow){
      infowindow.close();
    }
    console.log("formData is " + formData[0].value);
    // var source   = document.getElementById("weather").innerHTML;
    var source   = document.getElementById(formData[0].value).innerHTML;
    var template = Handlebars.compile(source);
    placeWindow(pos,template);

  }).on('submit','#form-test',{},function(evt){
      evt.preventDefault();
      formData = $(this).serializeArray();
      console.log(formData);
      // if formData.length > 0, then submit to api
      // make api cal
  });

  $('body').on('click','#formUpdate',{},function(evt){
    $('#form-test').trigger('submit');
    if (infowindow){
      infowindow.close();
    }
    console.log("formData is " + formData[0].value);
    // var source   = document.getElementById("weather").innerHTML;
    var source   = document.getElementById(formData[0].value).innerHTML;
    var template = Handlebars.compile(source);
    placeWindow(pos,template);

  }).on('submit','#form-test',{},function(evt){
      evt.preventDefault();
      formData = $(this).serializeArray();
      console.log(formData);
      // if formData.length > 0, then submit to api
      // make api cal
  });

  console.log("double checking jquery");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCyUNeFeMBtbmxlXR2ySSzdOmUC0TYvimM",
  authDomain: "angling-for-a-better-future.firebaseapp.com",
  databaseURL: "https://angling-for-a-better-future.firebaseio.com",
  projectId: "angling-for-a-better-future",
  storageBucket: "angling-for-a-better-future.appspot.com",
  messagingSenderId: "108022382723"
};
firebase.initializeApp(config);
var fishFormat = {
      "condition": "stupid",
      "date": "02-11-2018",
      "id": 12,
      "image": "",
      "lake": "Erie",
      "latitude": 42.31,
      "longitude": -51.83,
      "observation": "missing an eye",
      "type": "salmon"
  };
  var gettingsFish = {
      "url": "https://angling-for-a-better-future.firebaseio.com/fish.json",
      "method": "GET"
      }
  var database;
  $.ajax(gettingsFish).done(function (response) {
    console.log(response);
    database = response;
    getDatabase();
    buildFishObject(database);
  });
  var gettingsWeather = {
      "url": "https://angling-for-a-better-future.firebaseio.com/weather.json",
      "method": "GET",
  }
  var database;
  $.ajax(gettingsWeather).done(function (response) {
    console.log(response);
    database = response;
    getDatabase();
    buildWeatherObject(database);
  });
  var gettingsObjects = {
      "url": "https://angling-for-a-better-future.firebaseio.com/objects.json",
      "method": "GET",
  }
  var database;
  $.ajax(gettingsObjects).done(function (response) {
    console.log(response);
    database = response;
    getDatabase();
    buildObjectsObject(database);
  });
  function getDatabase() {
      console.log("database", database);
  }
  var fishy;
  var fishies = [];
  var weathers = [];
  var objecters = [];
  function buildFishObject(info) {
      for (var key in info) {
          if (!info.hasOwnProperty(key)) continue;
          var obj = info[key];
          for (var prop in obj) {
              if (!obj.hasOwnProperty(prop)) continue;
          }
          console.log("full object", obj);
          fishy = new fishObject(obj, obj["condition"], obj["date"], obj["id"],obj["image"], obj["lake"], obj["latitude"], obj["longitude"], obj["observation"], obj["type"])
          fishies.push(fishy);
          console.log("fishy", fishy);
      }
      console.log("fishies[0]", fishies[0]);
      clickFish(1, "angry");
  };
  function clickFish(id,value) {
      if (fishies[id]) {
          console.log(fishies[id]);
      }
  }
  var weathery;
  function buildWeatherObject(info) {
      for (var key in info) {
          if (!info.hasOwnProperty(key)) continue;
          var obj = info[key];
          for (var prop in obj) {
              if (!obj.hasOwnProperty(prop)) continue;
          }
          console.log("full object", obj);
          weathery = new weatherObject(obj["id"], obj["ice thickness"], obj["water temp"], obj["wind speed"], obj["lake"], obj["latitude"],obj["longitude"]);
          weathers.push(weathery);
      }   console.log('weathery', weathery);
  };

  var objects1;
  function buildObjectsObject(info) {
      for (var key in info) {
          if (!info.hasOwnProperty(key)) continue;
          var obj = info[key];
          for (var prop in obj) {
              if (!obj.hasOwnProperty(prop)) continue;
          }
          console.log("full object", obj);
          objects1 = new objectsObject(obj["id"], obj["object"], obj["lake"], obj["latitude"], obj["longitude"]);
          objecters.push(objects1);
      }   console.log("objects1", objects1);
  };

  function fishObject(newData, newCondition,newDate, newId, newImage, newLake, newLatitude, newLongitude, newObservation, newType) {
      this.data = newData;
      this.condition = newCondition;
      this.date = newDate;
      this.id = newId;
      this.image = newImage;
      this.lake = newLake;
      this.latitude = newLatitude;
      this.longitude = newLongitude;
      this.observation = newObservation;
      this.type = newType;
      };
  function weatherObject(newId, newIce, newWaterTemp, newWindSpeed, newLake, newLatitude, newLongitude) {
      this.id = newId;
      this.ice = newIce;
      this.waterTemp = newWaterTemp;
      this.windSpeed = newWindSpeed;
      this.lake = newLake;
      this.latitude = newLatitude;
      this.longitude = newLongitude;
  };
  function objectsObject(newId, newObjects, newLake, newLatitude, newLongitude) {
      this.id = newId;
      this.stuff = newObjects;
      this.lake = newLake;
      this.latitude = newLatitude;
      this.longitude = newLongitude;
  };
  function updateFish(fishObj) {
      $.ajax({
          "url": "https://angling-for-a-better-future.firebaseio.com/fish.json",
          "method": "PATCH",
          "data":   fishObj
      }).done(function(response){
          console.log(response);
      }).fail(function(error){
          console.log(error);
      });
  }
  function updateWeather(weatherObj) {
      $.ajax({
          "url": "https://angling-for-a-better-future.firebaseio.com/fish.json",
          "method": "PATCH",
          "data": weatherObj
      }).done(function(response){
          console.log(response);
      }).fail(function(error){
          console.log(error);
      })
  }
  function updateObjects(objObjects) {
      $.ajax({
          "url": "https://angling-for-a-better-future.firebaseio.com/fish.json",
          "method": "PATCH",
          "data": objObjects
      }).done(function(response){
          console.log(response);
      }).fail(function(error){
          console.log(error)
      })
  }
  // update funtions
  function postFish(fishObj) {
  $.ajax({
    "url": "https://angling-for-a-better-future.firebaseio.com/fish.json",
    "method": "POST",
    "data": fishObj
    }).done(function(response){
      console.log(response);
    }).fail(function(error){
      console.log(error);
    })
}

function postWeather(weatherObj) {
  $.ajax({
    "url": "https://angling-for-a-better-future.firebaseio.com/weather.json",
    "method": "POST",
    "data": weatherObj
    }).done(function(response){
      console.log(response);
    }).fail(function(error){
      console.log(error);
    })
}

function postObjects(objectsObj) {
  $.ajax({
    "url": "https://angling-for-a-better-future.firebaseio.com/objects.json",
    "method": "POST",
    "data": objectsObj
    }).done(function(response){
      console.log(response);
    }).fail(function(error){
      console.log(error);
    })
}

}
