/* Author: Gabe Davila and Cassie Lewis */

import { productA, productB } from './data.js';
import { lightModeKey, lightModeToggle, loadLightModeSetting, renderLightMode } from './lightmode.js'

/****** VARIABLES ******/

const liveSalesCountHtml = document.getElementById("sales-counter");
const salesEmojiContainer = document.getElementById("sales-emoji-container");
const liveAchvCountHtml = document.getElementById("achv-counter");
const achvEmojiContainer = document.getElementById("achv-emoji-container");
const revenueHtml = document.getElementById("revenue");
const commissionHtml = document.getElementById("commission");
let storedData = JSON.parse(localStorage.getItem("salesboardData"));

// storageObj either equals to the stored data in local storage,
// or to empty arrays/values if nothing is in storage
let storageObj = storedData || {
    salesArray: [],
    achieveArray: [],
    salesCounter: 0,
    achvCounter: 0,
    revenueCounter: 0,
    commissionCounter: 0
};

let salesArray = storageObj.salesArray;
let achieveArray = storageObj.achieveArray;


/****** FUNCTIONS ******/

//Project requirement: use objects, using provided objects
//My idea for dryer code: handle tasks in general render function
function handleClick(e) {
    e.target.id === "star-btn" ? render(productA) :
    e.target.id === "fire-btn" ? render(productB): null;
}; 

function render(prod) {
    salesArray.push(prod.emoji);
    renderSalesEmoji(salesArray);
    renderMoneyStream(prod.revenue, prod.commission);
    renderMoneyEmojis();
    salesArray.length === 1 ? renderAchieveEmoji('🔔', achieveArray) :
    salesArray.length === 15 ? renderAchieveEmoji('🏆', achieveArray) :
    salesArray.length === 30 ?  renderAchieveEmoji('🌠', achieveArray) : null; //stretch goal: add new achievements
    updateLocalStorage();
};


//Project requirements: use functions, arrays, and loops

function renderSalesEmoji(arr) {
    let salesDisplay='';
        for (let i = 0; i < arr.length; i++) {
            salesDisplay = arr[i]
        };
    storageObj.salesCounter++;
    let salesCounter = storageObj.salesCounter;
    salesEmojiContainer.innerHTML += salesDisplay;
    liveSalesCountHtml.innerText = salesCounter;
};

function renderAchieveEmoji(emoji, arr) {
    achieveArray.push(emoji);
    let achieveDisplay = '';
        for (let i = 0; i < arr.length; i++) {
            achieveDisplay = arr[i]
        };
    storageObj.achvCounter++;
    let achvCounter = storageObj.achvCounter;
    achvEmojiContainer.innerHTML += achieveDisplay;
    liveAchvCountHtml.innerText = achvCounter;
};

//Rendering the money within this function
//provides the updated values
//and smooths out some of the problems with the >= 2500 logic

function renderMoneyStream(rev, comm) {
    let revenueCounter = storageObj.revenueCounter += rev;
    revenueHtml.textContent = `$${revenueCounter}`;
    let commissionCounter = storageObj.commissionCounter += comm;
    commissionHtml.textContent = `$${commissionCounter}`;
    renderMoneyEmojis(revenueCounter, commissionCounter);
};

//By creating achieveArray
//we can check if it already includes the emojis
//using the includes method
//emojis no longer repeat with each click

function renderMoneyEmojis(rev, comm) {
    !achieveArray.includes('💰') && rev >= 2500 ? renderAchieveEmoji('💰', achieveArray) : null;
    !achieveArray.includes('🪙') && rev >= 5000 ? renderAchieveEmoji('🪙', achieveArray) : null;
    !achieveArray.includes('💵') && comm >= 500 ? renderAchieveEmoji('💵', achieveArray) : null; //stretch goal: add new achievements
    !achieveArray.includes('💸') && comm >= 1000 ? renderAchieveEmoji('💸', achieveArray) : null; //stretch goal: add new achievements
};

// render data in storageObj
function renderStoredData() {
    if (storageObj) {
      salesEmojiContainer.innerHTML = storageObj.salesArray.join('');
      achvEmojiContainer.innerHTML = storageObj.achieveArray.join('');
      liveSalesCountHtml.innerText = storageObj.salesCounter;
      liveAchvCountHtml.innerText = storageObj.achvCounter;
      revenueHtml.textContent = `$${storageObj.revenueCounter}`;
      commissionHtml.textContent = `$${storageObj.commissionCounter}`;
    };
};

// updates local storage
const updateLocalStorage = () => localStorage.setItem("salesboardData", JSON.stringify(storageObj));

//Stretch goal: reset data
function reset() {
    localStorage.removeItem("salesboardData");
    localStorage.removeItem(lightModeKey);
    window.location.reload();
};


/****** EVENT LISTENERS ******/

document.addEventListener("click", handleClick);

document.getElementById('reset-btn').addEventListener("click", reset);

lightModeToggle.addEventListener('click', renderLightMode);
//add toggle to keyboard focus
document.getElementById('lightmode-label').addEventListener('keypress', e => {
    if(e.key === "Enter") {
        renderLightMode()
    };
});

renderStoredData();
// Call the loadLightModeSetting function to load the initial light mode setting
loadLightModeSetting();





