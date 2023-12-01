// Add a destination
const addDestination = async (event) => {
    event.preventDefault();

    // Show the loading spinner
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = 'block';

    // Form Values
    const destinationName = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    var photo = document.getElementById('photo').value;
    const description = document.getElementById('description').value;

    if (photo.length <= 0) {
        photo = '';
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
        const response = await fetch('http://localhost:3001/api/destinations/addDestination', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(destinationData),
        });

        if (response.ok) {
            document.querySelector('.custom-form').reset(); // Clear the form
            window.location.reload(true);
        } else {
            console.error('Failed to add destination'); // Log our error
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Hide the loading spinner regardless of success or failure
        spinner.style.display = 'none';
    }
};

// Edit a destination
async function editDestination(index) {
    const updateUrl = `http://localhost:3001/api/destinations/updateDestination/${index}`;

    // Prompt the user for updated information
    var updatedName = prompt("Enter a new name");
    var updatedLocation = prompt("Enter a new location");
    var updatedPhoto = prompt("Enter new photo URL");

    const updatedData = {
        name: updatedName, // Update with your new data
        location: updatedLocation,
        photo: updatedPhoto,
        description: '',
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
            window.location.reload(true);
        } else {
            console.error('Failed to update destination');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Remove a destination
function removeDestination(id) {
    console.log(id);
    fetch(`http://localhost:3001/api/destinations/removeDestination/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                // Update the UI to remove the destination card
                window.location.reload(true);
            } else {
                console.error('Failed to remove destination');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function logout() {
    const response = await fetch(`http://localhost:3001/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });

    if (response.ok) {
        window.location.replace('/');
    }
}

document.querySelector('.logout-button')
    .addEventListener("click", () => logout());