// DOM Capture
const allCards = document.getElementById('allCards')



// -----Show categories dynamically------

//Collect all categories, still repeated
const categoriesGross = data.events.map(cont => {
    return cont.category

})

//Filter out repeating items
const categoriesNet = categoriesGross.filter((item, index) => {
    return categoriesGross.indexOf(item) === index

})


// Add category item to page
const categories = document.getElementById('categories')
const insertCategories = categoriesNet.reduce((acc, atc) => {
    return acc + `<li class="list-group-item">
    <label>
    <input class="form-check-input me-1" id="${[atc]}" name="${[atc]}" type="checkbox" value="" aria-label="...">
    ${[atc]}
    </label>
    </li>
    `
}, "")

categories.innerHTML = insertCategories

//showCards

function showCards(array) {
    insertFilterCards = array.reduce((acc, atc) =>
        acc + `<div class="card">
            <img src ="${atc.image}" alt = "..." >
            <div class="card-body row">
            <h5 class="card-title">${atc.name}</h5>
            <p class="card-text">${atc.description}</p>
            <p>Price: $${atc.price}</p>
            <a href="./details.html?id=${atc._id}" class="btn btn-primary">Details</a>
            </div>
            </div >`
        , ""
    )
    allCards.innerHTML = insertFilterCards
}
function noResults(){
    allCards.innerHTML = `<div class="searchFailed">
                            <img src="./assets/searchX.png">
                            <p>No search results</p>
                            </div>`
}


// Checkbox filter

let filterCategories = categoriesNet.map(cont => cont)

filterCards = data.events.filter(cont => filterCategories.includes(cont.category))
showCards(filterCards)

categoriesNet.forEach(cont => {
    const checkedBoxCategories = document.getElementById(cont)
    
    checkedBoxCategories.addEventListener('change', (e) => {
        e.preventDefault()
        if (filterCategories.length == categoriesNet.length && checkedBoxCategories.checked) {
            filterCategories = []
        }
        if (checkedBoxCategories.checked) {
            filterCategories.push(cont) 
        }
        else{
            filterCategories = filterCategories.filter((item) => item !== cont)
        }
        if (filterCategories == 0) {
            filterCategories = categoriesNet.map(cont => cont)
            noResults()
        }
        filterCards = data.events.filter(cont => filterCategories.includes(cont.category))
        showCards(filterCards) 
        if(text.length>0){
            filterByText()
        }
    }
    ) 
}
)


// Search Form

const searchForm = document.querySelector('form')
let filterSearchCards
let text
function filterByText(){
    filterSearchCards = filterCards.filter(cont =>
        cont.name.toLowerCase().includes(text.toLowerCase())
    )
    if (filterSearchCards.length == 0) {
        noResults()
    }
    else if(text.length == 0){
        showCards(filterCards)
    }
    else{
        showCards(filterSearchCards)
    }
}


searchForm.addEventListener('input', (e) => {
    text = e.target.value
    filterByText()
}
)


