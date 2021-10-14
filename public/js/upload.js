const uploadForm = document.querySelector('form');
const nameInput = document.querySelector('#inName');
const descriptionInput = document.querySelector('#inDescription');
const uploaderInput = document.querySelector('#inUploader');
const tagsInput = document.querySelector('#inTags');
let fileInfo;


let client = filestack.init("A0hd8LTqJQEeo18q8R2Q5z");
function pickVideo() {
    client.pick({
        //Only accepting files with a mimetype 'image/*'
        //accept: 'video/*',
        //Only accepting at most 1 file
        maxFiles: 1,
        fromSources: ["local_file_system"],
    }).then(function (result) {//Taking the results object in as 'result'
        fileInfo = result;
        console.log(fileInfo);
    });
}

function trimArray(comaSeparatedString) {
    let words = comaSeparatedString.split(',');
    return words.map(word => word.trim().toLowerCase());

};

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

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

    console.log('data:', data);

    let res=await fetch(uploadURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    let response = await res.json();

    window.location.href = 'http://localhost:3000/video/'+response.video._id;//`http://localhost:3000/watch/${response.video._id}`;

    console.log('data:', response.video._id);
});