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
        addMoneyStream(productA.revenue, productA.commission)
        // addComm(productA.commission)
    } else if (e.target.id === "fire-btn") {
        addSalesEmoji(productB)
        addMoneyStream(productB.revenue, productB.commission )
        // addComm(productB.commission)
    }
}

// function to add sales emojis, call achv func and increase sales counter. 
function addSalesEmoji(obj) {
    salesCounter++
    liveSalesCountHtml.textContent = salesCounter
    salesEmojiContainer.innerHTML += obj.emoji
}

// tally revenue and comission, formerly addRev function
// I did this to pass updated versions of the variables as parameters 
//into addAchvEmoji function so that the conditionals work
function addMoneyStream(rev, comm) { 
    revenueCounter += rev
    revenueHtml.textContent = `$${revenueCounter}`
    commissionCounter += comm
    commissionHtml.textContent = `$${commissionCounter}`
    addAchvEmoji(salesCounter, revenueCounter, commissionCounter)
}

//project requirement: use arrays and objects
//stretch goal: added extra achievements
const achievements = [
    {sales: 1, revenue: 0, comm: 0, emoji: '🔔'},
    {sales: 15, revenue: 0, comm: 0, emoji: '🏆'},
    {sales: 0, revenue: 2500, comm: 0, emoji: '💰'},
    {sales: 0, revenue: 5000, comm: 0, emoji: '🤑'},
    {sales: 0, revenue: 0, comm: 500, emoji: '💵'},
    {sales: 0, revenue: 0, comm: 1000, emoji: '💸'},
]

//project requirement: use loops
//.find() is not really a loop, but it's an iterative method
function getRevenueAchievement(revenue) {
 //strictly equals will only yield an emoji if the number is hit exactly   
    if (revenue >= 5000) { 
        return achievements.find(achv => achv.emoji === '🤑')
    } else if (revenue >= 2500) {
        return achievements.find(achv => achv.emoji === '💰')
    } else {
        return null
    }
}

function addAchvEmoji(sales, revenue, commission) {
    const salesAchievement = achievements.find(achv => achv.sales === sales)
    const revenueAchievement = getRevenueAchievement(revenue)
    const commAchievement = achievements.find(achv => achv.comm === commission)

    if (salesAchievement || commAchievement || revenueAchievement) {
        const achievement = salesAchievement || commAchievement || revenueAchievement
        achvCounter++
        liveAchvCountHtml.textContent = achvCounter
        achvEmojiContainer.innerHTML += achievement.emoji
    }
}

function reset() {
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


//PREVIOUS CODE

// tally commission
// function addComm(comm) {
//     commissionCounter += comm
//     commissionHtml.textContent = `$${commissionCounter}`
// }


// function to add achievements if requirements met.
// I think we could make this a bit more consise, any ideas?
// function addAchvEmoji(sales, revenue) {
    // didn't add medal emojis yet for achievements yet, just console.log
    // if(sales === 1) {
    //     achvCounter++
    //     liveAchvCountHtml.textContent = achvCounter
    //     achvEmojiContainer.innerHTML += "🔔"
    // } else if (sales === 15) {
    //     achvCounter++
    //     liveAchvCountHtml.textContent = achvCounter
    //     achvEmojiContainer.innerHTML += "🏆"
    // Issues getting the below achv 100% of the time. If put at >= 2500,
    // it keeps adding achvs. Any solutions? 
//    } else if (revenue === 2500 || revenue > 2500) {
//         achvCounter++
//         liveAchvCountHtml.textContent = achvCounter
//         achvEmojiContainer.innerHTML += "💰"
//     } 
// }