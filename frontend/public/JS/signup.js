document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const payload = {
        fullName: fullName,
        email: email,
        password: password,
    };

    try {
        const response = await fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            
            window.location.href = result.redirectUrl;  
        } else {
            alert(result.message);  
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during signup.');
    }
});