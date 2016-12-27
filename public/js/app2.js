
      // This example uses the autocomplete feature of the Google Places API.
      // It then displays markers for all the shops returned,
      // with on-click details for each hotel.

      // This example requires the Places library. 

      var map, places, infoWindow;
      var markers = [];
      var autocomplete;
      var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
      var hostnameRegexp = new RegExp('^https?://.+?/');

      function initMap() {
         google.maps.visualRefresh = true;
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: 'roadmap'
    
        });

        infoWindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });

        // Create the autocomplete object and associate it with the UI input control.
        // Restrict the search to US, and to place type "cities".
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('autocomplete')), {
              types: ['(cities)'],
            });
        places = new google.maps.places.PlacesService(map);

        autocomplete.addListener('place_changed', onPlaceChanged);

        //  DOM event listener to react when the user makes selection
  
      }


      // When the user selects a city, get the place details for the city and
      // zoom the map in on the city.
      function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
          //showing the map and results Div, while hiding the initial query div.
          document.getElementById('map').style.display="block";
          document.getElementById('results_div').style.display="block";
          document.getElementById('startsearch').style.display="none";
          map.panTo(place.geometry.location);
          map.setZoom(14);
          var center = map.getCenter(); google.maps.event.trigger(map, 'resize'); 
          map.setCenter(center);
          search();
        } else {
          document.getElementById('autocomplete').placeholder = 'Enter a city';
        }
      }

      // Search for bike rental in the selected city, within the viewport of the map.
      function search() {
        var search = {
          bounds: map.getBounds(),
          types: ['bicycle_store']
        };

        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            // Create a marker for each shop found
            for (var i = 0; i < results.length; i++) {
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: "./images/bike.png"
              });
              // If the user clicks a shop marker, show the details 
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', showInfoWindow);
              setTimeout(dropMarker(i), i * 100);
              addResult(results[i], i);
            }
          }
        });
      }

      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          if (markers[i]) {
            markers[i].setMap(null);
          }
        }
        markers = [];
      }

            // Center and zoom the map on the given selection
      function setAutocompleteCity() {
        var city = document.getElementById('autocomplete').value;
        if (city == 'all') {
          autocomplete.setComponentRestrictions([]);
          map.setCenter({lat: 15, lng: 0});
          map.setZoom(2);
        } else {
          autocomplete.setComponentRestrictions({'city': country});
          map.setCenter(countries[country].center);
          map.setZoom(countries[country].zoom);
        }
        clearResults();
        clearMarkers();
      }

      function dropMarker(i) {

        return function() {
          markers[i].setMap(map);
        };
      }

      function addResult(result, i) {
        var results = document.getElementById('results');
        var resultDiv = document.createElement('div');
        resultDiv.style.padding = "20px";
        resultDiv.style.float = "left";
        resultDiv.style.borderStyle = "solid";
        resultDiv.style.backgroundColor = "white";
        resultDiv.style.margin= "15px";
        resultDiv.style.borderColor= "red";
        resultDiv.style.borderWidth= "1px";
        resultDiv.style.width= "200px";
        resultDiv.style.height = "250px";
        resultDiv.style.textAlign = "left";
  
        resultDiv.onclick = function() {
        google.maps.event.trigger(markers[i], 'click');
        };

        var idDiv = document.createElement('div');
        idDiv.innerHTML = '<input type="checkbox" name="checkbox" value="'+result.place_id+'"/> Contact <hr class="dotted">';
        resultDiv.appendChild(idDiv);

        var nameDiv = document.createElement('div');
        nameDiv.innerHTML = "<h4>" + result.name + "</h4>";
        resultDiv.appendChild(nameDiv);

        var addressDiv = document.createElement('div');
        addressDiv.innerHTML = "<p>" + result.vicinity + "</p>";
        resultDiv.appendChild(addressDiv);

        // var urlDiv = document.createElement('div');
        // var url = document.createTextNode(result.url);   
        // urlDiv.appendChild(url);
        // resultDiv.appendChild(urlDiv);

        var phoneDiv = document.createElement('div');
        var phone = document.createTextNode(result.phone);   
        phoneDiv.appendChild(phone);
        resultDiv.appendChild(phoneDiv);     

        results.appendChild(resultDiv);
      }
      

///form that collets the Google store IDs user is interested in.
 function collectIds( form ) {
  var boxes =  document.getElementById('ids');
  var boxIds= [];// array that will store the value of selected checkboxes
   if (boxes.childNodes.length > 1) {
    // It will have 1 -the submit button
  var inputs = document. getElementsByTagName('input');//gets all the input tags in form
  var len = boxes.length;
    for(var i=0; i<len; i++) {
    if (boxes[i].checked === true)
      boxIds.push(boxes[i].value); 
    }
        localStorage.setItem('boxIds', JSON.stringify(boxIds));
        alert(boxIds);
        window.location.replace("/contact_page");
    return boxIds;
  } else {

  }
 }


function clearResults() {
  var results = document.getElementById('results');
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}



      // Get the place details for bike shop. Show the information in an info window,
      // anchored on the marker for the shop that the user selected.
      function showInfoWindow() {
        var marker = this;
        places.getDetails({placeId: marker.placeResult.place_id},
            function(place, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
              }
              infoWindow.open(map, marker);
              buildIWContent(place);
            });
      }

      // Load the place information into the HTML elements used by the info window.
      function buildIWContent(place) {
        document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
            '">' + place.name + '</a></b>';
        document.getElementById('iw-address').textContent = place.vicinity;

        if (place.formatted_phone_number) {
          document.getElementById('iw-phone-row').style.display = '';
          document.getElementById('iw-phone').textContent =
              place.formatted_phone_number;
        } else {
          document.getElementById('iw-phone-row').style.display = 'none';
        }
        if (place.website) {
          var fullUrl = place.website;
          var website = hostnameRegexp.exec(place.website);
          if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
          }
          document.getElementById('iw-website-row').style.display = '';
          document.getElementById('iw-website').textContent = website;
        } else {
          document.getElementById('iw-website-row').style.display = 'none';
        }

      }

$('input[name="daterange"]').daterangepicker(
{
    locale: {
      format: 'YYYY-MM-DD'
    },
    startDate: '2017-01-01',
    endDate:  '2017-01-31'
});


$( "#contact_form" ).submit(function( event ) {
event.preventDefault();
var boxIds = localStorage.getItem('boxIds');

$( '#storeIds' ).val(boxIds);
var request=$(this).serialize();
alert (request);
$.post('/users', request, function(request) {
alert ('request after post', request);
// renderthanks (request);
});
$(this).trigger("reset");
  });




