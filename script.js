angular.module("myapp", ['ngRoute']).config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'map.html',
		controller: 'GlobalController'
	}).when('/add',{
		templateUrl: 'add.html',
		controller: 'AddController'
	}).when('/post/:index',{
		templateUrl: 'post.html',
		controller: 'PostController'
	})
}).filter('firstcharacters', function(){
	return function(text){
		return text.substr(0,45)+"...";
	}
}).controller("GlobalController",function($scope){
	$scope.user={
		name: "Julio López Montalvo",
		descripcion: "Full Stack Developer. Systems Engineer. Founder of @codalotla . Javascript & Ruby lover. Passionate about new technologies, code, agile.",
		urlimg: "perfil.jpeg"
	};
	$scope.data = [
		{texto: "This app is really awesome! Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum ", fecha: "12/04/2014", coordenadas: [-25.363882,122.044922]},
		{texto: "I want to doing code right now!Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum ", fecha: "12/04/2014", coordenadas: [-20.363882,128.044922]},
		{texto: "Maybe Ruby is more beautiful than... :D Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum Lorem lorem lipsum lorem lipsum ", fecha: "12/04/2014", coordenadas: [-28.363882,131.044922]}
	];
}).controller("HomeController", function($scope){
}).controller("AddController", function($scope, $location){
	$scope.add = function(){
		console.log($scope.data);
		$scope.data.push({texto: $scope.text, coordenadas: [$scope.coorx, $scope.coory]});
		$location.path('/');
	};
}).controller("PostController", function($scope, $routeParams, $location){
	$scope.iduser = $routeParams.index-1;
	$scope.back = function(){
		$location.path('/');
	}
});