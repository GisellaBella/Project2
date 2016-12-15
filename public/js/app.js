// CLIENT-SIDE JS



console.log ("app.js loaded");

// $( "#location").submit(function (event) {
// alert("yo");
// event.preventDefault();

// });

  
//   var search = $("#search").val();
//  	$ form.action='';
  // $.post ('/api/search', search, function(data) {
  //   $('result').append(data);

// 	    $.ajax ({ 
// 	      url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=bikeshops+in+"+search+ "&key=AIzaSyBBJ_3VrFAhw6K3qO-YbX4eMM-MAfLNQgc",
// 	      type: 'GET',
// 	      contentType: 'text/plain',
// 	      crossDomain : true,
// 	      //https://maps.googleapis.com/maps/api/place/textsearch/json?query=bikeshops+in+boulder,co&key=AIzaSyBBJ_3VrFAhw6K3qO-YbX4eMM-MAfLNQgc
// 	     //https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters
// 		    success: function (data){
// 		        console.log(data);
// 		    }
// 		 });

//    }
// }

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
    placesRequest('Bikes',currentLocation,1500,['bikes'],'images/bike.png');
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
// service= new google.maps.places.PlacesService(map);
// google.maps.event.addListenerOnce(map, 'bounds_changed', placesRequest);

//Request places from Google
function placesRequest(title,latlng,radius,types,icon) {
//Parameters for our places request
    var request = {
        bounds: map.getBounds(),
        name: "bike shops",
        location: latlng,
        radius: radius,
        types: types
    };

  //Make the service call to google
  var callPlaces = new google.maps.places.PlacesService(map);
  callPlaces.search(request, function(results,status){
    console.log(results);

      //trace what Google gives us back
      $.each(results, function(i,place){
        var placeLoc = place.geometry.location;
         var thisplace = new google.maps.Marker({
           map: map,
           position: place.geometry.location,
           icon: 'images/bike.png',
           title: place.name
         });
      });

  });
  
}