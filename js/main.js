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


	var modelSpecs,
		modelPrice,
		modelSpecsHolder,
		modelPriceHolder,
		modelPriceUSDHolder;

	modelSpecsHolder = $('#modelSpecs');
	modelPriceHolder = $('#modelPrice');
	modelPriceUSDHolder = $('#modelPriceUSD');


	modelPrice = 0;
	modelSpecs = '';

	$('#autoForm input').on('change', function() {
		calculatePrice();
		compileSpecs();
		getCurrency();
	});
	
	calculatePrice();
	compileSpecs();
	getCurrency();

	function calculatePrice() {
		var modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
		var modelPriceTransmission = $('input[name=transmission]:checked', '#autoForm').val();
		var modelPricePackage = $('input[name=package]:checked', '#autoForm').val();

		modelPriceEngine = parseInt(modelPriceEngine);
		modelPriceTransmission = parseInt(modelPriceTransmission);
		modelPricePackage = parseInt(modelPricePackage);

		modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage;

		modelPriceHolder.text(addSpace(modelPrice) + ' рублей');
		
	}

	function compileSpecs() {
		modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
		modelSpecs = modelSpecs + ', ' + $('input[name=transmission]:checked + label', '#autoForm').text();
		modelSpecs = modelSpecs + ', ' + $('input[name=package]:checked + label', '#autoForm').text() + '.';
		
		modelSpecsHolder.text(modelSpecs);
	}

	function addSpace(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ' ' + '$2');
		}
		
		return x1 + x2;
	}

	function getCurrency() {
		var currencyUrl = "https://www.cbr-xml-daily.ru/daily_json.js";
		var rurUsdRate = 0;
		$.ajax({
			url: currencyUrl,
			cache: false,
			dataType:'json',
			success: function(html) {
				rurUsdRate = html.Valute.USD.Value;
				calculateUSD(rurUsdRate);
		 		
	 	}});
	}

	function calculateUSD(rurUsdRate) {
		var modelPriceUSD = modelPrice / rurUsdRate;
		modelPriceUSDHolder.text('$ ' + addSpace(modelPriceUSD.toFixed(0)));
	}


});