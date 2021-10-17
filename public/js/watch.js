const BUTTON_LIKE_ID = 'btnLike';
const BUTTON_DISLIKE_ID = 'btnDislike';
const CLASS_BUTTON_SELECTED = 'btnSelected';
const CLASS_BUTTON_UNSELECTED = 'btnUnselected';
let btnLike;
let btnDislike;

document.addEventListener('DOMContentLoaded', initComponents);

function initComponents() {
    btnLike = document.querySelector(`#${BUTTON_LIKE_ID}`);
    btnDislike = document.querySelector(`#${BUTTON_DISLIKE_ID}`);

    btnLike.addEventListener('click', rate);
    btnDislike.addEventListener('click', rate);
}

async function rate(e) {
    e.preventDefault();

    let [likeValue, dislikeValue] = getLikeAndDislikeValues(e);

    const rateURL = '/video/rate';
    const _id = getVideoId();

    await fetch(rateURL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id,
            'like': likeValue,
            'dislike': dislikeValue
        })
    });

    updateRateBoard(e, likeValue, dislikeValue);
}

/**
 * @function getLikeAndDislikeValues
 * @param {Event} e 
 * @returns The values 0, 1 or -1  depending on the state of the like/dislike buttons.
 */
function getLikeAndDislikeValues(e) {
    let likeValue = 0;
    let dislikeValue = 0;

    if (e.target.id === BUTTON_LIKE_ID) {
        if (btnLike.classList.contains(CLASS_BUTTON_SELECTED)) {
            likeValue = -1;
        } else {
            likeValue = 1;

            if (btnDislike.classList.contains(CLASS_BUTTON_SELECTED)) {
                dislikeValue = -1;
            }
        }
    } else if (e.target.id === BUTTON_DISLIKE_ID) {
        if (btnDislike.classList.contains(CLASS_BUTTON_SELECTED)) {
            dislikeValue = -1;
        } else {
            dislikeValue = 1;

            if (btnLike.classList.contains(CLASS_BUTTON_SELECTED)) {
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

/**
 * @function updateRateBoard
 * @description Update the state of the like/dislike buttons and the like/dislike
 * counters.
 * @param {Event} e 
 * @param {number} likeValue 
 * @param {number} dislikeValue 
 */
function updateRateBoard(e, likeValue, dislikeValue) {
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