var myApp = angular.module('myApp', []);

myApp.factory('DisasterFactory', function ($http) {
	var factory = {};
	var disasters = [];
	var countries = [];

	factory.getCountries=function(callback) {
		$http.get('/countries.json').success(function(data){
			countries = data;
			callback(countries);
		})
	}
	factory.getDisasters=function (country, callback) {
		var url = '/disasters.json?countryPick='+country;
		console.log(url);
		$http.get(url).success(function (data){
			disasters = data;
			//console.log(disasters);
			callback(disasters);
		})
	}
	return factory;
})
myApp.controller('DisastersCtrl', function ($scope, DisasterFactory) 
{
	$scope.disasters = [];
	DisasterFactory.getCountries(function(data){
		$scope.countries = data;
	});

	$scope.disasters_by_country = function(){
		DisasterFactory.getDisasters($scope.country, function(data){
			$scope.disasters = data;
		});

	} 
})