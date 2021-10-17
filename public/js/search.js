document.addEventListener("DOMContentLoaded", initComponents);

function initComponents() {
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

    let response = await fetch(searchURL);

    response = await response.json();

    if (response.length === 0) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<p>Nothing to show. Try a different search.</p>`;
        resultTable.appendChild(tr);
        searchInput.value = '';
        searchInput.focus();
        return;
    }

    for (const i in response) {
        let tr = document.createElement('tr');

        let td=document.createElement('td');
        td.innerHTML = `<a href="/video/${response[i]._id}">${response[i].name}</a>`;
        tr.appendChild(td);

        td=document.createElement('td');
        td.innerHTML = `<p>${response[i].description}</p>`;
        tr.appendChild(td);

        resultTable.appendChild(tr);
    }
}