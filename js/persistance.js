
async function getRandomImage(destinationName) {
    const accessKey = "KhzgJL0SZENYqH0ey3HF3MhOAbhme3RBjcjwCzrYN58";
    const apiUrl = `https://api.unsplash.com/photos/random?query=${destinationName}&client_id=${accessKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching image:', error.message);
        return null;
    }
}


const addDestination = async (event) => {
    event.preventDefault();

    // Form Values
    var destinationName = document.getElementById('name').value;
    var location = document.getElementById('location').value;
    var photo = document.getElementById('photo').value;
    var description = document.getElementById('description').value;

    if (photo.length <= 0) {
        photo = await getRandomImage(destinationName);

        if(photo == null) {
            photo = "https://www.fluentu.com/blog/travel/wp-content/uploads/sites/37/2018/07/travel-around-the-world-cost-e1535307163370.jpg";
        } else {
            photo = photo.urls.small;
        } 
    }

  

    // Create an object to represent the destination
    var destinationData = {
        name: destinationName,
        location: location,
        photo: photo,
        description: description
    };

    // Retrieve existing destinations from local storage or initialize an empty array
    var savedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];

    // Add the new destination data to the array
    savedDestinations.push(destinationData);

    // Save the updated array back to local storage
    localStorage.setItem('destinations', JSON.stringify(savedDestinations));

    // Clear the form after submission
    document.querySelector('.custom-form').reset();

    // Display the updated list of destinations
    displayDestinations();
}

function displayDestinations() {
    var infoArea = document.querySelector('.info');

    // Clear the existing content
    infoArea.innerHTML = '';

    // Retrieve destinations from local storage
    var savedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];

    // Loop through the destinations and create elements to display them
    savedDestinations.forEach((destinationData, index) => {
        var destinationInfo = document.createElement('div');
        destinationInfo.classList.add('destination-info', 'card');
        destinationInfo.innerHTML =
            '<img class="card-img-top img" src="' + destinationData.photo + '" alt="Destination Photo" style="max-width: 100%; max-height: 150px;">' +
            "<div class='p-3 card-body'>" +
            '<h5 class="destination">' + destinationData.name + '</h5>' +
            '<h6 class="location">' + destinationData.location + '</h6>' +
            '<p>' + destinationData.description + '</p>' +
            "</div>" +
            "<div class='buttons'>" +
            '<button class="edit-btn btn btn-primary">Edit</button>' +
            "<button class='remove-btn btn btn-danger'>Remove</button>" +
            "</div>";

        infoArea.appendChild(destinationInfo);

        destinationInfo.querySelector('.edit-btn').addEventListener('click', function () {
            editDestination(index);
        });
        
        destinationInfo.querySelector('.remove-btn').addEventListener('click', function () {
            removeDestination(index);
        });
    });
}