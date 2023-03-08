//Separa los eventos futuros y los pasados:
let eventosFuturos = []
let eventosPasados = []


function eventosPasadosOFuturos(array){
     for (let i = 0;i < array.length; i++){
         if(data.currentDate > array[i].date){
             eventosFuturos.push(array[i])
         }
         else{
             eventosPasados.push(array[i])
         }
     }
}

eventosPasadosOFuturos(data.events)




//Agrega los eventos futuros al Upcoming Events

const upcomingCards = document.getElementById('upcomingCards')

function mostrarCards(array, contenedor){
    let cards = ''
    for(id of array){
        cards += `<div class="card"> <img src ="${id.image}" alt = "..." > <div class="card-body row"> <h5 class="card-title">${id.name}</h5> <p class="card-text">${id.description}</p> <p>Price: $${id.price}</p> <a href="./details.html" class="btn btn-primary">Details</a> </div> </div >`
     }
     contenedor.innerHTML = cards
 }

mostrarCards(eventosFuturos, upcomingCards)

