const input = document.getElementById('input');
const sendBtn = document.getElementById('send-btn');

// JavaScript for header
const editBtn = document.getElementById('editBtn');
const editSquare = document.getElementById('edit-square');
function  TapEditForInput() {
    input.focus();
}

editBtn.addEventListener('click',TapEditForInput);
editSquare.addEventListener('click',TapEditForInput);

const sort = document.getElementById('sort');
const sideBar = document.querySelector('.side-bar');
sort.addEventListener('click',()=>{
    sideBar.style.transform = 'translateX(0)';
});

const close = document.getElementById('close');
close.addEventListener('click',()=>{
    sideBar.style.transform = 'translateX(-100vw)';
});

// JavaScript for input
function changeBtnForInput() {
    if (window.matchMedia) {
        const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
        function changeInputAcToTheme(e) {
            if (e.matches) {
                if (input.value.trim() !== '') {
                    sendBtn.style.background = 'white';
                    sendBtn.style.color = '#171717';
                } else {
                    sendBtn.style.background = '#2f2f2f';
                    sendBtn.style.color = '#171717';
                }
            } else {
                if (input.value.trim() !== '') {
                    sendBtn.style.background = '#2f2f2f';
                    sendBtn.style.color = 'white';
                } else {
                    sendBtn.style.background = '#f2f2f2';
                    sendBtn.style.color = '#171717';
                }
            }
        }  
        changeInputAcToTheme(darkMode);
        darkMode.addEventListener('change', changeInputAcToTheme);      
    }    
}

input.addEventListener('input', changeBtnForInput);


// JavaScript to append query on display
const mainArea = document.querySelector('.main-area');
const chatDisplay = document.querySelector('.chat-display');
const historyDisplay = document.querySelector('.history');

sendBtn.addEventListener('click', () => {
    let query = input.value.trim();
    if (query !== '') {
        mainArea.style.display = 'none';
        chatDisplay.style.display = 'block';
        let senderArea = document.createElement('div');
        senderArea.className = 'sender-area';
        senderArea.innerHTML = `<img src="./img/chat gpt/profile_pic_2.jpg" class="logo"> <span id="sender-query">${query}</span>`;
        chatDisplay.appendChild(senderArea);
        saveQuery(query);
        showHistory(query);
        input.value = ''; // Clear input after sending query
        getResponse(query);
    } else {
        mainArea.style.display = 'flex';
        chatDisplay.style.display = 'none';
    }
});

//const query = input.value.trim();

function response(query) {
    query = query.toLowerCase();
    if (query === 'what is the time' || query.includes('time')) {
        return new Date();
    } else if (query === 'hello' || query === 'Hello') {
        return "Hello! How can I assist you today?";
    } else if (query === 'thank you' || query === 'thanks') {
        return "You're welcome!";
    } else if (query === 'tell me a story' || query === 'write a story' || query.includes('story')){
        return generateStory();
    } else if (query.includes('date')) {
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        return `Today is ${date}/${month}/${year}.`;
    } else {
        return "Sorry, I don't understand that.";
    }
}

function generateStory() {
    const stories = [
        "Once upon a time, in a faraway land, there lived a brave knight who embarked on a quest to rescue a captured princess.",
        "In a small village nestled among the mountains, there was a mysterious legend of a hidden treasure waiting to be discovered by a brave adventurer.",
        "Long ago, in a kingdom ruled by dragons, a humble farmer's son discovered he had the power to communicate with these majestic creatures.",
        "Amidst the bustling streets of a modern city, a young artist found inspiration in the most unexpected places, leading to a journey of self-discovery.",
        "In a futuristic world where technology reigns supreme, a group of rebels fights against an oppressive regime to restore freedom and justice.",
        "On a remote island, a group of castaways must band together to survive the challenges of nature and uncover the island's hidden secrets.",
        "In the depths of space, a lone astronaut encounters a mysterious alien civilization and must navigate the complexities of interspecies diplomacy.",
        "In a post-apocalyptic world ravaged by war, a courageous survivor embarks on a perilous journey to find a fabled sanctuary rumored to offer salvation.",
        "During the height of the Renaissance, a brilliant inventor creates a machine capable of transcending time itself, leading to unforeseen consequences.",
        "In a magical forest where mythical creatures roam, a young fairy sets out on a quest to restore balance to the enchanted realm."
    ];

    return getRandomStory(stories);
}

function getRandomStory(stories) {
    const randomIndex = Math.floor(Math.random() * stories.length);
    return stories[randomIndex];
}



function typeResponse(responseText, responseArea) {
    const typingSpeed = 30; // Adjust typing speed as needed
    let index = 0;
    responseArea.innerHTML = ''; // Clear previous content
    const typingInterval = setInterval(() => {
        responseArea.innerHTML += responseText[index];
        index++;
        if (index === responseText.length) {
            clearInterval(typingInterval);
        }
    }, typingSpeed);
}

function getResponse(query) {
    //let query = input.value.trime();
    if (query !== '') {
        const responseArea = document.createElement('div');
        responseArea.className = 'response';
        chatDisplay.appendChild(responseArea);

        const responseText = response(query); // Call the response function
        if (responseText) {
            responseArea.innerHTML = `<img src="./img/chat gpt/logo.png" class="logo"> <span id="chatGPT-response"></span>`;
            typeResponse(responseText.toString(), responseArea.querySelector('#chatGPT-response'));
        }
    }
}


let lastDisplayedDate = '';

function showHistory(query) {
    let historyBox = document.createElement('div');
    let today = new Date();
    let displayDate = isToday(today) ? 'Today' : `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

    if (displayDate !== lastDisplayedDate) {
        historyBox.innerHTML = `<p class="date">${displayDate}</p>`;
        lastDisplayedDate = displayDate;
    }

    historyBox.innerHTML += `<p class="query">${query.substring(0, 20)}</p>`;
    historyDisplay.appendChild(historyBox);
    saveHistoryToLocalStorage();
}

function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
}

function saveHistoryToLocalStorage() {
    localStorage.setItem('historyData', historyDisplay.innerHTML);
}

function showHistoryFromLocalStorage() {
    historyDisplay.innerHTML = localStorage.getItem('historyData');
}

showHistoryFromLocalStorage();

function saveQuery(query) {
    sessionStorage.setItem('data', query);
}

function showQuery() {
    chatDisplay.innerHTML = sessionStorage.getItem('data');
}

showQuery();

// Define response function outside of getResponse()


// JavaScript for user name
let username = ['Artist Incognito', 'Yuvraj']; 
let ID = document.getElementById('user-name');
ID.innerHTML = username[1];

// JavaScript for suggestion box
function getRandomSuggestion() {
    let suggestions = [
        { title: "Suggestion 1", description: "Description for suggestion 1" },
        { title: "Suggestion 2", description: "Description for suggestion 2" },
        { title: "Suggestion 3", description: "Description for suggestion 3" },
        { title: "Suggestion 4", description: "Description for suggestion 4" },
        { title: "Suggestion 5", description: "Description for suggestion 5" },
        { title: "Suggestion 6", description: "Description for suggestion 6" },
        { title: "Suggestion 7", description: "Description for suggestion 7" },
        { title: "Suggestion 8", description: "Description for suggestion 8" }
    ];

    let boxes = document.querySelectorAll('.suggestions');
    boxes.forEach(box => {
        let randomIndex = Math.floor(Math.random() * suggestions.length);
        let suggestion = suggestions[randomIndex];
        let titleElement = box.querySelector('.title');
        let descriptionElement = box.querySelector('.description');
        titleElement.textContent = suggestion.title;
        descriptionElement.innerHTML = suggestion.description;
        box.addEventListener('click', () => {
            input.value = suggestion.title;
        });
    });
}

getRandomSuggestion();
