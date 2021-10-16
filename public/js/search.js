document.addEventListener("DOMContentLoaded", addListeners);

function addListeners() {
    const uploadForm = document.querySelector('form');
    uploadForm.reset();

    uploadForm.addEventListener('submit', goSearch);
}

async function goSearch(e) {
    e.preventDefault();

    let resultTable = document.querySelector('table');
    resultTable.innerHTML = '';

    const searchInput = document.querySelector('#inSearch');

    const criteria = searchInput.value;
    const searchURL = `/video/search/${criteria}`;

    let res = await fetch(searchURL);

    let response = await res.json();

    if (response.length === 0) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<p>Nothing to show. Try a different search criteria.</p>`;
        resultTable.appendChild(tr);
        searchInput.value = '';
        searchInput.focus();
        return;
    }

    for (const i in response) {
        let tr = document.createElement("tr");

        tr.innerHTML = `<a href="/video/${response[i]._id}">${response[i].name}</a>`;
        resultTable.appendChild(tr);
    }
}