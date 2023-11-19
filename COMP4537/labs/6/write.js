document.addEventListener('DOMContentLoaded', function () {
    const writeForm = document.getElementById('myWriteForm')
    getAllLanguages();

    function displayMessage(message, isError = false) {
        const messageDisplay = document.getElementById('msgDisplay')
        // set content to the message that's passed in
        messageDisplay.textContent = message;
        messageDisplay.style.display = 'block'
        // if error, red, if not, green
        messageDisplay.style.color = isError ? 'red' : 'green'
    }


    // update existing word entry with PATCH req. update an existing entry
    function updateFunc(word, definition, wordLanguage, definitionLanguage) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                definition: definition,
                wordLanguage: wordLanguage,
                definitionLanguage: definitionLanguage
            })
        };

        fetch(`https://lively-toad-dungarees.cyclic.app/api/v1/definition/${word}`, options)
            .then(res => res.json()) // process res, convert to json
            .then(res => {
                if (res.message) {
                    displayMessage(res.message)
                }
            })
            .catch(err => {
                console.log(err)
                displayMessage('Error occured while updating the definition', true)
            });
    }

    // Deletes word entry 
    function delWord() {
        const word = document.getElementById('word').value
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`https://lively-toad-dungarees.cyclic.app/api/v1/definition/${word}`, options)
            .then(res => res.json())
            .then(res => {
                if (res.message) {
                    displayMessage(res.message)
                }
            })
            .catch(err => {
                console.log(err)
                displayMessage('Error occured while deleting the word', true)
            })
    }

    // global use, can be accessed by event handlers
    window.delWord = delWord;

    // get languages from server, populate drop downs with retrieved options
    function getAllLanguages() {
        fetch('https://lively-toad-dungarees.cyclic.app/api/v1/languages')
            .then(res => res.json())
            .then(res => {
                const wordLanguage = document.getElementById('word-language')
                const definitionLanguage = document.getElementById('definition-language')
                console.log(res)
                // for each language
                res.forEach(language => {
                    // creates a new option for the drop down
                    const wordChoice = document.createElement('option')
                    // sets value attribute of option element to language property of current item in array
                    // ie: value of options is set to "english" wihch is value of language.language
                    wordChoice.value = language.language
                    // sets text inside option element to the language property of th current item in the array
                    // ie: text inside this optino is also set to english
                    wordChoice.innerText = language.language
                    // option is appended to wordlangauge dropdown
                    wordLanguage.appendChild(wordChoice)

                    const definitionChoice = document.createElement('option')
                    definitionChoice.value = language.language
                    definitionChoice.innerText = language.language
                    definitionLanguage.appendChild(definitionChoice)

                })
            })
            .catch(err => console.log(err))
    }

    writeForm.addEventListener('submit', function (event) {
        // listens for submit and prevents default form submission
        event.preventDefault();
        const wordEntry = document.getElementById('word').value
        const definitionEntry = document.getElementById('definition').value
        const wordLanguage = document.getElementById('word-language').value
        const definitionLanguage = document.getElementById('definition-language').value

        const writeEntry = {
            word: wordEntry,
            definition: definitionEntry,
            wordLanguage: wordLanguage,
            definitionLanguage: definitionLanguage
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(writeEntry)
        };

        // if the words inserted, displays message at the top, if update, updateFunction called to handle it
        fetch('https://lively-toad-dungarees.cyclic.app/api/v1/definition', options)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.action === 'inserted') {
                    displayMessage(res.message)
                } else if (res.action === 'update') {
                    updateFunc(wordEntry, definitionEntry, wordLanguage, definitionLanguage)
                    displayMessage(res.message)
                } else if (res.action === 'missing') {
                    displayMessage(res.message, true)
                }
            })
            .catch(err => {
                console.log(err)
                displayMessage('Error occured while processing request', true)
            })
    })
})