let api
const fetchCardsApi = async () =>{
    try{
        const answer = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        api = await answer.json()
        console.log("Running API")
        createCheckboxes(api.events)
        showCards(api.events)
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


//Capture DOM elements
const allCards = document.getElementById('allCards')
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
            allCards.innerHTML = `<div class="searchFailed">
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
            allCards.innerHTML = cards
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

