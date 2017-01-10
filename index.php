<html  ng-app="myApp">
<head> <!-- HEAD from http://nlsrvwd-cms01.ttg.global/components.html + STYLES-->
   <meta charset="utf-8">

   <meta http-equiv="X-UA-Compatible" content="IE=10">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
   <title>Course Finder UI v01</title>
   <meta name="description" content="">
   <meta name="keywords" content="">
   <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="mobile-web-app-capable" content="yes">
   <link rel="apple-touch-icon" sizes="72x72" href="static/gfx/apple-touch-icon-72x72.png">
   <link rel="apple-touch-icon" sizes="114x114" href="static/gfx/apple-touch-icon-114x114.png">
   <link rel="apple-touch-icon" sizes="144x144" href="static/gfx/apple-touch-icon-144x144.png">
   <link rel="shortcut icon" type="image/x-icon" href="static/gfx/favicon.png">

   
   
   
   
   <link rel="stylesheet" type="text/css" href="static/css/uikit.min.css">

   <link rel="stylesheet" type="text/css" href="assets/toolbox.min.css">

   <link rel="stylesheet" type="text/css" href="assets/ui.css">
   
<link rel="stylesheet" type="text/css" href="static/css/MasterDetailStyles.css">
   <link rel="stylesheet" type="text/css" href="static/css/app.css">
   <link rel="stylesheet" type="text/css" href="static/css/leaflet.css">
    <link rel="stylesheet" type="text/css" href="static/css/MarkerCluster.Default.css">
    <link rel="stylesheet" type="text/css" href="static/css/loading-bar.min.css">
   
<script type="text/javascript" src = "http://code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="static/js/angular.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAeQbQVwub7moiQH0Eeusby16P5Ab6oOhU&sensor=false"></script>
<script src="static/js/leaflet.js"></script>
<script src="static/js/leaflet.markercluster.js"></script>
<script src="static/js/Google-tile.js"></script>
<script src="static/js/angular-leaflet-directive.min.js"></script>
<script src="static/js/MasterDetailCtrl.js"></script>
<script src="static/js/loading-bar.js"></script>
<script src="https://rawgithub.com/arunisrael/angularjs-geolocation/master/dist/angularjs-geolocation.min.js"></script>

	<style>html, body, .angular-leaflet-map {
			height: 100%;
		}
		form.leaflet-control-layers-list label {font-size:12px;color:#333;text-transform:none}
		
		#google-map-overlay {
    width  : 100%;
    position: initial;
    top: 0px; 
    left: 0px; 
    z-index: 99;
}
.container {min-width:300px;max-width:300px;padding:10px}
.results {margin-top:0px;margin-left:10px;z-index:9999;position:relative}
.search {margin: 0px;
    min-width: 320px;
    max-width: 320px;}
.badge {
background: none repeat scroll 0% 0% #BDD731;
min-height: 24px;
min-width: 24px;
border-radius: 12px;
font-size: 12px;
padding: 6px 2px;
}
.number {margin-top:0px}
.wrapper {margin-left: 36px;}
.red{
    display:none !important;
}

.blue{
    display:block !important;}

.search-field {display: inline-block;
width: 200px;}
.tt-btn-trigger {display: inline;}

.geocode-wrapper {box-shadow: 0 1px 5px rgba(0,0,0,0.4);
background: #fff;
border-radius: 5px;
position: absolute;bottom: 20px;left:10px;z-index:800}

.geocode-link {

background-image: url(/visual4/static/images/geocode.png);
width: 36px;
height: 36px;
background-position: 50% 50%;
background-repeat: no-repeat;
display: block;
cursor:pointer;}

h5.inlineh,.loading-bar-spinner {display: inline !important;}

.searchagain {opacity:0; position:absolute;bottom:60px;z-index:9000;margin-left: auto;
margin-right: auto;
left: 0;
right: 0;}
.searchagainmodal {margin:0 auto; position:relative;text-align:center;}
.a11,.a10,.a9,.a8,.a7,.a6,.a5,.a4,.a3 {opacity:1 !important}

</style>
</head>
 <body ng-controller="con">

<div id="google-map-overlay" ng-controller='MasterDetailCtrl' class="angular-leaflet-map">
    <leaflet center="position" layers="layers" markers="markers" defaults="defaults" event-broadcast="events"></leaflet>
	<div class="geocode-wrapper"><a class="geocode-link" title="Use my location" ng-click="geocode_search()"></a></div>
    
	<div class="{{(eventDetected + position.zoom)}} searchagain">
		<div class="searchagainmodal">
		
		<form ng-submit="searchagain()">
		<input type="hidden" name="latitude" value="{{position.lat}}" ng-model="poslat">
		<input type="hidden" name="longitude" value="{{position.lng}}" ng-model="poslng">
		<div class="tt-btn-trigger">
      <input type="submit" value="Load more results?" class="btn btn-primary-branded shady" ng-click="changeClasstwo()">
    </div>
    </form>
		</div>
	</div>
	<div style="position: absolute;top: 10px;">
      <div class="container search">
  	
  	
  	   <form ng-submit="processForm(address)">
        <div class="btn btn-primary-light search-field shady">
          <span class="tt-icons icon-search"></span>
          <input type="text" placeholder="" ng-model="address">
       
        </div>
		<div class="tt-btn-trigger">
<input type="submit" value="Search" class="btn btn-primary-branded shady" ng-click="changeClasstwo();filters.id_course = ''">
</div>
  	  </form>
	  
	 
      </div>

      <div class="container results tb shady" ng-class="classtwo">

        <div class="container-input" style="display:inline-block"></div>
  	   



	   <div id="divMasterView">
	       <a ng-click="changeClass(); changeClassthree()"  ng-class="class" style="cursor:pointer">&lt; Back to results list</a>
		   <div ng-class="classthree">
           <div id="anchor{{$index+1}}" class="cssOneCompanyRecord" ng-repeat='Customer in listOfCustomers' ng-click="selectCustomer(Customer); changeClass(); changeClassthree();" title="View this course on a map">
            
			  <span class = "badge number">{{$index+1}}</span>
              <div class="wrapper">
                <div class="small"><strong>{{Customer.courseName}}</strong></div>
                <div class="small">{{Customer.city}} {{Customer.otherState}} {{Customer.countryFull}}</div>
              </div>
          </div>
       </div>
	   </div>
	   
	   
	   
      </div>
    </div>
</div>
</body>
</html>
