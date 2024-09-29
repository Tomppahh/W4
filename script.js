document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("search-form");
    form.addEventListener("submit", searchShow);
})

async function searchShow(event) {
	event.preventDefault();

	// get user search input
	let query = document.getElementById("input-show").value;
	// clear previous result
	let showContainer = document.querySelector(".show-container");
	showContainer.innerHTML = "";

	// fetch data from the API, add user query to the url
	const url = "https://api.tvmaze.com/search/shows?q=" + query;
	let response = await fetch(url);

	// mallia katsottu javascript.info/fetch osiosta
	if (response.ok) {
		let data = await response.json();
        for (let i = 0; i < data.length; i++) {
				const show = data[i].show;
				console.log(show);

				// create outer div with show-data class
				const showElement = document.createElement("div");
				showElement.className = "show-data";

				// create and add image element
				const imageElement = document.createElement("img");
				imageElement.src = show.image
					? show.image.medium
					: "https://via.placeholder.com/210x295?text=No+Image";
				showElement.appendChild(imageElement);

				// create the div with class show-info
				const showInfoElement = document.createElement("div");
				showInfoElement.className = "show-info";

				// create and add header h1 inside show-info
				const titleElement = document.createElement("h1");
                titleElement.textContent = show.name;
                showInfoElement.appendChild(titleElement);

				// create and add paragraph inside show-info
				const summaryElement = document.createElement("p");
                summaryElement.innerHTML = show.summary;
                showInfoElement.appendChild(summaryElement);

                showElement.appendChild(showInfoElement);

                showContainer.appendChild(showElement);
			}
        
	} else {
		alert("HTTP-Error: " + response.status);
	}
}
