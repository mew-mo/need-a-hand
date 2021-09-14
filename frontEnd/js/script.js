// (function() {

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
  // $(function () {
  //   $('#studentCarousel').carousel({
  //     interval: false
  //   });
  // });

  if ($('body').data('title') === 'student-profiles-page') {
    window.addEventListener('load', () => {
      $.ajax({
        url: `${url}/allStudents`,
        type: 'GET',
        dataType: 'json',
        success: function(itemsFromDB) {
          console.log('getting all students... :)');
          let cardCount = 3;
          // keeping track of how many card groups need to be made, will be detected in multiples of 3
          let cardIndex = 0;
          // creaing the index to track the cards inside each card group

          for (var i = 0; i < itemsFromDB.length; i++) {
            if (cardCount % 3 == 0) {
              console.log(`cardcount is at ${cardCount}`);
              // checking if cardcount is a multiple of 3
              document.querySelector('.carousel-inner').innerHTML += `
              <div class="carousel-item">
                <div class="card-group mx-auto student-cards">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${itemsFromDB[cardIndex].name}</h5>
                      <h6>${itemsFromDB[cardIndex].username} • ${itemsFromDB[cardIndex].educator}</h6>
                      <img src="${itemsFromDB[cardIndex].pfpUrl}" alt="">
                      <h5>${itemsFromDB[cardIndex].studyField}</h5>
                      <p class="card-text">${itemsFromDB[cardIndex].extra}</p>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${itemsFromDB[cardIndex+1].name}</h5>
                    <h6>${itemsFromDB[cardIndex+1].username} • ${itemsFromDB[cardIndex+1].educator}</h6>
                    <img src="${itemsFromDB[cardIndex+1].pfpUrl}" alt="">
                    <h5>${itemsFromDB[cardIndex+1].studyField}</h5>
                    <p class="card-text">${itemsFromDB[cardIndex+1].extra}</p>
                  </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                    <div class="card-body">
                    <h5 class="card-title">${itemsFromDB[cardIndex+2].name}</h5>
                    <h6>${itemsFromDB[cardIndex+2].username} • ${itemsFromDB[cardIndex+2].educator}</h6>
                    <img src="${itemsFromDB[cardIndex+2].pfpUrl}" alt="">
                    <h5>${itemsFromDB[cardIndex+2].studyField}</h5>
                    <p class="card-text">${itemsFromDB[cardIndex+2].extra}</p>
                    </div>
                  </div>
                </div>
              </div>
              `;
            }
            cardCount += 1;
            cardIndex += 3;
          }
          // appends all items to the carousel (HOPEFULLY)
        }, //success ends
        error: function() {
          alert('Error: Cannot GET');
        } //error ends
      }); //ajax ends
    }); //window eventlistener ENDS
  }

  // student profiles JS ENDS------------------------------


// }()); //iife ENDS
