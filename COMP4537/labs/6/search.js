const mySearchForm = document.getElementById('mySearchForm')

mySearchForm.addEventListener('submit', (event) => {
    // listens for submit and prevents default form submission ie: page refreshing after submit
    event.preventDefault();

    function displayMessage(message, isError = false) {
        const messageDisplay = document.getElementById('msgDisplay')
        messageDisplay.textContent = message;
        messageDisplay.style.display = 'block'
        messageDisplay.style.color = isError ? 'red' : 'green'
    }

    const word = document.getElementById('wordSearch').value

    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };

    // send GET req to fetch word def
    fetch(`https://lively-toad-dungarees.cyclic.app/api/v1/definition/${word}`, options)
    .then(res => res.json())
    .then(res => {
        // if there's a message to display, it will with a console.log 
        if (res.error) {
            displayMessage(res.message)
        } else {
            // error checking
            console.log(res)    

            // if no message, update textcontent w/ info from server
            document.getElementById('wordDef').textContent = res[0].definition;
            document.getElementById('word-language').textContent = res[0].word_lang;
            document.getElementById('definition-language').textContent = res[0].definition_lang;
        }
    })
    .catch(err => {
        displayMessage(err, true)
    })
})