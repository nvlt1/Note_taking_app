const { response } = require("express");

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

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            window.location.href = '/login.html';
        } else {
            document.getElementById('msgDisplay').textContent = data.message
        }
    })
    .catch(error => {
        console.log("Error message: " + error)
    })


})