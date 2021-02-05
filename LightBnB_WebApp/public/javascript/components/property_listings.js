$(() => {

  const $propertyListings = $(`
  <section class="property-listings" id="property-listings">
      <p>Loading...</p>
    </section>
  `);
  window.$propertyListings = $propertyListings;

  window.propertyListings = {};

  function addListing(listing) {
    $propertyListings.append(listing);
  }

  const appended = new Promise(addListing);

  function clearListings() {
    $propertyListings.empty();
  }
  window.propertyListings.clearListings = clearListings;

  function addProperties(properties, isReservation = false) {
    clearListings();
    for (const propertyId in properties) {
      const property = properties[propertyId];
      const listing = propertyListing.createListing(property, isReservation);
      addListing(listing);
    }

    appended.then(() => {

      $(".reservation-form").on('submit', function(event) {
      
        event.preventDefault();
      
        console.log('form submitted')    
      
        views_manager.show('none');
      
        const data = $(this).serialize();
        submitReservation(data)
        .then(() => {      
        propertyListings.clearListings();
        getAllReservations()
        .then(function(json) {
          propertyListings.addProperties(json.reservations, true);
          views_manager.show('listings');
        })
        .catch(error => console.error(error));
        })
        
      })        
    })
  }
  window.propertyListings.addProperties = addProperties;

});
