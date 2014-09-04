var festivalServices = angular.module('festivalServices', ['ngResource']);

festivalServices.factory('FsConfService', ['$resource',
//function($http) {
//	return {
//		fetchMonths : function(ctrlScope) {
//			$http.get('data/fsconf-months.json').then(function(response) {
//				ctrlScope.months = response.data;
//			});
//		},
//		fetchSeasons : function(ctrlScope) {
//			$http.get('data/fsconf-seasons.json').then(function(response) {
//				ctrlScope.seasons = response.data;
//			});
//		},
//		fetchCountries : function(ctrlScope) {
//			//ctrlScope.contents= FsCache.get('fs-content');
//			$http.get('data/fsconf-countries.json').then(function(response) {
//				ctrlScope.countries = response.data;
//			});
//		}
//	};
//
//}
function($resource) {
	return $resource('data/:fsconfPart.json', {}, {
		getMonths : {
			method : 'GET',
			params : {
				fsconfPart : 'fsconf-months'
			},
			isArray : true
		},
		getSeasons : {
			method : 'GET',
			params : {
				fsconfPart : 'fsconf-seasons'
			},
			isArray : true
		},
		getCountries : {
			method : 'GET',
			params : {
				fsconfPart : 'fsconf-countries'
			},
			isArray : true
		}
	});
}]);

festivalServices.factory('FsContentService', ['$resource',
//function($http) {
//	return {
//		fetchContents : function(ctrlScope) {
//			$http.get('data/fs-content.json').then(function(response) {
//				ctrlScope.contents = response.data;
//			});
//		}
//	}
//}
function($resource) {
	return $resource('data/:fs.json', {}, {
		getContents : {
			method : 'GET',
			params : {
				fs : 'fs-content'
			},
			isArray : false
		}
	});
}])
