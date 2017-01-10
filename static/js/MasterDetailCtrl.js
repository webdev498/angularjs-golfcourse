//var myApp = angular.module('myApp', ['google-maps','ui.bootstrap']);

var myApp = angular.module('myApp', ["leaflet-directive",'angular-loading-bar','geolocation']);

//  Force AngularJS to call our JSON Web Service with a 'GET' rather than an 'OPTION' 
//  Taken from: http://better-inter.net/enabling-cors-in-angular-js/
myApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
   delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

myApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = false;
  }]);
  
    
 
myApp.controller('MasterDetailCtrl',
    function ($scope, $http,geolocation) {

        geolocation.getLocation().then(function(){
            setTimeout(want_geocode,2000);
        },function(error) {
            $(".geocode-link").css("display","none");
        });
        
        $scope.filters = { };
        //  We'll load our list of Customers from our JSON Web Service into this variable
        $scope.listOfCustomers = null;
        

        $scope.listOfCustomersfromName = null;
        $scope.listOfCustomersfromLATLON = null;

        //  When the user selects a "Customer" from our MasterView list, we'll set the following variable.
        $scope.selectedCustomer = null;

        $scope.address = "";

        $scope.selectCustomer = function(Customer)
        {
            $scope.position ={

                lat: Customer.latitude,
                lng: Customer.longitude,
                zoom: 14
            };
            
            var index = $scope.get_index_from_Customer(Customer);

            for(var i = 0; i<$scope.listOfCustomers.length; i++)
            {
                if(i == index)
                {
                    $scope.markers[i].focus = true;
                }
                else
                {
                    $scope.markers[i].focus = false;
                }
            }
        }

        function want_geocode(){
            if(confirm("Search for courses near your current location?")){
                $scope.geocode_search();
            }
        }
        $scope.get_index_from_Customer = function(Customer){
            var index;

            for(var i = 0 ; i < $scope.listOfCustomers.length ; i++){
                if($scope.listOfCustomers[i] == Customer){
                    index = i ; 
                    break;
                }
            }

            return index;
        }
        $scope.processForm = function(address) 
        {
            $http.post('test.php?courseName='+ address, {ignoreLoadingBar: true})
                    .success(function (data) {

                        $scope.listOfCustomersfromName = data.courseList;

                        $scope.get_LATLON($scope.address);

                    })

                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = "Search Error - Please try searching for your Golf Course again. Error # " + status;
        				alert($scope.errorMessage);
                    });
        };

        $scope.get_LATLON = function(address)
        {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address}, function(results, status) 
            {
                if (status == google.maps.GeocoderStatus.OK) 
                {
                    $scope.latitude = results[0].geometry.location.lat();
                    $scope.longitude = results[0].geometry.location.lng();
                    $scope.get_LATLON_Search($scope.latitude,$scope.longitude);
                }
                else
                {
                    alert("Search Error - Please try searching for your Golf Course again.");
                }
            });
        };

        $scope.get_LATLON_Search = function(lat,lon){
            $http.post('test.php?referenceLatitude='+ lat +'&referenceLongitude='+ lon +'&radius=20', {})
            .success(function (data) {

                $scope.listOfCustomersfromLATLON = data.courseList;

                if($scope.listOfCustomersfromName != null)
                {
                    $scope.listOfCustomers = $scope.get_gpsavailable($scope.get_unique_array($scope.concatArraysUniqueWithSort($scope.listOfCustomersfromName,$scope.listOfCustomersfromLATLON)));
                }
                else
                {
                    $scope.listOfCustomers = $scope.get_gpsavailable($scope.get_unique_array($scope.listOfCustomersfromLATLON));
                }

                if ($scope.listOfCustomers.length > 0) 
                {
                    $scope.selectedCustomer = $scope.listOfCustomers[0].id_course;
                    $scope.mark_on_maps();
                }
                else
                {
                    alert("You can't find any Golf course in this area!");
                    $scope.changeClasstwo();
                }
            })
            .error(function (data, status, headers, config) {
                $scope.errorMessage = "Search Error - Please try searching for your Golf Course again. Error # " + status;  
                alert($scope.errorMessage);             
            });
        };

        $scope.get_gpsavailable = function(arr){
            for(var i = arr.length-1; i>=0; i--){
                if(arr[i].gpsAvailable != 1){
                    arr.splice(i,1);
                }
            }
            return arr;
        }
        
        $scope.concatArraysUniqueWithSort = function (thisArray, otherArray){
            var newArray = thisArray.concat(otherArray).sort(function (a, b) {
                return a > b ? 1 : a < b ? -1 : 0;
            });

            return newArray.filter(function (item, index) {
                return newArray.indexOf(item) === index;
            });
        };

        $scope.get_unique_array = function(arr){
            var return_array = [];
            var duplicated_index = [];

            for(var i = 0 ; i < arr.length ; i++)
            {
                for(var j = i+1 ; j < arr.length; j++)
                {
                    if(arr[i].id_course == arr[j].id_course)
                    {
                        duplicated_index.push(j);
                    }
                }
            }

            for(var i =0 ; i < arr.length; i++)
            {
                if($scope.is_array_in(duplicated_index,i) == false)
                {
                    return_array.push(arr[i]);
                }
            }
            return return_array;
        }

        $scope.is_array_in = function(arr,index)
        {
            var flag = false;
            for(var i = 0 ; i< arr.length; i++)
            {
                if( index == arr[i]){
                    flag = true;
                    break;
                }
            }
            return flag;
        }

        $scope.geocode_search = function()
        {
            $scope.listOfCustomers = null;
            $scope.listOfCustomersfromLATLON = null;
            $scope.listOfCustomersfromName = null;

            geolocation.getLocation().then(function(data){
                $scope.changeClasstwo();
                $scope.get_LATLON_Search(data.coords.latitude,data.coords.longitude);
            });
        }

		$scope.searchagain = function()
        {
            $scope.listOfCustomers = null;
            $scope.listOfCustomersfromLATLON = null;
            $scope.listOfCustomersfromName = null;

            $scope.get_LATLON_Search($scope.position.lat,$scope.position.lng);
        }
        $scope.mark_on_maps = function()
        {
            var positions = [];

            for(var key =0 ; key < $scope.listOfCustomers.length ; key++)
            {
                var latitude = $scope.listOfCustomers[key].latitude;
                var longitude = $scope.listOfCustomers[key].longitude;
                var courseName = $scope.listOfCustomers[key].courseName;
                var city = $scope.listOfCustomers[key].city ? ($scope.listOfCustomers[key].city+' , '):" ";
                var otherState = $scope.listOfCustomers[key].otherState ? ($scope.listOfCustomers[key].otherState+' , '): " ";
                var countryFull = $scope.listOfCustomers[key].countryFull ? $scope.listOfCustomers[key].countryFull : " ";

                var icon = '{"type":"div"'+',"html":"<p class=\\"button\\" ng-click=selectCustomer(Customer)>'+ (key+1) +'</p>"}';

                var item = '{"layer":"courseclusters","lat":'+latitude+',"lng":'+longitude+',"focus":' + false +',"icon":'+icon+',"message":"<strong>' + courseName +'</strong><br/>'+ city +otherState + countryFull +'<br/><a href=\\"https://www.google.co.uk/search?q='+ courseName +'\\" target=\\"_blank\\" title=\\"Search for course info\\">Course Info &gt;</a>"}';
                positions.push(item);
            }
			

            positions = "[" + positions +"]";

            $scope.markers = JSON.parse(positions);
            $scope.position = {
                lat:$scope.listOfCustomers[0].latitude,
                lng:$scope.listOfCustomers[0].longitude,
                zoom:14
            };
                        
        };


        //default Show map
        angular.extend($scope, {
            defaults: 
            {
                zoomControlPosition: 'bottomright',
				minZoom: 2,
				controls : {
					layers : {
						position: 'bottomright',
						visible: true,
						collapsed: true
							}
						}
            },
            
            position: {
                lat: 51.50,
                lng: 0.13,
                zoom: 2
            },
			 events: {
            map: {
                enable: ['dragend','focus','load','popupopen','viewreset'],
                logic: 'emit'
            }
			},
			
            layers: {
                baselayers: {
                
                street: {
                      name: 'Street',
                      type: 'xyz',
                      url: 'https://{s}.api.tomtom.com/lbs/map/3/basic/1/{z}/{x}/{y}.png?key=d8f9uzdkd3hpuq55qpsdtsx8',
                      layerOptions: {
                        subdomains: ['a', 'b', 'c', 'd']
                      }
                    },
                	googleSatellite: {
                        name: 'Google Satellite',
                        layerType: 'SATELLITE',
                        type: 'google'
                    }
                    
                },
				overlays: {
    courseclusters: {
      name: 'Courses',
       // type: 'group',
	  type: 'markercluster',
      visible: true,
      layerParams: {},
      layerOptions: {}
    }
	}		
            
			
			}
        });
		

		$scope.$on('leafletDirectiveMap.dragend', function(event){
        $scope.eventDetected = "a";
    });
	$scope.$on('leafletDirectiveMap.focus', function(event){
        $scope.eventDetected = "0";
    });
	$scope.$on('leafletDirectiveMap.load', function(event){
        $scope.eventDetected = "0";
    });
	$scope.$on('leafletDirectiveMap.viewreset', function(event){
        $scope.eventDetected = "0";
    });
	$scope.$on('leafletDirectiveMap.popupopen', function(event){
        $scope.eventDetected = "0";
    });

});
		


myApp.directive('scrollTo', function ($location, $anchorScroll) {
    return function(scope, element, attrs) {
    element.bind('click', function(event) {
			event.stopPropagation();
			scope.$on('$locationChangeStart', function(ev) {
			  ev.preventDefault();
			});
			var location = attrs.scrollTo;
			$location.hash(location);
			$anchorScroll();
		});
	};
  });
  
  
myApp.controller("con",function($scope){
    
    $scope.class = "red";
    
    $scope.changeClass = function(){
        if ($scope.class === "red")
            $scope.class = "blue";
         else
            $scope.class = "red";
    };
	
	  $scope.classtwo = "red";
    
    $scope.changeClasstwo = function(){
        if ($scope.classtwo === "red")
            $scope.classtwo = "blue";
         else
            $scope.classtwo = "blue";
    };
	
	
	  $scope.classthree = "blue";
    
    $scope.changeClassthree = function(){
        if ($scope.classthree === "blue")
            $scope.classthree = "red";
         else
            $scope.classthree = "blue";
    };
});

            