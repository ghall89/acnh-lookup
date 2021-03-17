const infoEl = document.querySelector("#display-info");

const personalityMenuEl = document.querySelector("#personality-menu");
const speciesMenuEl = document.querySelector("#species-menu");
const searchForm = document.querySelector("#search-form");

let apiData;

const getData = (searchKey, searchValue, searchKey2, searchValue2) => {

	// get JSON data from API and store in memory
	fetch("https://acnhapi.com/v1/villagers/")
		.then(function(response) {
			if (response.ok) {
				response.json()
					.then(function(data) {
						apiData = data;
					})
			} else {
				alert("Error, could not connect to ACNH API");
			}
		});

};

const getResults = (searchKey, searchValue, searchKey2, searchValue2) => {
	let resultsArr = [];
	// iterate through each villager object
	for (let i = 0; i < Object.keys(apiData)
		.length; i++) {
		const villagerKey = Object.keys(apiData)[i];
		const villager = apiData[villagerKey]
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
	resultsArr.sort(function(a, b) {
		if (a.name["name-USen"].toLowerCase() < b.name["name-USen"].toLowerCase()) {
			return -1;
		}
		if (a.name["name-USen"].toLowerCase() > b.name["name-USen"].toLowerCase()) {
			return 1;
		}
		return 0;
	});

	// pass results to display info on page
	displayInfo(resultsArr);
}

const displayInfo = resultsArr => {

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
		cardEl.className = "card h-100";
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

getData();

searchForm.addEventListener("change", function() {

	event.preventDefault();

	infoEl.innerHTML = "";

	if (personalityMenuEl.selectedIndex > 0 && speciesMenuEl.selectedIndex > 0) {

		const searchKey = "personality"
		const searchValue = personalityMenuEl.value;
		const searchKey2 = "species"
		const searchValue2 = speciesMenuEl.value;

		getResults(searchKey, searchValue, searchKey2, searchValue2);

	} else if (personalityMenuEl.selectedIndex > 0) {

		const searchKey = "personality"
		const searchValue = personalityMenuEl.value;

		getResults(searchKey, searchValue);

	} else if (speciesMenuEl.selectedIndex > 0) {

		const searchKey = "species"
		const searchValue = speciesMenuEl.value;

		getResults(searchKey, searchValue);

	}

});
