let api
const fetchEventsApi = async () =>{
    try{
        const answer = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        api = await answer.json()
        console.log("Running API")
        filterEventsByDate(api.events, api.currentDate)
        separateCategories(futureEvents, futureCategories)
        separateCategories(pastEvents)
        showCategories(futureEvents, futureCategories, 'future', upcomingEvents)
        showCategories(pastEvents, pastCategories, 'past', pastEventsId)
        showEventsStatistics(pastEvents, statistics)
        
    }
    catch(error){
        console.log(error)
        console.log("Running local JSON")
        fetchEventsJSON()
        
        
    }
}

let archiveJson
const fetchEventsJSON = async () =>{
    try{
        const answer = await fetch("./scripts/amazing.json")
        archiveJson = await answer.json()
        filterEventsByDate(archiveJson.events, archiveJson.currentDate)
        separateCategories(futureEvents, futureCategories)
        separateCategories(pastEvents)
        showCategories(futureEvents, futureCategories, 'future', upcomingEvents)
        showCategories(pastEvents, pastCategories, 'past', pastEventsId)
        showEventsStatistics(pastEvents, statistics)
    }
    catch(error){
        console.log(error);
    }
}

fetchEventsApi()

//Capture DOM elements
const upcomingEvents = document.getElementById('upcomingEvents')
const pastEventsId = document.getElementById('pastEventsId')
const statistics = document.getElementById('statistics')



//Filter events by date (past and future)
let futureEvents
let pastEvents
function filterEventsByDate(array, date){
    futureEvents = array.filter(element =>{
        return element.date > date
    })
    pastEvents = array.filter(element =>{
        return element.date < date
    })
}


//Filter past and future categories
let pastCategories = []
let futureCategories = []
function separateCategories(array){
    if(array == pastEvents){
        let categoriesGross = array.map(element => element.category)
        pastCategories = categoriesGross.filter((item, index) => {
            return categoriesGross.indexOf(item) === index
        })
    }
    else if(array == futureEvents){
        let categoriesGross = array.map(element => element.category)
        futureCategories = categoriesGross.filter((item, index) => {
            return categoriesGross.indexOf(item) === index
        })
    }
    
}


//Show categories in HTML
function showCategories(array, arrayFilter, pastOrFuture, div){
    let events = ''
    arrayFilter.forEach(element =>{
        collectionByCategories(element, array, pastOrFuture)
        percentageByCategories(element, array, pastOrFuture )
        events += `
                    <tr>
                    <td>${element}</td>
                    <td>$${totalCollection}</td>
                    <td>${assistance.toFixed(2)}%</td>
                    </tr>
                    `
    })
    div.innerHTML = events
}

//Show statistic assistance in HTML
function showEventsStatistics(arrayFilter, div){
    statisticsAssistance(arrayFilter)
        div.innerHTML  = `
                    <tr>
                    <td>${highestAssistance}</td>
                    <td>${lowestAssistance}</td>
                    <td>${largerCapacity}</td>
                    </tr>
                    `
}

//Collection by categories
let totalCollection = 0
function collectionByCategories(cat, array, pastOrFuture){
    let partialCollection
    let catReactive
    array.forEach((event,assistanceOrEstimate) =>{
        if(pastOrFuture == 'past'){
            assistanceOrEstimate = 'assistance'
        }
        else if(pastOrFuture == 'future'){
            assistanceOrEstimate = 'estimate'
        }
        if(catReactive != cat){
            totalCollection = 0
        }
        if(event.category == cat){
            partialCollection = event[assistanceOrEstimate] * event.price;
            totalCollection += partialCollection
            catReactive = cat
        }
    }
    
    )    
}

//Percentage by categories
let assistance = 0
function percentageByCategories(cat, array, pastOrFuture){
    let catReactive
    let assistanceGross = 0
    let capacityGross = 0
    array.forEach((event, assistanceOrEstimate)=>{
        if(pastOrFuture == 'past'){
            assistanceOrEstimate = 'assistance'
        }
        else if(pastOrFuture == 'future'){
            assistanceOrEstimate = 'estimate'
        }
        if(catReactive != cat){
            assistanceGross = 0
            capacityGross = 0
        }
        if(event.category == cat){
            assistanceGross += event[assistanceOrEstimate]
            capacityGross += event.capacity
            catReactive = cat
            assistance = (100 * assistanceGross) / capacityGross 
        }

    })
}


//Statistics assistance (Higher and lower percentages)
let highestAssistance
let lowestAssistance
let largerCapacity
function statisticsAssistance(array){
let percentageByEvents = array.map(element =>{
    let aux = {}
    aux.name = element.name
    aux.capacity = element.capacity
    aux.assistancePercentage = (100 * element.assistance) / element.capacity
    return aux
    
}
    )
    let orderMax = percentageByEvents.sort((a,b)=>{
        return b.assistancePercentage - a.assistancePercentage
    })
    highestAssistance = `${orderMax[0].name} (${orderMax[0].assistancePercentage.toFixed(2)}%)`
    
    let orderMin = percentageByEvents.sort((a,b)=>{
        return a.assistancePercentage - b.assistancePercentage
    })
    lowestAssistance = `${orderMax[0].name} (${orderMax[0].assistancePercentage.toFixed(2)}%)`

    let maxCapacity = percentageByEvents.sort((a,b)=>{
        return b.capacity - a.capacity
    })
    largerCapacity = `${orderMax[0].name} (${orderMax[0].capacity})`

}





