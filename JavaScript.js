
alert("Hello world");

//var location = document.getElementById("userInput");


//changes the colour of the buttons if they are checked. 
function checkBoxSelection(CheckboxID, LblID) { 
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






