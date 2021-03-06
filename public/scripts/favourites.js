/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const deleteFav = function(listing_id) {
    // console.log("LISTING ID IS" + listing_id)
    $.ajax({
      method: 'POST',
      url: `/favourites/${window.location.pathname.split('/')[2]}`,
      data: {listing_id}
    })
      .then(() => {
        // do nothing
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const addFav = function(listing_id) {
    console.log(listing_id)
    $.ajax({
      method: 'POST',
      url: `/favourites`,
      data: {listing_id}
    })
      .then(() => {
        // do nothing
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const loadFavourites = function() {
    const url = `http://localhost:8080/favourites/${window.location.pathname.split('/')[2]}`;
    $.ajax({
      method: 'GET',
      url: url
    })
      .then((result) => {
        // do nothing with the html
      })
      .catch((err) => console.log(err));
  };

    // On the remove button click
  $('.fav-remove-button').on('click', function(event) {
    const favContainer = $(this).parent('.d-flex').parent('.p-4').parent('.bg-white').parent('#fav-container');
    // delete a favourite
    console.log("AFTER CLICK : " + event.target.value)
    deleteFav(event.target.value);
    // deletes html instantly
    favContainer.remove();
    loadFavourites();
  });

  // add to favourite
  $('.fav-add-button').on('click', function(event) {
    console.log(event.currentTarget.value)
    addFav(event.currentTarget.value);
    let text = $('.fav-add-button span').text();
    if (text == "Add to Favourites" ){
       $('.fav-add-button span').text('Added');
       $('.fav-add-button').addClass('liked');
       $('.fav-add-button').attr("disabled", true);
    }
  });
});
