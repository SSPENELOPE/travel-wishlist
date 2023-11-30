// import { getRandomImage, displayDestinations } from "./helper";

// Add a destination
const addDestination = async (event) => {
    event.preventDefault();

    // Form Values
    const destinationName = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    var photo = document.getElementById('photo').value;
    const description = document.getElementById('description').value;

    if (photo.length <= 0) {
        photo = await getRandomImage(destinationName);

        if (photo == null) {
            photo = "https://www.fluentu.com/blog/travel/wp-content/uploads/sites/37/2018/07/travel-around-the-world-cost-e1535307163370.jpg";
        } else {
            photo = photo.urls.small;
        }
    }

    // Create an object to represent the destination
    const destinationData = {
        name: destinationName,
        location: location,
        photo: photo,
        description: description,
    };

    try {
        // Make a POST request to your Express server
        const response = await fetch('http://localhost:3001/api/addDestination', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(destinationData),
        });

        if (response.ok) {
            document.querySelector('.custom-form').reset(); // Clear the form 
        } else {
            console.error('Failed to add destination'); // Log our error
        }
    } catch (error) {
        console.error('Error:', error);
    }

    displayDestinations();
}

// Edit a destination
async function editDestination(destinationData) {
    const updateUrl = `http://localhost:3001/api/updateDestination/${destinationData._id}`;

    // Prompt the user for updated information
    var updatedName = prompt("Enter a new name", destinationData.name);
    var updatedLocation = prompt("Enter a new location", destinationData.location);
    var updatedPhoto = prompt("Enter new photo URL", destinationData.photo);

    // Update destination data if user provided valid input
    if (updatedName !== null && updatedLocation !== null && updatedPhoto !== null) {
        destinationData.name = updatedName || destinationData.name;
        destinationData.location = updatedLocation || destinationData.location;
        destinationData.photo = updatedPhoto || destinationData.photo;

        const updatedData = {
            name: updatedName, // Update with your new data
            location: updatedLocation,
            photo: updatedPhoto,
            description: destinationData.description,
          };
        
          try {
            const response = await fetch(updateUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedData),
            });
        
            if (response.ok) {
              console.log('Destination updated successfully');
              // Refresh the displayed destinations after a successful update
              displayDestinations();
            } else {
              console.error('Failed to update destination');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }
}

// Remove a destination
function removeDestination(destinationId) {

    fetch(`http://localhost:3001/api/removeDestination/${destinationId}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.ok) {
                console.log('Destination deleted successfully');
                displayDestinations();
            } else {
                console.error('Failed to delete destination');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

window.addEventListener('load', displayDestinations);