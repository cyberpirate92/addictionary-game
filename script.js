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

/** @type {string[]} */
var wordList;

/** @type {String} */
const wordListFilePath = "wordlist.txt";

window.addEventListener('load', () => {
    initialize();
    registerEventHandlers();
    populateWordList(wordListFilePath);
});

/**
 * Initialize app by intializing variables and registering required event handlers
 * 
 * @returns {void}
 */
function initialize () {

    elapsedSeconds      = 0;

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

/**
 * Fetches the content of the specified text file and populates the word list
 * @param {String} pathToFile relative path to the file
 * 
 * @returns {void} 
 */
function populateWordList(pathToFile) {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", pathToFile, false);
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState === 4)
        {
            if (xmlHttpRequest.status === 200 || xmlHttpRequest.status === 0) 
            {
                let textContent = xmlHttpRequest.responseText;
                words = tokenize(textContent);
            }
        }
    }
    xmlHttpRequest.send();
}

/**
 * Tokenizes the given string and populates the wordlist
 * @param {String} textContent The string from which words are to be extracted
 * 
 * @returns {String[]} Array of tokenized words
 */
function tokenize (textContent) {
    let tokens = [];
    if (textContent.length > 0) {
        tokens = textContent.split(" ");
        tokens[tokens.length - 1] = tokens[tokens.length - 1].trim();
    }
    return tokens;
}

/**
 * Returns a bootstrap div row element with a single column text content
 * @param {String} text 
 * @param {String[]} [optionalClassList] optional CSS classes to add to the container 
 * 
 * @returns {HTMLElement} Bootstrap div row element
 */
function getMessageNode(text, optionalClassList) {
    let row     = document.createElement("div");
    let column  = document.createElement("div");
    
    row.classList.add("row", "p-3");
    column.classList.add("col");
    if (optionalClassList && optionalClassList.length > 0) {
        row.classList.add(...optionalClassList);
    }   
    column.textContent = text;
    
    row.appendChild(column);
    return row;
}

/**
 * Returns a bootstrap div row element styled as a user text node
 * @param {String} text 
 * 
 * @returns {HTMLElement} A bootstrap div row element styled as a user text node
 */
function getUserTextNode(text) {
    return getMessageNode(text, ["bg-info", "text-right"]);
}

/**
 * Returns a bootstrap div row element styled as a opponent text node
 * @param {String} text 
 * 
 * @returns {HTMLElement} A bootstrap div row element styled as a opponent text node
 */
function getOpponentTextNode(text) {
    return getMessageNode(text, ["bg-dark", "text-white"]);
}