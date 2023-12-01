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