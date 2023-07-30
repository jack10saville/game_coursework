const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = form.elements.firstName.value;
    const username = form.elements.username.value;
    const operation = form.elements.operation.value;
    const timesTable = form.elements.timesTable.value;

    // Redirect to the game page with the user details as query parameters
    window.location.href = `game.html?username=${username}&operation=${operation}&timesTable=${timesTable}`;
});
