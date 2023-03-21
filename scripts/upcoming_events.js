let api
const fetchCardsApi = async () =>{
    try{
        const answer = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        api = await answer.json()
        console.log("Running API")
        filterEventsByDate(api.events, api.currentDate)
        createCheckboxes(futureEvents)
        showCards(futureEvents)
        checkedBoxCategories.addEventListener('change', () =>{grandfilter(api.events)})
        input.addEventListener('input', () =>{grandfilter(api.events)})
    }
    catch(error){
        console.log(error)
        console.log("Running local JSON")
        fetchCardsJSON()
        
    }
}

let archiveJson
const fetchCardsJSON = async () =>{
    try{
        const answer = await fetch("./scripts/amazing.json")
        archiveJson = await answer.json()
        createCheckboxes(archiveJson.events)
        showCards(archiveJson.events)
        checkedBoxCategories.addEventListener('change', () =>{grandfilter(archiveJson.events)})
        input.addEventListener('input', () =>{grandfilter(archiveJson.events)})
    }
    catch(error){
        console.log(error);
    }
}

fetchCardsApi()


//Separate past and future events

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

//Capture DOM elements
const upcomingCards = document.getElementById('upcomingCards')
const checkedBoxCategories = document.getElementById('categories')
const input = document.querySelector('input')

//Create checkboxes dynamically
function createCheckboxes(array){
    let checks = ''
    let categoriesGross = array.map(element => element.category)
    let categories = categoriesGross.filter((item, index) => {
        return categoriesGross.indexOf(item) === index
    })
    categories.forEach(element =>{
        checks += `<li class="list-group-item">
        <label>
        <input class="form-check-input me-1" id="${element}" name="${element}" type="checkbox" value="${element}" aria-label="...">
        ${element}
        </label>
        </li>
        `
    })
    checkedBoxCategories.innerHTML = checks
    }


//Show cards in HTML
function showCards(array){
    if(array.length == 0){
        upcomingCards.innerHTML = `<div class="searchFailed">
                            <img src="./assets/searchX.png">
                            <p>No search results</p>
                            </div>`
    }
    else{
    let cards = ''
    array.forEach(element =>
                cards += `<div class="card">
                    <img src ="${element.image}" alt = "..." >
                    <div class="card-body row">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                    <p>Price: $${element.price}</p>
                    <a href="./details.html?id=${element._id}" class="btn btn-primary">Details</a>
                    </div>
                    </div >`
                , ""
            )
            upcomingCards.innerHTML = cards
    }
}

//Grand filter
function grandfilter(arrayOrigin){
    let arrayFiltered1 = filterByText(arrayOrigin, input.value)
    let arrayFiltered2 = filterByCheckBox(arrayFiltered1)
    showCards(arrayFiltered2)
}

//Filter by texto
function filterByText(array, text){
    let filteredArray = array.filter(element => element.name.toLowerCase().includes(text.toLowerCase()))
    return filteredArray
}

// Filter by checkbox
function filterByCheckBox(array){
    let checkboxes = document.getElementsByClassName("form-check-input")
    let arrayChecks = Array.from(checkboxes)
    let checksChecked = arrayChecks.filter(check => check.checked)
    if(checksChecked.length == 0){
        return array
    }
    let checkValues = checksChecked.map(check => check.value)
    let filteredArray = array.filter(element => checkValues.includes(element.category))
    return filteredArray
}


// //Separate past and future events

// const futureEvents = data.events.filter(cont => cont.date > data.currentDate)

// //DOM Capture

// const upcomingCards = document.getElementById('upcomingCards')


// //---------Show categories dynamically-------------

// //Collect all categories, still repeated
// const categoriesGross = data.events.map(cont => {
//     return cont.category

// })


// //Filter out repeating items
// const categoriesNet = categoriesGross.filter((item, index) => {
//     return categoriesGross.indexOf(item) === index

// })

// // Add category item to page

// const categories = document.getElementById('categories')
// const insertCategories = categoriesNet.reduce((acc, atc) => {
//     return acc + `<li class="list-group-item">
//     <label>
//     <input class="form-check-input me-1" id="${[atc]}" name="${[atc]}" type="checkbox" value="" aria-label="...">
//     ${[atc]}
//     </label>
//     </li>
//     `
// }, "")

// categories.innerHTML = insertCategories


// //showCards

// function showCards(array) {
//     insertFilterCards = array.reduce((acc, atc) =>
//         acc + `<div class="card">
//             <img src ="${atc.image}" alt = "..." >
//             <div class="card-body row">
//             <h5 class="card-title">${atc.name}</h5>
//             <p class="card-text">${atc.description}</p>
//             <p>Price: $${atc.price}</p>
//             <a href="./details.html?id=${atc._id}" class="btn btn-primary">Details</a>
//             </div>
//             </div >`
//         , ""
//     )
//     upcomingCards.innerHTML = insertFilterCards
// }
// function noResults() {
//     upcomingCards.innerHTML = `<div class="searchFailed">
//                             <img src="./assets/searchX.png">
//                             <p>No search results</p>
//                             </div>`
// }

// // Checkbox filter

// let filterCategories = categoriesNet.map(cont => cont)


// filterCards = futureEvents.filter(cont => filterCategories.includes(cont.category))
// showCards(filterCards)

// categoriesNet.forEach(cont => {
//     const checkedBoxCategories = document.getElementById(cont)

//     checkedBoxCategories.addEventListener('change', (e) => {
//         e.preventDefault()
//         if (filterCategories.length == categoriesNet.length && checkedBoxCategories.checked) {
//             filterCategories = []
//         }
//         if (checkedBoxCategories.checked) {
//             filterCategories.push(cont)
//         }
//         else {
//             filterCategories = filterCategories.filter((item) => item !== cont)
//         }
//         if (filterCategories == 0) {
//             filterCategories = categoriesNet.map(cont => cont)
//             noResults()
//         }

//         filterCards = futureEvents.filter(cont => filterCategories.includes(cont.category))
//         showCards(filterCards)
//         if (text.length > 0) {
//             filterByText()
//         }
//     }
//     )
// }
// )


// // Search Form

// const searchForm = document.querySelector('form')
// let filterSearchCards
// let text
// function filterByText() {
//     filterSearchCards = filterCards.filter(cont =>
//         cont.name.toLowerCase().includes(text.toLowerCase())
//     )
//     if (filterSearchCards.length == 0) {
//         noResults()
//     }
//     else if (text.length == 0) {
//         showCards(filterCards)
//     }
//     else {
//         showCards(filterSearchCards)
//     }
// }

// searchForm.addEventListener('input', (e) => {
//     text = e.target.value
//     filterByText()
// }
// )