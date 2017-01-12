
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

"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
"PREFIX type: <http://dbpedia.org/class/yago/>",
"PREFIX prop: <http://dbpedia.org/property/>",

"SELECT ?lat ?long ?location",
"WHERE{",
"?a dbo:location ?location;",
"geo:lat ?lat;",
"geo:long ?long.",
"?location dbo:country dbr:United_Kingdom.",
"FILTER regex(?location, \"" + document.getElementById("search-box").value + "\" ,\"i\")",  // same as e.g. ... "FILTER regex(?city, "Cardiff", "i")",
"}LIMIT 1",
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

	for (i = 0; i< data.results.bindings.length; i++){
			var latitude =  parseFloat(data.results.bindings[i].lat.value);
			var longitude = parseFloat(data.results.bindings[i].long.value);
			var location = data.results.bindings[i].location.value;
		}

	//plot latitude and longitude on map

	drawMap(latitude, longitude);
}

function drawMap(latValue, longValue) {
		var map;
        map = new google.maps.Map(document.getElementById('map'), { //draw map in map div
          center: {lat: latValue, lng: longValue}, //position center based on latitude and lonitude
          zoom: 10
        });
      }

//Show map and results div on click on search

			function showDiv() {
			   document.getElementById('results').style.display = "block";
				 document.getElementById('map').style.display = "block";

			}
