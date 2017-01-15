<?php

DEFINE ('DB_USER', 'rhiayres');
DEFINE ('DB_PASSWORD', 'Password123');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'Sparql');

$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
OR die('Could not connect to mySQL: ' .
		mysqli_connect_error());


?>