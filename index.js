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
let storageObj = {
    salesCounter: 0,
    achvCounter: 0,
    revenueCounter: 0,
    commissionCounter: 0,
    salesArray: [],
    achieveArray: []
}
let salesCounter = storageObj.salesCounter
let achvCounter = storageObj.achvCounter
let revenueCounter = storageObj.revenueCounter
let commissionCounter = storageObj.commissionCounter

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
    // localStorage.setItem("salesArr", JSON.stringify(storageObj))
    // console.log(JSON.parse(localStorage.getItem("salesArr")))
}

//Project requirements: use functions, arrays, and loops

function renderSalesEmoji(arr) {
    let salesDisplay=''
        for (let i = 0; i < arr.length; i++) {
            salesDisplay = arr[i]
        }
    salesCounter + 1
    salesEmojiContainer.innerHTML += salesDisplay
    liveSalesCountHtml.innerText = salesCounter
    console.log(storageObj)
}

function renderAchieveEmoji(emoji, arr) {
    achieveArray.push(emoji)
    let achieveDisplay = ''
        for (let i = 0; i < arr.length; i++) {
            achieveDisplay = arr[i]
        }
    achvCounter++
    achvEmojiContainer.innerHTML += achieveDisplay
    liveAchvCountHtml.innerText = achvCounter
}

//Rendering the money within this function
//provides the updated values
//and smooths out some of the problems with the >= 2500 logic

function renderMoneyStream(rev, comm) {
    revenueCounter += rev
    revenueHtml.textContent = `$${revenueCounter}`
    commissionCounter += comm
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

//Stretch goal: reset data
function reset() {
    salesArray = []
    achieveArray = []
    salesCounter = 0
    achvCounter = 0
    revenueCounter = 0
    commissionCounter = 0
    salesEmojiContainer.innerHTML = ''
    achvEmojiContainer.innerHTML = ''   
    liveSalesCountHtml.textContent = 0
    liveAchvCountHtml.textContent = 0
    revenueHtml.textContent = `$0`
    commissionHtml.textContent = `$0`
}

/****** EVENT LISTENERS ******/

document.addEventListener("click", handleClick)

document.getElementById('reset-btn').addEventListener("click", reset)
