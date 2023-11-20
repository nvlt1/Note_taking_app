document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const reqBody = {
        username: username,
        email: email,
        password: password
    };

    fetch('https://comp4537-isa-project-back.onrender.com/api/ISA/createuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            window.location.href = '/COMP4537/project/login.html';
        } else {
            document.getElementById('msgDisplay').textContent = data.message
        }
    })
    .catch(error => {
        console.log("Error message: " + error)
    })


})