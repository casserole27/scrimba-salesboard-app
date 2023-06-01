/****** VARIABLES ******/

// Product A info
let productA = {
    id: 1,
    emoji: "⭐",
    revenue: 200,
    commission: 50
}

// Product B info
let productB = {
    id: 2,
    emoji: "🔥",
    revenue: 300,
    commission: 75
}

const liveSalesCountHtml = document.getElementById("sales-counter")
const salesEmojiContainer = document.getElementById("sales-emoji-container")
const liveAchvCountHtml = document.getElementById("achv-counter")
const achvEmojiContainer = document.getElementById("achv-emoji-container")
const revenueHtml = document.getElementById("revenue")
const commissionHtml = document.getElementById("commission")
let storedData = JSON.parse(localStorage.getItem("salesboardData"))
const lightModeToggle = document.getElementById('lightmode-toggle');
lightModeToggle.checked = false;

// storageObj either equals to the stored data in local storage,
// or to empty arrays/values if nothing is in storage
let storageObj = storedData || {
    salesArray: [],
    achieveArray: [],
    salesCounter: 0,
    achvCounter: 0,
    revenueCounter: 0,
    commissionCounter: 0
}

let salesArray = storageObj.salesArray
let achieveArray = storageObj.achieveArray

/****** FUNCTIONS ******/

//Project requirement: use objects, using provided objects
//My idea for dryer code: handle tasks in general render function
function handleClick(e) {
    if (e.target.id === "star-btn") {
        render(productA)
    } else if (e.target.id === "fire-btn") {
        render(productB)
    }
}      

function render(prod) {
    salesArray.push(prod.emoji)
    renderSalesEmoji(salesArray)
    renderMoneyStream(prod.revenue, prod.commission)
    renderMoneyEmojis()
    if (salesArray.length === 1) {
       renderAchieveEmoji('🔔', achieveArray)
    } else if (salesArray.length === 15) {
        renderAchieveEmoji('🏆', achieveArray)
    } else if (salesArray.length === 30) { //stretch goal: add new achievements
        renderAchieveEmoji('🌠', achieveArray)
    }
    updateLocalStorage()
}

//Project requirements: use functions, arrays, and loops

function renderSalesEmoji(arr) {
    let salesDisplay=''
        for (let i = 0; i < arr.length; i++) {
            salesDisplay = arr[i]
        }
    storageObj.salesCounter++
    let salesCounter = storageObj.salesCounter
    salesEmojiContainer.innerHTML += salesDisplay
    liveSalesCountHtml.innerText = salesCounter
}

function renderAchieveEmoji(emoji, arr) {
    achieveArray.push(emoji)
    let achieveDisplay = ''
        for (let i = 0; i < arr.length; i++) {
            achieveDisplay = arr[i]
        }
    storageObj.achvCounter++
    let achvCounter = storageObj.achvCounter
    achvEmojiContainer.innerHTML += achieveDisplay
    liveAchvCountHtml.innerText = achvCounter
}

//Rendering the money within this function
//provides the updated values
//and smooths out some of the problems with the >= 2500 logic

function renderMoneyStream(rev, comm) {
    let revenueCounter = storageObj.revenueCounter += rev
    revenueHtml.textContent = `$${revenueCounter}`
    let commissionCounter = storageObj.commissionCounter += comm
    commissionHtml.textContent = `$${commissionCounter}`
    renderMoneyEmojis(revenueCounter, commissionCounter)
}

//By creating achieveArray
//we can check if it already includes the emojis
//using the includes method
//emojis no longer repeat with each click

function renderMoneyEmojis(rev, comm) {
    if (!achieveArray.includes('💰')) {
        if (rev >= 2500) {
            renderAchieveEmoji('💰', achieveArray)
        }
    }
    if (!achieveArray.includes('🪙')) {
        if (rev >= 5000) {
            renderAchieveEmoji('🪙', achieveArray)
        }
    }
    if (!achieveArray.includes('💵')) { //stretch goal: add new achievements
        if (comm >= 500) {
            renderAchieveEmoji('💵', achieveArray)
        }
    }
    if (!achieveArray.includes('💸')) { //stretch goal: add new achievements
        if (comm >= 1000) {
            renderAchieveEmoji('💸', achieveArray)
        }
    }
}

// render data in storageObj
function renderStoredData() {
    if (storageObj) {
      salesEmojiContainer.innerHTML = storageObj.salesArray.join('')
      achvEmojiContainer.innerHTML = storageObj.achieveArray.join('')
      liveSalesCountHtml.innerText = storageObj.salesCounter
      liveAchvCountHtml.innerText = storageObj.achvCounter
      revenueHtml.textContent = `$${storageObj.revenueCounter}`
      commissionHtml.textContent = `$${storageObj.commissionCounter}`
    }
  }

// updates local storage
const updateLocalStorage = () => localStorage.setItem("salesboardData", JSON.stringify(storageObj))


/****** LIGHT/DARK MODE TOGGLE ******/

const enableLightMode = () => document.body.classList.add('lightmode');

const disableLightMode = () => document.body.classList.remove('lightmode');

// storage key for light mode
const lightModeKey = "lightMode";
// Function to save the light mode setting to local storage
const saveLightModeSetting = (isLightMode) => localStorage.setItem(lightModeKey, isLightMode);

// Function to load the light mode setting from local storage
function loadLightModeSetting () {
  const isLightMode = localStorage.getItem(lightModeKey);
  if (isLightMode === "true") {
    enableLightMode();
    lightModeToggle.checked = true;
  } else {
    disableLightMode();
    lightModeToggle.checked = false;
  }
}

//Stretch goal: reset data
function reset() {
    localStorage.removeItem("salesboardData")
    localStorage.removeItem(lightModeKey)
    window.location.reload()
}


/****** EVENT LISTENERS ******/

document.addEventListener("click", handleClick)

document.getElementById('reset-btn').addEventListener("click", reset)

lightModeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('lightmode')) {    
        disableLightMode()
        saveLightModeSetting(false)
    } else {
        enableLightMode();
        saveLightModeSetting(true)
    }
});

renderStoredData()
// Call the loadLightModeSetting function to load the initial light mode setting
loadLightModeSetting();

