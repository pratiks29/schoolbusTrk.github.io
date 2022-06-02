
var myLatLng = { lat: 19.076, lng: 72.8777 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};


var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);


var directionsService = new google.maps.DirectionsService();


var directionsDisplay = new google.maps.DirectionsRenderer();


directionsDisplay.setMap(map);

//geolocation
var lat=0;
var lon = 0;
const success = (position)=>{
        lat = position.coords.latitude;
        lon = position.coords.longitude;
}
const failure  =(err) =>{
    console.log(err);
}
window.navigator.geolocation.getCurrentPosition(success, failure);



function calcRoute() {
   
    var request = {
        //new google.maps.LatLng(lat, lon)
        origin: new google.maps.LatLng(lat, lon),// dadar lat lon-- new google.maps.LatLng(19.02037086633451, 72.8437667900414)
        destination: new google.maps.LatLng(19.02037086633451, 72.8437667900414),//pvpp college latlon 19.050648511672744, 72.878396909959
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING, 
        unitSystem: google.maps.UnitSystem.METRIC,
        
    }

   
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

          
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: your location "  + ".<br />To: School "  + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

           
            directionsDisplay.setDirections(result);
        } else {
           
            directionsDisplay.setDirections({ routes: [] });
            
            map.setCenter(myLatLng);

            
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);