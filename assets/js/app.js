const infoEl = document.querySelector("#display-info");

const personalityMenuEl = document.querySelector("#personality-menu");
const speciesMenuEl = document.querySelector("#species-menu");
const searchBtnEl = document.querySelector("#search-button");

function getData(searchKey, searchValue) {
	// API Url
	let url = "https://acnhapi.com/v1/villagers/";

	// get JSON data and pass to display function
	fetch(url)
		.then(function(response) {
			if (response.ok) {
				response.json()
					.then(function(data) {
						// iterate through each villager object
						for (let i = 0; i < 391; i++) {
							let villagerKey = Object.keys(data)[i];
							
							let villager = data[villagerKey]
							
							if (villager[searchKey] == searchValue) {
								displayInfo(villager);
							}
					}

					});
			} else {
				alert("Error, could not connect to ACNH API");
			}
		});
		
}

function displayInfo(villager) {
	
	// create Bootstrap elements for each villager
	
	// Bootstrap columns
	columnEl = document.createElement("div");
	columnEl.classList = "col-12 col-md-6 col-lg-4 gy-3"
	
	// Bootstrap cards
	const cardEl = document.createElement("div");
	cardEl.className = "card";
	cardEl.setAttribute("style", "width: 100%");
	const imgEl = document.createElement("img");
	imgEl.setAttribute("src", villager.image_uri);
	imgEl.className = "card-img-top";
	const bodyEl = document.createElement("div")
	bodyEl.className = "card-body"
	
	//card contents
	// villager name
	const nameEl = document.createElement("h5");
	nameEl.className = "card-title";
	nameEl.textContent = villager.name["name-USen"];
	// descriptor
	const personalityEl = document.createElement("p");
	personalityEl.classList = "card-text text-secondary";
	personalityEl.textContent = villager.personality + " Villager";
	// quote
	const sayingEl = document.createElement("p");
	sayingEl.className = "card-text";
	sayingEl.textContent = '"' + villager.saying + '"';
	// birthday
	const listEl = document.createElement("ul");
	listEl.classList = "list-group list-group-flush";
	const birthdayEl = document.createElement("li");
	birthdayEl.className = "list-group-item";
	birthdayEl.textContent = "Birthday: " + villager["birthday-string"];
	
	//display elements
	infoEl.appendChild(columnEl)
	
	columnEl.appendChild(cardEl);
	cardEl.appendChild(imgEl);
	cardEl.appendChild(bodyEl);
	
	bodyEl.appendChild(nameEl);
	bodyEl.appendChild(personalityEl);
	bodyEl.appendChild(sayingEl);
	
	cardEl.appendChild(listEl);
	listEl.appendChild(birthdayEl);
}


searchBtnEl.addEventListener("click", function() {
	
	event.preventDefault();
	
	if (personalityMenuEl.selectedIndex > 0 && speciesMenuEl.selectedIndex > 0) {
		console.log("Both parameters selected");
	} else if (personalityMenuEl.selectedIndex > 0) {
		console.log("Personality parameter selected");
	} else if (speciesMenuEl.selectedIndex > 0) {
		console.log("Species parameter selected");
	} else {
		console.log("No parameters selected")
	}
	
	// infoEl.innerHTML = "";
	// 
	// let searchKey = "personality"
	// let searchValue = personalityMenuEl.value;
	// 
	// speciesMenuEl.selectedIndex = 0;
	// 
	// getData(searchKey, searchValue);
});



