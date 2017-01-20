<?php

$criteria = trim($_GET['criteria']); 
$location = trim($_GET['location']); 

require_once('../PHP/connectSQL.php'); //connect to database

$query = "SELECT DISTINCT results, location, lat, longi, mapMarkers 
		  FROM sparqldb.sparql_results2 
          WHERE 
		  (criteria = '".$criteria."') AND
		  (location = '".$location."') AND
		  (date_entered > NOW() - INTERVAL 2 HOUR)"; //date entered within the last 2 hours

$response = @mysqli_query($dbc, $query); 

$rows = array();

if($response->num_rows > 0) {
	
	while($r = mysqli_fetch_assoc($response)){
       $rows[] = $r;
      } 
	  
	  echo json_encode($rows);
}

if($response->num_rows == 0){
	echo '0';
}



mysqli_close($dbc); //close database connection
?>


