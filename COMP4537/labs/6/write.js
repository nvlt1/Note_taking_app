document.addEventListener('DOMContentLoaded', function () {
    const writeForm = document.getElementById('myWriteForm')
    getAllLanguages();


        // update existing word entry with PATCH req.
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
                .then(res => res.json())
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
    
        // global use
        window.delWord = delWord;
    
        // get languages from server, populate form with retrieved options
        function getAllLanguages() {
            fetch('https://lively-toad-dungarees.cyclic.app/api/v1/languages')
                .then(res => res.json())
                .then(res => {
                    const wordLanguage = document.getElementById('word-language')
                    const definitionLanguage = document.getElementById('definition-language')
                    console.log(res)
                    res.forEach(language => {
                        const wordChoice = document.createElement('option')
                        wordChoice.value = language.language
                        wordChoice.innerText = language.language
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

        function displayMessage(message, isError = false) {
            const messageDisplay = document.getElementById('msgDisplay')
            messageDisplay.textContent = message;
            messageDisplay.style.display = 'block'
            messageDisplay.style.color = isError ? 'red': 'green'
        }

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