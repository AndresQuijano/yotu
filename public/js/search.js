document.addEventListener("DOMContentLoaded",addListeners);

function addListeners(){
    const uploadForm = document.querySelector('form');

    uploadForm.addEventListener('submit', goSearch);
}

async function goSearch (e) {
    e.preventDefault();

    const searchInput = document.querySelector('#inSearch');

    const criteria = searchInput.value;
    const searchURL = `/video/search/${criteria}`;

    console.log('searchURL:', searchURL);

    let res=await fetch(searchURL);

    let response = await res.json();

    for(const i in response){
        let tr=document.createElement("tr");

        tr.innerHTML=`<a href="/video/${response[i]._id}">${response[i].name}</td>`;
        document.querySelector('table').appendChild(tr);
    }
}