// CLIENT-SIDE JS

$(document).ready(function() {

console.log ("app.js loaded");

$( "#location-form form form" ).submit(function(event) {
alert("yo");
event.preventDefault();
var location = $(this).serialize();
console.log(location);
});

// javascript for the data collector widget
$(function() {
  $('input[name="datefilter"]').daterangepicker({
      autoUpdateInput: false,
      locale: {
          cancelLabel: 'Clear'
      }
  });
  $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  });
  $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });
});






});