// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.


//= require jquery
//= require turbolinks
//= require jquery_ujs
//= require ./inner/vendor.js
//= require ./inner/dependencies.js
//= require ./inner/wrapkit.js
//= require ./inner/wrapkit-setup.js
//= require ./inner/dashboard1-demo.js
//= require ./inner/moment.min.js
//= require ./inner/daterangepicker.js
//= require_self


$(document).ready(function(){

  // // for bootstrap date picker
  $('.daterangepicker1').daterangepicker({
  	locale: {
      format: 'DD/MM/YYYY'
    }
  });

  
})

  
