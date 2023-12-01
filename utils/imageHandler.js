require('dotenv').config();

async function getRandomImage(destinationName) {
    const apiUrl = `https://api.unsplash.com/photos/random?query=${destinationName}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

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