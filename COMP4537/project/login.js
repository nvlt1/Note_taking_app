document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const reqBody = {
        username: username,
        password: password
    };

    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            window.location.href = '/home.html'
        } else {
            document.getElementById('msgDisplay').textContent = data.message;
        }
    })
    .catch(error => {
        console.log("Error message: " + error)
    })
})