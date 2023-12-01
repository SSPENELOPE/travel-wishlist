async function login(e) {
    e.preventDefault();

    const url = "http://localhost:3001/api/auth/login";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginData = {
        email: email,
        password: password
    };

    console.log(loginData);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        const data = await response.json();

        if (response.status === 200) {
            alert(data.message);
            // If the login is successful, redirect or handle as needed
            window.location.replace("/");
        } else if (response.status === 401) {
            alert(data.message);
        } else {
            // Handle non-successful response
            const result = await response.json();
            alert(result.error || "Error logging in, please try again later");
        }
    } catch (error) {
        // Handle fetch error
        console.error("Error:", error);
        alert("Error logging in, please try again later");
    }
}

// Trigger the login when the button is clicked
document.querySelector('.login-button').addEventListener('click', login);