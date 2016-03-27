/* createListItem - generates our <li> element using provided parameters*/
function createListItem(p1){
	var listItem = document.createElement("li");
	var anchor = document.createElement("a");
	var content = document.createTextNode(p1);
	var link = "http://google.com/search?q=";
	
	link = link.concat(p1.trim().replace(" ", "+")); //creates a url 'http://google.com/search?q=exmple+search'
	anchor.setAttribute("href", link);
	anchor.appendChild(content);
	listItem.appendChild(anchor); //creates <li><a href="http://google.com/search?q=example+search">example search</a></li>
	listItem.setAttribute("class","results");
	return listItem;
}

/* contains(p1) -  checks if the current searchbar value is a substring of p1 AND is not an empty string*/
function contains(p1){ 
	var toMatch = $('#currentSearch').val();
	toMatch = toMatch.toLowerCase();
	
	if(toMatch.valueOf() == ""){ //checks if current searchbar value is empty
		return false;
	}
	return((p1.toLowerCase().indexOf(toMatch)) !=-1);
}

/* filterResults(results) - loops through the two arrays retrieved from the request and filters relevant results */
function filterResults(results){
	var interests = results.data["interests"];
	var programming = results.data["programming"];
	var i;
	
	if($("#currentSearch") != null){
		$('#showResults').empty(); //this is a cool jQuery function that removes all child elements from a DOM node (awesome for refreshing our current search list)
		for(i=0; i<interests.length; i++){
			if(contains(interests[i])){
				listItem = createListItem(interests[i]);
				document.getElementById("showResults").appendChild(listItem);
			}
		}
		for(i=0; i<programming.length; i++){
			if(contains(programming[i])){
				listItem = createListItem(programming[i]);
				document.getElementById("showResults").appendChild(listItem);
			}
		}
	}
}

/* getResults() - this is our primary function, it generates a list of "type ahead" search terms*/
function getResults(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){ //this snippet follows the example from w3schools
		if(xhttp.readyState == 4 && xhttp.status == 200){ //if request is finished, response is ready and status is "OK"
			var allResults = JSON.parse(xhttp.responseText);
			filterResults(allResults);
		}
	};
	
	xhttp.open("GET", "http://www.mattbowytz.com/simple_api.json?data=all", true);
	xhttp.send();
	
}