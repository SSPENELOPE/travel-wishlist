const button = document.querySelector(".edit-btn");

function addDestination(event) {
    event.preventDefault();
    // Form Values
    var destinationName = document.getElementById('name').value;
    var location = document.getElementById('location').value;
    var photo = document.getElementById('photo').value;
    var description = document.getElementById('description').value;


    if (photo.length <= 0) {
        photo = "https://www.fluentu.com/blog/travel/wp-content/uploads/sites/37/2018/07/travel-around-the-world-cost-e1535307163370.jpg"
    }

    var form = document.querySelector('.custom-form');
    var infoArea = document.querySelector('.info');

    // Append data to info area
    var destinationInfo = document.createElement('div');
    destinationInfo.classList.add('destination-info');
    destinationInfo.classList.add('card');
    destinationInfo.innerHTML =
    '<img class="card-img-top img" src="' + photo + '" alt="Destination Photo" style="max-width: 100%; max-height: 150px;">' +
    "<div class='p-3 card-body'>" +
        '<h5 class="destination">' + destinationName + '</h5>' +
        '<h6 class="location">' + location + '</h6>' +
        '<p>' + description + '</p>' +
    "</div>" +
    "<div class='buttons'>" +
        '<button class="edit-btn btn btn-primary" onclick="editDestination(this)">Edit</button>' +
        "<button class='remove-btn btn btn-danger' onclick='removeDestination(this)'>Remove</button>" +
    "</div>";
        
       
    infoArea.appendChild(destinationInfo);

    // Clear the form after submission
    form.reset();
}

function editDestination(button) {
    var destinationInfo = button.parentNode.parentNode;

    // Try to get the text content, log the results
    var destinationNameElement = destinationInfo.querySelector('.destination');
    var locationElement = destinationInfo.querySelector('.location');
    var photoElement = destinationInfo.querySelector('.img');

    // Prompt the user for updated information
    var updatedName = prompt("Enter a new name");
    var updatedLocation = prompt("Enter a new location");
    var updatedPhoto = prompt("Enter new photo URL:");

    if (updatedName !== '') {
        destinationNameElement.textContent = updatedName;
    }
    if (updatedLocation !== '') {
        locationElement.textContent = updatedLocation;
    }
    if (updatedPhoto !==  '') {
        photoElement.src = updatedPhoto;
    }
}

function removeDestination(button) {
    var destinationInfo = button.parentNode.parentNode;
    var infoArea = destinationInfo.parentNode;
    infoArea.removeChild(destinationInfo);
}