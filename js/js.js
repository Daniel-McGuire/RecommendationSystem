
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
	
	var attractionType = data.head.vars[1]; //header for table. retrieves "museum"
	var locationHeader = data.head.vars[0]; //header for table. retrieves "location"
    var locations = [];
	for (i = 0; i< data.results.bindings.length; i++){ //loops through JSON 
			var latitude =  parseFloat(data.results.bindings[i].lat.value); //gets latitude
			var longitude = parseFloat(data.results.bindings[i].long.value); //gets longitude
			var attraction = data.results.bindings[i].museums.value; //gets name of museum
			var location = data.results.bindings[i].location.value; //gets location name
			
	        
			locations.push({name:attraction, latlng: new google.maps.LatLng(latitude, longitude)} );
			
	//plot latitude and longitude on map
	drawMap(latitude, longitude, locations, location); //passes parameters to drawMap function
	
    resultsPanel.innerHTML += "<br />" 
						   + attractionType 
						   + "<br />" 
						   + " Location: " 
						   + location 
						   + "  Name: " 
						   + attraction; //this would look better displayed in a table. 
	
	}
	
}





function drawMap(latValue, longValue, locations, location) {
		var map;
		var myLatLong = {lat: latValue, lng: longValue};
		
        map = new google.maps.Map(document.getElementById('map'), { //draw map in map div
          center: myLatLong, //position center based on latitude and lonitude
          zoom: 10
        });
		
		for(i = 0; i < locations.length; i++){
		var marker = new google.maps.Marker({
          position: locations[i].latlng, 
		  map:map, 
		  title:locations[i].name      		  
      });
		}
}

//Show map and results div on click on search

			function showDiv() {
			   document.getElementById('results').style.display = "block";
				 document.getElementById('map').style.display = "block";

			}
