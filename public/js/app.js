// CLIENT-SIDE JS



console.log ("app.js loaded");

// var $query = $('#query');
function locationSearch(){
    console.log ("locationSearch is running");
    var search = document.getElementById('search').value;
    console.log(search);
    document.getElementById('results').innerHTML= "";
    $.ajax ({ 
      url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=bikeshops+in+"+search+ "&key=AIzaSyBBJ_3VrFAhw6K3qO-YbX4eMM-MAfLNQgc",
      type: 'GET',
      contentType: 'text/plain',
        // crossDomain : true,
      //https://maps.googleapis.com/maps/api/place/textsearch/json?query=bikeshops+in+boulder,co&key=AIzaSyBBJ_3VrFAhw6K3qO-YbX4eMM-MAfLNQgc
     //https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters
    success: function (data){
        console.log(data);
    },
 
 });
}

 document.getElementById('button').addEventListener('click',locationSearch,false);
//     });
//     render.search_results.ejs;//serious pseduo code here...



// 

//     alert("yo");
//     var location = {
//     query : $query.val(),
//     };

//     console.log(location);

//     var apikey = "AIzaSyCZv6QnxpFxfJLk-Sncecyiw1I3Rhs5z1Y";
//     service = new google.maps.places.PlacesService(map);
//     service.textSearch(request, callback);
    
//     var map;
//     var infoWindow;
//     var service;

//   function initialize() {
//   var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });

//   var request = {
//     location: pyrmont,
//     radius: '500',
//     query: 'restaurant'
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }

//       function createMarker(place) {
//         var placeLoc = place.geometry.location;
//         var marker = new google.maps.Marker({
//           map: map,
//           position: place.geometry.location
//         });

//         google.maps.event.addListener(marker, 'click', function() {
//           infowindow.setContent(place.name);
//           infowindow.open(map, this);
//         });
//       }


//     $
// });
// });
// javascript for the data collector widget
// $(function() {
//     $('input[name="datefilter"]').daterangepicker({
//           autoUpdateInput: false,
//           locale: {
//           cancelLabel: 'Clear'
//           }
//     });
//     $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
//         $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
//     });
//     $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
//         $(this).val('');
//     });
// 