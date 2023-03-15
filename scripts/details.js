const querySearch = document.location.search

const id = new URLSearchParams(querySearch).get("id")

const card = data.events.find(event => event._id == id)

const containerDetails = document.getElementById('cardsDetails')
if(card.date < data.currentDate){
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
      <p>${[card.assistance]}</p>
    </div>
    <div class="categoryDetails">
      <img src="./assets/list-solid.svg" alt="Category">
      <p>${[card.category]}</p>
    </div>
  </div>
</section>
</div>`
}
else{
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
      <p>${[card.estimate]}</p>
    </div>
    <div class="categoryDetails">
      <img src="./assets/list-solid.svg" alt="Category">
      <p>${[card.category]}</p>
    </div>
  </div>
</section>
</div>`

}


