document.addEventListener('DOMContentLoaded', function() {
    var logoutButton = document.querySelector('#logoutButton')
    logoutButton.addEventListener('click', function() {
        // document.cookie = ''
        window.location.href = '/logout.html'
    })
})