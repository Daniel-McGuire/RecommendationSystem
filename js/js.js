var resultsPanel = document.getElementById("results");
var response = null;


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


//Show map and results div on click on search

function showDiv() {
	 document.getElementById('results').style.display = "block";
	 document.getElementById('map').style.display = "block";
	}


	
function getSPARQL_JSON(x) { 
	var url = "http://dbpedia.org/sparql";
	var query = "hello";
    
	if (x == 0){ //if search-btn is clicked...
	if (document.getElementById("shopping").checked == true)
		{
			query = [chooseQuery("dbo:ShoppingMall")].join(" ");
		}
		if (document.getElementById("histBuild").checked == true)
		{
			query = [chooseQuery("dbo:HistoricBuilding")].join(" ");
		}
		if (document.getElementById("museums").checked == true)
		{
			query = [chooseQuery("dbo:Museum")].join(" ");
		}
		if (document.getElementById("castles").checked == true)
		{
			query = [chooseQuery("dbo:Castle")].join(" ");
		}
		
	}
	
	
	if (x == 1){ //if test-btn is clicked...
		query = response; //value of response variable has been changed in the getQueries() function
	}
	

	//create variable for the URI of the query called 'queryURl'
	var queryUrl= url+"?query="+ encodeURIComponent(query) +"&format=json";
	var HTTPRequest = new XMLHttpRequest();

	HTTPRequest.open('GET', queryUrl); //'POST' = send data 'GET' = receive
		HTTPRequest.onload = function(){
		console.log(HTTPRequest.responseText); //prints the JSON to the console to check
		var JSONData = JSON.parse(HTTPRequest.responseText);
		getLatLong(JSONData);//send JSON to getLatLong function
		};

	HTTPRequest.send();

}

function getQueries(){
    var hr = new XMLHttpRequest(); // Create XMLHttpRequest object
    var url = "/PHP/getQuery.php"; 
    hr.open('GET', url);
	
    // Access the onreadystatechange event for the XMLHttpRequest object
	hr.onload = function() {
			if(hr.readyState == 4 && hr.status == 200){
		    response = hr.responseText; //save the returned query in the response variable			
	    }
		}

    // Send the data to PHP now... and wait for response
    hr.send(); // Actually execute the request
}

function chooseQuery(type){
	//save SPARQL query in JavaScript variable called 'query'
	query =   
	 "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
	+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
    + "PREFIX type: <http://dbpedia.org/class/yago/>"
    + "PREFIX prop: <http://dbpedia.org/property/>"

    + "SELECT DISTINCT ?location ?Results (MAX(?lat) as ?lat) (MAX(?long) as ?long)"
	+ "WHERE {"
    + "?p rdf:type " + type + "."  
    + "?l dbo:location ?x; "
	+ "geo:lat ?lat;"
	+ "geo:long ?long."
    + "FILTER regex(?location, \"" + document.getElementById("search-box").value + "\" ,\"i\")"
    + "?p dbo:location ?x;"
    + "geo:lat ?lat;"
	+ "geo:long ?long."
    + "?p rdfs:label ?Results."
    + "FILTER langMatches( lang(?Results), \"EN\" )"
    + "?x rdfs:label ?location."
    + "FILTER langMatches( lang(?location), \"EN\" )"
    + "}" ; 
	
	return query;
}


function getLatLong(data){ 
	//loop through JSON to get results
	var locations = []; //created empty array called locations
	
	var resultsTitle = data.head.vars[1]; //retrieves "Results"
	
	for (i = 0; i< data.results.bindings.length; i++){ //loops through JSON 
			var latitude =  parseFloat(data.results.bindings[i].lat.value); //gets latitude
			var longitude = parseFloat(data.results.bindings[i].long.value); //gets longitude
			var attraction = data.results.bindings[i].Results.value; //gets name of result e.g."St Fagans"
			var location = data.results.bindings[i].location.value; //gets name of location
			
	        //adds attraction and lat and long into locations array of objects
			locations.push({name:attraction, latlng: new google.maps.LatLng(latitude, longitude)} );
			
	//plot latitude and longitude on map
	drawMap(latitude, longitude, locations); //passes parameters to drawMap function
	
    resultsPanel.innerHTML = resultsTitle
						   += "<br />" 
						   + attraction; //this would look better displayed in a table. 
	}
	
	
}


function drawMap(latValue, longValue, locations) {
		var map;
		var myLatLong = {lat: latValue, lng: longValue};
		
        map = new google.maps.Map(document.getElementById('map'), { //draw map in map div
          center: myLatLong, //position center based on latitude and lonitude
          zoom: 10 
        });

		
		for(i = 0; i < locations.length; i++){ //loops through locations array/JSON
		var marker = new google.maps.Marker({ 
          position: locations[i].latlng, //positions marker based on lat and long
		  map:map, 
		  title:locations[i].name //when user hovers over marker, name of location is displayed		  
      });
		}
}
