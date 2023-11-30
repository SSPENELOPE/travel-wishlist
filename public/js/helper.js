async function getRandomImage(destinationName) {
    const accessKey = "KhzgJL0SZENYqH0ey3HF3MhOAbhme3RBjcjwCzrYN58";
    const apiUrl = `https://api.unsplash.com/photos/random?query=${destinationName}&client_id=${accessKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET'
        });


        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching image:', error.message);
        return null;
    }
}

async function displayDestinations() {
    var infoArea = document.querySelector('.info');

    // Clear the existing content
    infoArea.innerHTML = '';

    // Retrieve destinations from local storage
    const response = await fetch('http://localhost:3001/api/destinations', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const savedDestinations = await response.json();

        // Loop through the destinations and create elements to display them
        savedDestinations.forEach((destinationData) => {
            // Get each destinations ID
            const destinationId = destinationData._id;

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


            // Pass the whole destination data here, we will need it
            destinationInfo.querySelector('.edit-btn').addEventListener('click', function () { 
                editDestination(destinationData);
            });

            // Pass the Unique ID here 
            destinationInfo.querySelector('.remove-btn').addEventListener('click', function () {
                removeDestination(destinationId);
            });
        });
    } else {
        alert("Error fetching saved destinations")
    }
}