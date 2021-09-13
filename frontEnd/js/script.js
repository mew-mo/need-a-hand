(function() {

  console.log('js is all linked up yay!');

  // declaring url
  let url;
  $.ajax({
    url: 'js/config.json',
    type: 'GET',
    dataType: 'json',
    success: function(configData) {
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
    },
    error: function(error) {
      alert('Error:', error);
    }
  });

  // student profiles JS------------------------------

  $('.carousel').carousel({
    interval: 2000
  });

  // student profiles JS ENDS------------------------------


}()); //iife ENDS
