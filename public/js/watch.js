const BUTTON_LIKE_ID = 'btnLike';
const BUTTON_DISLIKE_ID = 'btnDislike';
const CLASS_BUTTON_SELECTED = 'btnSelected';
const CLASS_BUTTON_UNSELECTED = 'btnUnselected';
let btnLike;
let btnDislike;

document.addEventListener("DOMContentLoaded", addListeners);

function addListeners() {
    btnLike = document.querySelector(`#${BUTTON_LIKE_ID}`);
    btnDislike = document.querySelector(`#${BUTTON_DISLIKE_ID}`);

    btnLike.addEventListener('click', rate);
    btnDislike.addEventListener('click', rate);
}

async function rate(e) {
    e.preventDefault();

    let [likeValue, dislikeValue] = getLikeDislikeValues(e);

    const rateURL = '/video/rate';
    const _id = getVideoId();

    await fetch(rateURL, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id,
            'like': likeValue,
            'dislike': dislikeValue
        })
    });

    fixRateBoard(e, likeValue, dislikeValue);
}

function getLikeDislikeValues(e) {
    let likeValue = 0;
    let dislikeValue = 0;

    if (e.target.id === BUTTON_LIKE_ID) {
        btnPrimary = btnLike;
        btnSecondary = btnDislike;

        if (btnPrimary.classList.contains(CLASS_BUTTON_SELECTED)) {
            likeValue = -1;
        } else {
            likeValue = 1;

            if (btnSecondary.classList.contains(CLASS_BUTTON_SELECTED)) {
                dislikeValue = -1;
            }
        }
    } else if (e.target.id === BUTTON_DISLIKE_ID) {
        btnPrimary = btnDislike;
        btnSecondary = btnLike;

        if (btnPrimary.classList.contains(CLASS_BUTTON_SELECTED)) {
            dislikeValue = -1;
        } else {
            dislikeValue = 1;

            if (btnSecondary.classList.contains(CLASS_BUTTON_SELECTED)) {
                likeValue = -1;
            }
        }
    }

    return [likeValue, dislikeValue];
}

function getVideoId() {
    const actualURL = window.location.href;
    return actualURL.split('/').at(-1);
}

function fixRateBoard(e, likeValue, dislikeValue) {
    if (e.target.id === BUTTON_LIKE_ID) {
        btnLike.classList.toggle(CLASS_BUTTON_UNSELECTED);
        btnLike.classList.toggle(CLASS_BUTTON_SELECTED);

        if (btnDislike.classList.contains(CLASS_BUTTON_SELECTED)) {
            btnDislike.classList.toggle(CLASS_BUTTON_SELECTED);
            btnDislike.classList.toggle(CLASS_BUTTON_UNSELECTED);
        }
    } else if (e.target.id === BUTTON_DISLIKE_ID) {
        btnDislike.classList.toggle(CLASS_BUTTON_UNSELECTED);
        btnDislike.classList.toggle(CLASS_BUTTON_SELECTED);

        if (btnLike.classList.contains(CLASS_BUTTON_SELECTED)) {
            btnLike.classList.toggle(CLASS_BUTTON_SELECTED);
            btnLike.classList.toggle(CLASS_BUTTON_UNSELECTED);
        }
    }

    let label = btnLike.parentElement.querySelector('label');
    let actualNumber = label.textContent;
    label.textContent = parseInt(actualNumber) + likeValue;

    label = btnDislike.parentElement.querySelector('label');
    actualNumber = label.textContent;
    label.textContent = parseInt(actualNumber) + dislikeValue;
}