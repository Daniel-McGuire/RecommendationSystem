<?php
require_once('C:\xampp\htdocs\PHP\connectSQL.php'); //connect to database

$query = "SELECT query FROM queries WHERE Criteria = 'testingtesting'"; //get SPARQL query from queries table for castles

$response = @mysqli_query($dbc, $query); 

if($response){
	while($row = mysqli_fetch_array($response)){
       echo
       $row['query'];
      } 
}
else {
	echo "couldn't issue database query";
	echo mysqli_error($dbc);
}

mysqli_close($dbc);
?>


