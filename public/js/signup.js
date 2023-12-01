async function signup(e) {
    e.preventDefault();
    try {
        const url = "http://localhost:3001/api/auth/signup";
        console.log("hello")

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;


        const signupData = {
            username: username,
            email: email,
            password: password
        }
        
        console.log(signupData);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
        });

        const result = await response.json();

        if (response.status === 200) {
            const result = await response.json();

            alert(result.message);

            window.location.replace("/login");
        } else if (response.status === 400) {
            // User already exist
            alert(result.message);
            window.location.replace('/login')
        } else {
            // Handle non-successful response
            alert("Error signing up, please try again later");
        }
    } catch (error) {
        // Handle fetch error
        console.error("Error:", error);
        // alert("Error signing up, please try again later");
    }
}

// Trigger the sign up when button clicked
document.querySelector('.signup-button')
    .addEventListener('click', signup);