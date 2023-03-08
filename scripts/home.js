
// Agrega todos los eventos al home
const allCards = document.getElementById('allCards')

function mostrarCards(array, contenedor){
    let cards = ''
    for(id of array){
        cards += `<div class="card"> <img src ="${id.image}" alt = "..." > <div class="card-body row"> <h5 class="card-title">${id.name}</h5> <p class="card-text">${id.description}</p> <p>Price: $${id.price}</p> <a href="./details.html" class="btn btn-primary">Details</a> </div> </div >`
    }
    contenedor.innerHTML = cards
}

mostrarCards(data.events, allCards)


