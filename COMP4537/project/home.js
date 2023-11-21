document.addEventListener('DOMContentLoaded', function() {
    var logoutButton = document.querySelector('#logoutButton')
    var sendSentence = document.querySelector('#sendSentenceBtn')
    var sentenceDisplay = document.querySelector('#sentenceDisplay')

    logoutButton.addEventListener('click', function() {
        // document.cookie = ''
        window.location.href = '/COMP4537/project/login.html'
    });

    sendSentence.addEventListener('click', function() {
        var sentence = document.querySelector('#sentenceInput').value
        fetch('api link here', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sentence: sentence})
        })
        .then(response => response.json())
        .then(data => {
            sentenceDisplay.textContent = data.response
        })
        .catch(error => {
            console.log("Error: " + error)
            sentenceDisplay.textContent = "Error occured while sending your sentence SORRY"
        })
    })
})


