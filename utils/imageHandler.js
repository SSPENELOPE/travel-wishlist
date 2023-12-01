require('dotenv').config();

async function getRandomImage(destinationName) {
    const apiUrl = `https://api.unsplash.com/photos/random?query=${destinationName}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET'
        });


        if (response.ok) {
            const data = await response.json();
            return data.urls.small;
        } else {
            return 'https://ceblog.s3.amazonaws.com/wp-content/uploads/2012/05/20172622/ce-travel.jpg';
        }
    } catch (error) {
        console.error('Error fetching image:', error.message);
        return 'https://ceblog.s3.amazonaws.com/wp-content/uploads/2012/05/20172622/ce-travel.jpg';
    }
}

module.exports = {
    getRandomImage,
};