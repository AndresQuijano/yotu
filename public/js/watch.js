const BUTTON_LIKE_ID = 'btnLike';
const BUTTON_DISLIKE_ID = 'btnDislike';

document.addEventListener("DOMContentLoaded", addListeners);

function addListeners() {
    // const btnLike = document.querySelector('#btnLike');
    // console.log(btnLike);
    document.querySelector('#btnLike').addEventListener('click', rate);
    document.querySelector('#btnDislike').addEventListener('click', rate);
}

async function rate(e) {
    e.preventDefault();

    let rateNumber;

    if (e.target.id === BUTTON_LIKE_ID) {
        rateNumber = 1;
    } else if (e.target.id === BUTTON_DISLIKE_ID) {
        rateNumber = -1;
    } else {
        return;
    }

    const rateURL = '/video/rate';
    const _id = getVideoId();

    let res = await fetch(rateURL, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id,
            'rate': rateNumber
        })
    });

    e.target.disabled = true;
    disableButton(e.target);
}

function getVideoId(){
    const actualURL=window.location.href;
    return actualURL.split('/').at(-1);
}

function disableButton(element){
    let label = element.parentElement.querySelector('label');
    const actualNumber = label.textContent;
    label.textContent = parseInt(actualNumber)+1;
}