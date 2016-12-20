// CLIENT-SIDE JS



console.log ("app.js loaded");

function initGeolocation() {
  if( navigator.geolocation ) {
  // Call getCurrentPosition with success and failure callbacks
  navigator.geolocation.getCurrentPosition( success, fail );
  }
  else
  {
   alert("Sorry, your browser does not support geolocation services.");
  }
}
var map;
var service;
function success(position) {
     // Define the coordinates as a Google Maps LatLng Object
     var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

     // Prepare the map options
     var mapOptions =
        {
          zoom: 15,
          center: currentLocation,
          mapTypeControl: false,
          navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    // Create the map, and place it in the map_canvas div
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    //search for bike shops  within 2 miles of our current location
    placesRequest('Bikes',currentLocation,1500,['bikes'],'./images/bike.png');
    // Place the initial marker
    var marker = new google.maps.Marker({
              position: currentLocation,
              map: map,
              title: "Your current location!"
              });   
}
function fail() {
// Could not obtain location
}    


//Request places from Google
function placesRequest(title,latlng,radius,types,icon) {
//Parameters for our places request
    var request = {
        bounds: map.getBounds(),
        name: "bike shops",
        location: latlng,
        radius: radius,
        types: ['bicycle_shop'],
    };

  //Make the service call to google
  var callPlaces = new google.maps.places.PlacesService(map);
  callPlaces.search(request, function(results,status){

    console.log(results);
      //loop over what Google gives us back
      $.each(results, function(i,place){
        var placeLoc = place.geometry.location;
        var url_b = place.author_url;
        var address_b = place.formatted_address;
        var phone = place.formatted_phone_number;
        var url = place.url;
        var website = place.website;
        var name = place.name;
        var address = place.vicinity;
        var id = place.place_id;
        var thisplace = new google.maps.Marker ({
           map: map,
           position: place.geometry.location,
           icon: './images/bike.png',
           title: place.name
           });
             
        console.log( name, address, id, phone, url);


        });
      });
      
    }

