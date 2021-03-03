const infoEl = document.querySelector("#display-info");

const personalityMenuEl = document.querySelector("#personality-menu");
const speciesMenuEl = document.querySelector("#species-menu");
const searchBtnEl = document.querySelector("#search-button");

function getData(searchKey, searchValue, searchKey2, searchValue2) {
	// API Url
	let url = "https://acnhapi.com/v1/villagers/";

	// get JSON data and pass to display function
	fetch(url)
		.then(function(response) {
			if (response.ok) {
				response.json()
					.then(function(data) {
						let resultsArr = [];
						// iterate through each villager object
						for (let i = 0; i < 391; i++) {
							let villagerKey = Object.keys(data)[i];
							let villager = data[villagerKey]
							if (searchKey2 && searchValue2) {
								if (villager[searchKey] == searchValue && villager[searchKey2] == searchValue2) {
									resultsArr.push(villager);
								}
							} else {
								if (villager[searchKey] == searchValue) {
									resultsArr.push(villager);
								}
							}
						}
						
						// add code to sort 'resultsArr' alphabetically by 'name'
						
						// pass results to display info on page
						displayInfo(resultsArr);
					});
			} else {
				alert("Error, could not connect to ACNH API");
			}
		});

};

function displayInfo(resultsArr) {
	
	if (resultsArr.length === 0) {
		const noResultsEl = document.createElement("h4");
		noResultsEl.className = "no-results";
		noResultsEl.textContent = "No Results. 😞";
		
		infoEl.appendChild(noResultsEl);
	}

	for (let i = 0; i < resultsArr.length; i++) {
		// create Bootstrap elements for each villager
		// Bootstrap columns
		columnEl = document.createElement("div");
		columnEl.classList = "col-12 col-md-6 col-lg-4 col-xl-3 col-xx-2 gy-3"
		// Bootstrap cards
		const cardEl = document.createElement("div");
		cardEl.className = "card";
		cardEl.setAttribute("style", "width: 100%");
		const imgEl = document.createElement("img");
		imgEl.setAttribute("src", resultsArr[i].image_uri);
		imgEl.className = "card-img-top";
		const bodyEl = document.createElement("div")
		bodyEl.className = "card-body"
		//card contents
		// name
		const nameEl = document.createElement("h5");
		nameEl.className = "card-title";
		nameEl.textContent = resultsArr[i].name["name-USen"];
		// descriptor
		const personalityEl = document.createElement("p");
		personalityEl.classList = "card-text text-secondary";
		personalityEl.textContent = resultsArr[i].personality + " Villager";
		// quote
		const sayingEl = document.createElement("p");
		sayingEl.className = "card-text";
		sayingEl.textContent = '"' + resultsArr[i].saying + '"';
		// birthday
		const listEl = document.createElement("ul");
		listEl.classList = "list-group list-group-flush";
		const birthdayEl = document.createElement("li");
		birthdayEl.className = "list-group-item";
		birthdayEl.textContent = "Birthday: " + resultsArr[i]["birthday-string"];
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
};

searchBtnEl.addEventListener("click", function() {

	event.preventDefault();

	infoEl.innerHTML = "";

	if (personalityMenuEl.selectedIndex > 0 && speciesMenuEl.selectedIndex > 0) {

		let searchKey = "personality"
		let searchValue = personalityMenuEl.value;
		let searchKey2 = "species"
		let searchValue2 = speciesMenuEl.value;

		getData(searchKey, searchValue, searchKey2, searchValue2);

	} else if (personalityMenuEl.selectedIndex > 0) {

		let searchKey = "personality"
		let searchValue = personalityMenuEl.value;

		getData(searchKey, searchValue);

	} else if (speciesMenuEl.selectedIndex > 0) {

		let searchKey = "species"
		let searchValue = speciesMenuEl.value;

		getData(searchKey, searchValue);

	} else {
		alert("No parameters selected")
	}

});