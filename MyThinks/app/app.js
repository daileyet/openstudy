var app = angular.module('festivalApp', ['ngRoute', 'festivalCtrls', 'festivalServices']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/festivals/:mon/:date', {
			templateUrl: 'views/festival-details.html',
			controller: 'FestivalDetailsCtrl'
		}).when('/add/:mon', {
			templateUrl: 'views/festival-add.html',
			controller: 'FestivalAddCtrl'
		}).otherwise({
			redirectTo: '/'
		});
	}
]);