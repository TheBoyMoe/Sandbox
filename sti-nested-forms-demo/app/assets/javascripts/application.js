// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require rails-ujs
//= require turbolinks
//= require_tree .

$(document).on('turbolinks:load', function() {

	// $('form').on('click', '.remove_fields', function(e) {
	// 	// setting val to 1 sets _destroy to true(0 == false)
	// 	$(this).prev('input[type=hidden]').val('1');
	// 	$(this).closest('fieldset').hide();
	// 	return e.preventDefault();
	// });

	$('form').on('click', '.add_fields', function(e) {
		var regexp, time;
		time = new Date().getTime(); // get current time
		regexp = new RegExp($(this).data('id'), 'g'); // generate a regex based on the id
		$(this).before($(this).data('fields').replace(regexp, time)); // each field will have an id based on the current time
		return e.preventDefault();
	});

});