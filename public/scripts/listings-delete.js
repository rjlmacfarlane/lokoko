/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const deleteListing = function(listing_id) {
    $.ajax({
      method: 'DELETE',
      url: `/listings/${listing_id}`,
      data: {id: listing_id}
    })
      .then(() => {
        window.location.href = "/"
        // console.log("POST REQUEST")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  $('.admin-delete-button').on('click', function(event) {
    console.log("im clicking on the button")
    console.log(event.target.value);
    deleteListing(event.target.value);
  });

});
