angular.module("myapp", ['ngRoute', 'firebase'])
.value('fbURL', 'https://youwrotehere.firebaseio.com')
.factory('Posts', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL));
})
.factory('Post', function($firebase, fbURL){
	return function(postId){
		return $firebase(new Firebase(fbURL + postId));
	}
}).service('Map', function($timeout, Posts){
	this.draw = function(){
		//give it time to call Posts!
		$timeout(function(){
			var myLatlng = new google.maps.LatLng(Posts[0].coorx,Posts[0].coory);
		  	var mapOptions = {
		    	zoom: 4,
		    	center: myLatlng
		  	};
	  	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	        angular.forEach(Posts,function(item, key){
	        	//that's because $firebase inject by prototype, methods can it show error if we use to initialize LatLng
	        	if(item.texto){
		        	new google.maps.Marker({
					    position: new google.maps.LatLng(parseFloat(item.coorx),parseFloat(item.coory)),
					    map: map,
					    title: item.texto
					});
				}
	        });
		},2000);
	}
})
.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'map.html'
	}).when('/add',{
		templateUrl: 'detail.html',
		controller: 'AddController'
	}).when('/post/:index',{
		templateUrl: 'post.html',
		controller: 'PostController'
	});
}).filter('firstcharacters', function(){
	return function(text){
		return text.substr(0,45)+"...";
	}
}).controller("GlobalController",function($scope, $location, Posts, Map){
	$scope.user={
		name: "Julio López Montalvo",
		descripcion: "Full Stack Developer. Systems Engineer. Founder of @codalotla . Javascript & Ruby lover. Passionate about new technologies, code, agile.",
		urlimg: "perfil.jpeg"
	};
	$scope.posts = Posts;
	Map.draw();
	$scope.back = function(){
		$location.path('/');
	}
}).controller("AddController", function($scope, $location,  Posts, Map){
	$scope.save = function() {
		angular.element(document.getElementById("savepost")).addClass("disabled");
	    Posts.$add($scope.post, function() {
	      	Map.draw();
	      	$scope.back();
	    });
	};
}).controller("PostController", function($scope, $routeParams){
	$scope.idpost = $routeParams.index;
});
