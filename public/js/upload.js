let uploadForm;
let fileInfo;
let fileStackClient;

document.addEventListener('DOMContentLoaded', initComponents);

function initComponents() {
    document.querySelector('form').addEventListener('submit', submitForm);

    fileStackClient = filestack.init('A0hd8LTqJQEeo18q8R2Q5z');
}

async function submitForm(e) {
    e.preventDefault();

    const nameInput = document.querySelector('#inName');
    const descriptionInput = document.querySelector('#inDescription');
    const uploaderInput = document.querySelector('#inUploader');
    const tagsInput = document.querySelector('#inTags');

    const uploadURL = '/video';

    const name = nameInput.value;
    const description = descriptionInput.value;
    const uploader = uploaderInput.value;
    const tags = trimArray(tagsInput.value);

    const data = {
        name,
        description,
        uploader,
        tags,
        'url': fileInfo.filesUploaded[0].url
    };

    let res = await fetch(uploadURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    let response = await res.json();

    window.location.href = '/video/' + response.video._id;
}

/**
 * @function trimArray
 * @param {String} comaSeparatedString 
 * @returns An array representation of the words contained in the String sent as parameter
 */
function trimArray(comaSeparatedString) {
    let words = comaSeparatedString.split(',');
    return words.map(word => word.trim().toLowerCase());
}

function pickVideo() {
    fileStackClient.pick({
        accept: 'video/mp4',
        maxFiles: 1,
        fromSources: ['local_file_system'],
    }).then(function (result) {
        fileInfo = result;
    });
}