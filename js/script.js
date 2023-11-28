const button = document.querySelector(".edit-btn");

function editDestination(index) {
    // Retrieve existing destinations from local storage
    var savedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];

    var destinationData = savedDestinations[index];

    // Prompt the user for updated information
    var updatedName = prompt("Enter a new name", destinationData.name);
    var updatedLocation = prompt("Enter a new location", destinationData.location);
    var updatedPhoto = prompt("Enter new photo URL", destinationData.photo);

    // Update destination data if user provided valid input
    if (updatedName !== null && updatedLocation !== null && updatedPhoto !== null) {
        destinationData.name = updatedName || destinationData.name;
        destinationData.location = updatedLocation || destinationData.location;
        destinationData.photo = updatedPhoto || destinationData.photo;

        // Update the array in local storage
        localStorage.setItem('destinations', JSON.stringify(savedDestinations));

        // Update the displayed destinations
        displayDestinations();
    }
}

function removeDestination(index) {
    // Retrieve existing destinations from local storage
    var savedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];

    // Remove the item from the array
    savedDestinations.splice(index, 1);

    // Save the updated array back to local storage
    localStorage.setItem('destinations', JSON.stringify(savedDestinations));

    // Update the displayed destinations
    displayDestinations();
}

window.addEventListener('load', displayDestinations);