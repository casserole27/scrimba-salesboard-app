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

const starBtn = document.getElementById("star-btn")
const fireBtn = document.getElementById("fire-btn")
const liveSalesCountHtml = document.getElementById("sales-counter")
const salesEmojiContainer = document.getElementById("sales-emoji-container")
const liveAchvCountHtml = document.getElementById("achv-counter")
const achvEmojiContainer = document.getElementById("achv-emoji-container")
const revenueHtml = document.getElementById("revenue")
const commissionHtml = document.getElementById("commission")
let salesCounter = 0
let achvCounter = 0
let revenueCounter = 0
let commissionCounter = 0

/****** FUNCTIONS ******/

// function to handle button click.

// Any ideas how we can make this a little more DRY? It's not huge,
// but it does repeat itself a bit.
function handleClick(e) {
    if (e.target.id === "star-btn") {
        addSalesEmoji(productA)
        addRev(productA.revenue)
        addComm(productA.commission)
    } else if (e.target.id === "fire-btn") {
        addSalesEmoji(productB)
        addRev(productB.revenue)
        addComm(productB.commission)
    }

}

// function to add sales emojis, call achv func and increase sales counter. 
function addSalesEmoji(obj) {
    salesCounter++
    addAchvEmoji()
    liveSalesCountHtml.textContent = salesCounter
    salesEmojiContainer.innerHTML += obj.emoji
}


// function to add achievements if requirements met.
// I think we could make this a bit more consise, any ideas?
function addAchvEmoji() {
    // didn't add medal emojis yet for achievements yet, just console.log
    if(salesCounter === 1) {
        achvCounter++
        console.log("first sale")
        liveAchvCountHtml.textContent = achvCounter
    } else if (salesCounter === 15) {
        achvCounter++
        liveAchvCountHtml.textContent = achvCounter
        console.log("15th sale")
    // Issues getting the below achv 100% of the time. If put at >= 2500,
    // it keeps adding achvs. Any solutions? 
    } else if (revenueCounter === 2500) {
        achvCounter++
        console.log("rev 2500")
        liveAchvCountHtml.textContent = achvCounter
    }
}

// tally revenue
function addRev(rev) {
    revenueCounter += rev
    revenueHtml.textContent = `$${revenueCounter}`
}

// tally commission
function addComm(comm) {
    commissionCounter += comm
    commissionHtml.textContent = `$${commissionCounter}`
}

/****** EVENT LISTENERS ******/

document.addEventListener("click", handleClick)