// const eventsNew = data.events.map(event =>{
//     let aux = {}
//     aux.id = event._id
//     aux.name = event.name
//     aux.image = event.image
//     aux.description = event.description
//     aux.date = event.date
//     aux.capacity = event.capacity
//     aux.price = event.price
//     aux.category = event.category
//     aux.place = event.place
//     return aux

// })


const querySearch = document.location.search

const id = new URLSearchParams(querySearch).get("id")

const card = data.events.find(event => event._id == id)

const containerDetails = document.getElementById('cardsDetails')

containerDetails.innerHTML = `<div class="boxDetails"> 
<img class="imgDetails" src="${[card.image]}" alt=""> 
<section class="infoDetails">
  <h2>${[card.name]}</h2>
  <p>${[card.description]}</p>
  <div class="dataDetails">
    <div class="dateDetails">
      <img src="./assets/calendar-days-regular.svg" alt="Date">
      <p>${[card.date]}</p>
    </div>
    <div class="placeDetails">
      <img src="./assets/location-dot-solid.svg" alt="Place">
      <p>${[card.place]}</p>
    </div>
    <div class="priceDetails">
      <img src="./assets/ticket.png" alt="Price">
      <p>$${[card.price]}</p>
    </div>
    <div class="capacityDetails">
      <img src="./assets/people-group-solid.svg" alt="Capacity">
      <p>${[card.capacity]}</p>
    </div>
    <div class="categoryDetails">
      <img src="./assets/list-solid.svg" alt="Category">
      <p>${[card.category]}</p>
    </div>
  </div>
</section>
</div>`



