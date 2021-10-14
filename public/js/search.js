const uploadForm = document.querySelector('form');
const searchInput = document.querySelector('#inSearch');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const criteria = searchInput.value;
    const searchURL = `/video/${criteria}`;

    console.log('searchURL:', searchURL);

    let res=await fetch(searchURL);

    let response = await res.json();

    console.log('data:', response);

    for(const i in response){
        let tr=document.createElement("tr");

        tr.innerHTML=`<td>${response[i].name}</td>`;
        document.querySelector('table').appendChild(tr);
    }
});