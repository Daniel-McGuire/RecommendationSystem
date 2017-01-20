var resultsPanel = document.getElementById("results");
var response = "";


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


function getSPARQL_JSON() { 
	var url = "http://dbpedia.org/sparql";
	var query = null;

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
		
	
	//create variable for the URI of the query called 'queryURl'
	var queryUrl= url+"?query="+ encodeURIComponent(query) +"&format=json";
	var HTTPRequest = new XMLHttpRequest();

	HTTPRequest.open('GET', queryUrl); //'POST' = send data 'GET' = receive
		HTTPRequest.onload = function(){
		var JSONData = JSON.parse(HTTPRequest.responseText);
		getJsonData(JSONData);//send JSON to getJsonData function
		};

	HTTPRequest.send();	

}


function checkDBResults(){
    var hr = new XMLHttpRequest(); // Create XMLHttpRequest object
    var url = "/PHP/getDBInfo.php"; 
	var criteria;
	var loc = document.getElementById("search-box").value;
	
	if(document.getElementById("shopping").checked == true) {
		criteria = 'Shopping';
	}
	
	if(document.getElementById("histBuild").checked == true) {
		criteria = 'histBuild';
	}
	
	if(document.getElementById("museums").checked == true) {
		criteria = 'museums';
	}
	
	if(document.getElementById("castles").checked == true) {
		criteria = 'castles';
	}
	
    hr.open('GET', url+"?criteria="+criteria+"&location="+loc, true);
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
    // Access the onreadystatechange event for the XMLHttpRequest object
	hr.onload = function() {
			if(hr.readyState == 4 && hr.status == 200){
		    var response = hr.responseText; //save the returned JSON in the response variable	
				if (response == 0){
					alert("request sent to SPARQL");
					getSPARQL_JSON();
				}
				else {
					displayResults(response);
				}
			
	        }
		}
   
    hr.send();  // Send the data to PHP now... and wait for response
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


function getJsonData(data){ 
	//loop through JSON to get results
	var locations = []; //create empty array called locations
	var resultsTitle = data.head.vars[1]; //retrieves "Results"
	var results;
	
	for (i = 0; i< data.results.bindings.length; i++){ //loops through JSON 
			var latitude =  parseFloat(data.results.bindings[i].lat.value); //gets latitude
			var longitude = parseFloat(data.results.bindings[i].long.value); //gets longitude
			var attraction = data.results.bindings[i].Results.value; //gets name of attraction e.g."St Fagans"
			var location = data.results.bindings[i].location.value; //gets name of location
			
	        //adds attraction and lat and long into locations array of objects
			locations.push({name:attraction, latlng:new google.maps.LatLng(latitude, longitude)} );
	
			 results = resultsTitle
						   += "<br />" 
						   + attraction; //this would look better displayed in a table.
			
			
	}
	showDiv(); //show results div
	drawMap(latitude, longitude, locations); //passes parameters to drawMap function
	resultsPanel.innerHTML = results; //post results to results panel
    postToDB(latitude, longitude, locations); 	//post info to database
}


function displayResults(results){
	
	var JSONData = JSON.parse(results); 
	var results = JSONData[0].results;
	var location = JSONData[0].location;
	var lat = parseFloat(JSONData[0].lat);
	var longi = parseFloat(JSONData[0].longi);
	var locations = JSON.parse(JSONData[0].mapMarkers);
	
    showDiv();
	drawMap(lat, longi, locations);
	resultsPanel.innerHTML = results;
    alert("results retrieved from database");

}

function postToDB(lat, longi, locations){
    var hr = new XMLHttpRequest(); 
    var url = "/PHP/postToDB.php";
    var results = resultsPanel.innerHTML;
	var loc = document.getElementById("search-box").value;
	var criteria;
	var locat = JSON.stringify(locations);

	
	if(document.getElementById("shopping").checked == true) {
		criteria = 'Shopping';
	}
	
	if(document.getElementById("histBuild").checked == true) {
		criteria = 'histBuild';
	}
	
	if(document.getElementById("museums").checked == true) {
		criteria = 'museums';
	}
	
	if(document.getElementById("castles").checked == true) {
		criteria = 'castles';
	}

	
	var vars = "results="+results+"&location="+loc+"&criteria="+criteria+"&lat="+lat+"&longi="+longi+"&locations="+locat; 
	
	
	hr.open('POST', url, true);
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
    // Access the onreadystatechange event for the XMLHttpRequest object
	hr.onload = function() {
			if(hr.readyState == 4 && hr.status == 200){
		    alert(hr.responseText); //confirms whether post was successful	
	        }
		}

    // Send the data to PHP now... and wait for response
    hr.send(vars); // Actually execute the request
    
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
			

