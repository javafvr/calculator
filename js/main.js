$(document).ready(function() {

	var $srcValue = $('#imgHolder img').attr('src');
	var $carImg = $('#imgHolder img');

	$('#colorsSelector .colorItem').on('click', function() {
		var imgPath;

		imgPath=$(this).attr('data-img-path');

		$carImg.fadeOut('1000', function() {

			$carImg.attr('src', imgPath).fadeIn('1000');
		});
	});
});