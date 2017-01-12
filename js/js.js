
 //this is the function for the map when the page first loads.
	  var map;
	  function initMap() {
        map = new google.maps.Map(document.getElementById('map'), { //draw map in map div
          center: {lat: 51.5, lng: -0.11666666666666667}, //position center based on latitude and lonitude - United Kingdom
          zoom: 7
        });
      }

//changes the colour of the buttons if they are checked.
function checkBoxSelection(CheckboxID, LblID) {
	"use strict";
	var labelID = document.getElementById(LblID);

	if(document.getElementById(CheckboxID).checked == true) {
	labelID.style.backgroundColor= "#789E9E";
	labelID.style.color= "white";
	}
	else {
		labelID.style.backgroundColor= "#cfe2e2";
		labelID.style.color= "#696262"
	}

}


var resultsPanel = document.getElementById("results");
var btn = document.getElementById("search-btn");

btn.addEventListener("click", function() { //when button is clicked...

	var url = "http://dbpedia.org/sparql";

	var query = [  //save SPARQL query in JavaScript variable called 'query'
	
	"SELECT DISTINCT ?location ?museums MAX(?lat) as ?lat MAX(?long) as ?long",
	"WHERE {",
	"?m rdf:type dbo:Museum.",
	"?l dbo:location ?x.",
	"?x dbo:country dbr:United_Kingdom",
	"FILTER regex(?location, \"" + document.getElementById("search-box").value + "\" ,\"i\")",  
	"?m dbo:location ?x;",
    "geo:lat ?lat;",
	"geo:long ?long.",
	"?m rdfs:label ?museums.",
	"FILTER langMatches( lang(?museums), \"EN\" )",
	"?x rdfs:label ?location.",
	"FILTER langMatches( lang(?location), \"EN\" )",
	"}",
	].join(" ");

	//create variable for the URI of the query called 'queryURl'
	var queryUrl= url+"?query="+ encodeURIComponent(query) +"&format=json";
	var HTTPRequest = new XMLHttpRequest();

	HTTPRequest.open('GET', queryUrl); //'POST' = send data 'GET' = receive
		HTTPRequest.onload = function(){
		console.log(HTTPRequest.responseText); //prints the JSON to the console
		var JSONData = JSON.parse(HTTPRequest.responseText);
		getLatLong(JSONData);
		};

	HTTPRequest.send();

});

function getLatLong(data){
	//loop through JSON to get results
	var table = tbl  = document.createElement('table');
	
	var attractionType = data.head.vars[1];
	var locationHeader = data.head.vars[0];

	for (i = 0; i< data.results.bindings.length; i++){
			var latitude =  parseFloat(data.results.bindings[i].lat.value);
			var longitude = parseFloat(data.results.bindings[i].long.value);
			var attraction = data.results.bindings[i].museums.value;
			var location = data.results.bindings[i].location.value;
			

	//plot latitude and longitude on map
	
	drawMap(latitude, longitude, location);
    resultsPanel.innerHTML += "<br />" + attractionType + "<br />" + " Location: " + location + "  Name: " + attraction;
	
	}
	
}





function drawMap(latValue, longValue, location) {
		var map;
		var myLatLong = {lat: latValue, lng: longValue};
		
        map = new google.maps.Map(document.getElementById('map'), { //draw map in map div
          center: myLatLong, //position center based on latitude and lonitude
          zoom: 10
        });
		
		var marker = new google.maps.Marker({
          position: myLatLong,
          map: map,
		  title: location
		  
      });
	  
}

//Show map and results div on click on search

			function showDiv() {
			   document.getElementById('results').style.display = "block";
				 document.getElementById('map').style.display = "block";

			}
