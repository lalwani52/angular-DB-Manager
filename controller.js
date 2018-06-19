var app = angular.module('loginApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'login.html'
	})
	.when('/welcome',{
		resolve: {
			"check": function($location,$rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/');
				}
			
			}
		},
		templateUrl: 'welcome.html'
	})

	.when('/detail/:itmId',{
		templateUrl: 'detail.html',
		controller: 'listEmp'
	})
	.otherwise({
		redirectTo: '/'
	});
});

var users = ["admin1", "admin2", "admin3", "admin4"];
var passwords = ["pass1", "pass2", "pass3", "pass4"];
app.controller('loginCtrl', function($scope,$location,$rootScope,myservice){
	 

	$scope.submit = function() {
		
	var user = $scope.username;
	var pass = $scope.password;
	for(var i=0;i<users.length;i++){
	if(user==users[i] && pass==passwords[i]){
		$rootScope.loggedIn=true;
		myservice.setUser(user);
		$location.path('/welcome');
		
		}
	else 
	{ 
	document.getElementById("invalidcreds").innerHTML = "Invalid Credentials";
		}
	}		
	};
});

app.controller('userCtrl',function($scope,$location,$rootScope, myservice){
	$scope.user = myservice.getUser();
});
app.controller('listEmp',function($scope,$location,$routeParams,DETservice){
	$scope.items = [
    { id: 0, name: 'Leon', description: 'Senior Manager', image: 'http://www.cstumpodevelopment.com/wp-content/uploads/2016/02/team-placeholder-gray.png'},
    { id: 1, name: 'Pam', description: 'Assistant Manager',image: 'https://booking.evenementenhal.nl/img/employees/support-employee-placeholder.png' },
    { id: 2, name: 'Harry', description: 'Software Developer', image: 'http://www.cstumpodevelopment.com/wp-content/uploads/2016/02/team-placeholder-gray.png' },
    { id: 3, name: 'Allyce', description: 'Sales Rep', image: 'https://booking.evenementenhal.nl/img/employees/support-employee-placeholder.png'}
  ];
  $scope.third = function(item) {
	  var itmId = item.id;
	  var itmName = item.name;
	  var itmDesc = item.description;
	  var itmImg = item.image;
		DETservice.setId(itmId);
		DETservice.setName(itmName);
		DETservice.setDesc(itmDesc);
		DETservice.setImg(itmImg);
	  $location.path('/detail/'+itmId);
  };
});	
app.controller('EMPdets',function($scope,$location,$rootScope,DETservice){
	$scope.itmId = DETservice.getId();
	$scope.itmName = DETservice.getName();
	$scope.itmDesc = DETservice.getDesc();
	$scope.itmImg = DETservice.getImg();
	
});
app.service('myservice', function() {
		this.currentUser ={}
      this.setUser = function(user) {
		  this.currentUser=user;
	  }
	  this.getUser = function() {
		  return this.currentUser;
	  }
	  
	 
    });
	
app.service('DETservice', function() {
		this.currentId ={}
      this.setId = function(itmId) {
		  this.currentId=itmId;
	  }
	  this.getId = function() {
		  return this.currentId;
	  }
	  
	  	this.currentName ={}
      this.setName = function(itmName) {
		  this.currentName=itmName;
	  }
	  this.getName = function() {
		  return this.currentName;
	  }
	  
	  	  	this.currentDesc ={}
      this.setDesc = function(itmDesc) {
		  this.currentDesc=itmDesc;
	  }
	  this.getDesc = function() {
		  return this.currentDesc;
	  }
		this.currentImg ={}
      this.setImg = function(itmImg) {
		  this.currentImg=itmImg;
	  }
	  this.getImg = function() {
		  return this.currentImg;
	  }
    });	
