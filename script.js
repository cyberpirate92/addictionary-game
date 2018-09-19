/** @type {HTMLElement} */
var gameStartButton;

/** @type {HTMLElement} */
var gameContainer;

/** @type {HTMLElement} */
var timerDisplay;

/** @type {HTMLElement} */
var aboutButton;

/** @type {Number} */
var timerInstance;

/** @type {Number} */
var elapsedSeconds;

// Entry point of the application
window.addEventListener('load', () => {
    initialize();
    registerEventHandlers();
});

/**
 * Initialize app by intializing variables and registering required event handlers
 * 
 * @returns {void}
 */
function initialize () {

    elapsedSeconds = 0;

    gameStartButton     = document.querySelector("#gameStartBtn");
    gameContainer       = document.querySelector("#gameContainer");
    timerDisplay        = document.querySelector("#timerDisplay");
    aboutButton         = document.querySelector("#aboutBtn");
}

/**
 * All event handlers will be registered here
 * 
 * @returns {void}
 */
function registerEventHandlers () {
    gameStartButton.addEventListener('click', gameStartHandler);
    aboutButton.addEventListener('click', aboutButtonHandler);
}

/**
 * Click event handler for the game start button
 * @param {Event} clickEvent The click event
 *  
 * @returns {void}
 */
function gameStartHandler (clickEvent) {
    removeChildren(gameContainer);
    timerInstance = window.setInterval(() => {
        elapsedSeconds += 1;
        updateTimerDisplay();
    }, 1000);
}

/**
 * Click event handler for the about button
 * @param {Event} clickEvent 
 * 
 * @returns {void}
 */
function aboutButtonHandler (clickEvent) {
    alert('Addictionary is a fun way to learn new words');
}

/**
 * Remove all the child nodes from a DOM container element
 * @param {HTMLElement} containerElement The element from which child nodes should be removed
 * 
 * @returns {void} 
 */
function removeChildren (containerElement) {
    while(containerElement.hasChildNodes()) {
        containerElement.removeChild(containerElement.lastChild);
    }
}

/**
 * Updates the timer display with current value of elapsedSeconds
 * 
 * @returns {void}
 */
function updateTimerDisplay () {
    let currentElapsedSeconds = elapsedSeconds;
    if (timerDisplay) {
        let minutes = `${parseInt(currentElapsedSeconds / 60)}`;
        let seconds = `${parseInt(currentElapsedSeconds % 60)}`; 
        timerDisplay.textContent = `${padStart(2, '0', minutes)} : ${padStart(2, '0', seconds)}`;
    }
}

/**
 * Prepend string with padCharacter until the string length becomes totalLength
 * @param {Number} totalLength The total length the string should be
 * @param {String} padCharacter The character used to pad if less than total length
 * @param {String} stringToBePadded The string which is to be prepended
 * 
 * @returns {String} The padded string
 */
function padStart (totalLength, padCharacter, stringToBePadded) {
    if (stringToBePadded.length < totalLength) {
        while (stringToBePadded.length < totalLength) {
            stringToBePadded = padCharacter + stringToBePadded;
        }
    }
    return stringToBePadded;
}