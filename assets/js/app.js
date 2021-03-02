let personality = "Cranky";
let villagerId = "111";

const infoEl = document.querySelector("#display-info");

function getData() {

	let url = "https://acnhapi.com/v1/villagers/" + villagerId;

	fetch(url)
		.then(function(response) {
			if (response.ok) {
				response.json()
					.then(function(data) {
						displayInfo(data);
					});
			}
		});
		
}

function displayInfo(data) {
	// create card
	const cardEl = document.createElement("div");
	cardEl.className = "card";
	cardEl.setAttribute("style", "width: 18rem");
	const imgEl = document.createElement("img");
	imgEl.setAttribute("src", data.image_uri);
	imgEl.className = "card-img-top";
	const bodyEl = document.createElement("div")
	bodyEl.className = "card-body"
	
	//create card content
	const nameEl = document.createElement("h5");
	nameEl.className = "card-title";
	nameEl.textContent = data.name["name-USen"];

	const sayingEl = document.createElement("p");
	sayingEl.className = ""
	sayingEl.textContent = '"' + data.saying + '"';
	
	//draw elements
	infoEl.appendChild(cardEl);
	cardEl.appendChild(imgEl);
	cardEl.appendChild(bodyEl);
	
	bodyEl.appendChild(nameEl);
	bodyEl.appendChild(sayingEl);
	

}

getData();