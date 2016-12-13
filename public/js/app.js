// CLIENT-SIDE JS


$(document).ready(function() {

console.log ("app.js loaded");

$( "#location-form form" ).submit(function(event) {
alert("yo");
event.preventDefault();
var location = $(this).serialize();
console.log(location);
});

var map;
      var infowindow;

      function initMap() {
        var pyrmont = {lat: -33.867, lng: 151.195};

        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 500,
          type: ['store']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }


// // Javascript for the data collector widget
// $(function() {
//   $('input[name="datefilter"]').daterangepicker({
//       autoUpdateInput: false,
//       locale: {
//           cancelLabel: 'Clear'
//       }
//   });
//   $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
//       $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
//   });
//   $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
//       $(this).val('');
//   });
// });


});