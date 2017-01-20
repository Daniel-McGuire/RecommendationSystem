<?php
	
	$data_missing = array(); //create array called data_missing
    
	if(empty($_POST['location'])){ //if the textBox is empty
		
		$data_missing[] = 'location'; //add its value into array
		
	} 
	
	else{ 
	
	$location = trim($_POST['location']); //assign variable location to textBox value
	
	}
	
	if(empty($_POST['results'])){
		
		$data_missing[] = 'results';
		
	} 
	
	else{
	
	$results = trim($_POST['results']); //trim gets rid of any white space
	
	}
	
	if(empty($_POST['criteria'])){
		
		$data_missing[] = 'criteria';
		
	} 
	
	else{
	
	$criteria = trim($_POST['criteria']); //trim gets rid of any white space
	
	}
	
	if(empty($_POST['lat'])){ //if the textBox is empty
		
		$data_missing[] = 'lat'; //add its value into array
		
	} 
	
	else{ 
	
	$lat = trim($_POST['lat']); //assign variable location to textBox value
	
	}
	
	if(empty($_POST['longi'])){ //if the textBox is empty
		
		$data_missing[] = 'longi'; //add its value into array
		
	} 
	
	else{ 
	
	$longi = trim($_POST['longi']); //assign variable location to textBox value
	
	}
	
	if(empty($_POST['locations'])){ //if the textBox is empty
		
		$data_missing[] = 'locations'; //add its value into array
		
	} 
	
	else{ 
	
	$locations = trim($_POST['locations']); //assign variable location to textBox value
	
	}
	



if(empty($data_missing)){ //if no data is missing..

require_once('..\PHP\connectSQL.php'); //connect to database

$query = "INSERT INTO sparqldb.sparql_results2(id, location, criteria, results, date_entered, lat, longi, mapMarkers) VALUES (NULL, ?,?,?, NOW() ,?,?,?)"; 
//NOW() inserts current date
//NULL entered because ID auto increments. 

$stmt = mysqli_prepare($dbc, $query) or die( mysqli_error($dbc)); //prepare mySQL statement and pass in databse connection

mysqli_stmt_bind_param($stmt, "ssssss", $location, $criteria, $results, $lat, $longi, $locations); //bind saved variables to "?" in query. 

mysqli_stmt_execute($stmt) or die( mysqli_stmt_error($stmt) ); //execute the query

$affected_rows = mysqli_stmt_affected_rows($stmt); //get the number of affected rows

if($affected_rows == 1) { //if entered successfully and 1 row affected..

mysqli_stmt_close($stmt); //close the SQL statement

mysqli_close($dbc); //close the DB connection

echo 'results posted to database!';
}

}

else{

	echo 'You need to enter the following information: '; //alert user
		foreach($data_missing as $missing){ //loop through array
				echo "$missing<br />"; //print missing data
		}
}

?>