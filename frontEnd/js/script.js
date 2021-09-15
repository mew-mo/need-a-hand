(function() {

  console.log('js is all linked up yay!');

  // declaring url
  let url;//declare url as a variable in es6
  $.ajax({
    url: 'config.json',
    type: 'GET',
    dataType: 'json',
    success:function(configData){
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
    },
    error:function(error){
      console.log(error);
    }
  });

  // student profiles JS------------------------------
  // $(function () {
  //   $('#studentCarousel').carousel({
  //     interval: false
  //   });
  // });

  // declaring vars
  var navDisplay = false;
  var icon = document.querySelector('#icon img');
  var popoutNav = document.querySelector('.nav__popover');

  // icon nav
  icon.addEventListener('click', () => {
    if (!navDisplay) {
      popoutNav.style.display = 'block';
      navDisplay = true;
    } else if (navDisplay) {
      popoutNav.style.display = 'none';
      navDisplay = false;
    }
  }, false);

  // conditional for closing icon nav by  clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target != icon) {
      popoutNav.style.display = 'none';
      navDisplay = false;
    }
  }, false);

  // carousel chaos :)

  if ($('body').data('title') === 'student-profiles-page') {
    window.addEventListener('load', () => {
      $.ajax({
        url: `${url}/allStudents`,
        type: 'GET',
        dataType: 'json',
        success: function(itemsFromDB) {
          console.log('getting the students');

          // messing it up :)

          let cardCount = 0;

          for (var i = 0; i < itemsFromDB.length; i++) {
            if (cardCount % 2 == 0) {
              document.querySelector('.caro-row').innerHTML += `
               <div class="carousel-item" style="display:block;margin-left:33%;">
                  <div class="col-md-4">
                   <div class="card">
                     <div class="card-body">
                       <h5 class="card-title">${itemsFromDB[i].name}</h5>
                       <h6>${itemsFromDB[i].username} • ${itemsFromDB[i].educator}</h6>
                       <div class="img-container__crop">
                           <img src="${itemsFromDB[i].pfpUrl}" alt="${itemsFromDB[i].name}'s profile picture'">
                       </div>
                       <h5>${itemsFromDB[i].studyField}</h5>
                       <p class="card-text">${itemsFromDB[i].extra}</p>
                    </div>
                   </div>
                   </div> <--!col-->
                </div>`;
            } else if (cardCount % 3 == 0) {
              document.querySelector('.caro-row').innerHTML += `
               <div class="carousel-item" style="dsiplay:block;margin-left:66%;">
                  <div class="col-md-4">
                   <div class="card">
                     <div class="card-body">
                       <h5 class="card-title">${itemsFromDB[i].name}</h5>
                       <h6>${itemsFromDB[i].username} • ${itemsFromDB[i].educator}</h6>
                       <div class="img-container__crop">
                           <img src="${itemsFromDB[i].pfpUrl}" alt="${itemsFromDB[i].name}'s profile picture'">
                       </div>
                       <h5>${itemsFromDB[i].studyField}</h5>
                       <p class="card-text">${itemsFromDB[i].extra}</p>
                    </div>
                   </div>
                   </div> <--!col-->
                </div>`;
            } else {
              document.querySelector('.caro-row').innerHTML += `
               <div class="carousel-item">
                  <div class="col-md-4">
                   <div class="card">
                     <div class="card-body">
                       <h5 class="card-title">${itemsFromDB[i].name}</h5>
                       <h6>${itemsFromDB[i].username} • ${itemsFromDB[i].educator}</h6>
                       <div class="img-container__crop">
                           <img src="${itemsFromDB[i].pfpUrl}" alt="${itemsFromDB[i].name}'s profile picture'">
                       </div>
                       <h5>${itemsFromDB[i].studyField}</h5>
                       <p class="card-text">${itemsFromDB[i].extra}</p>
                    </div>
                   </div>
                   </div> <--!col-->
                </div>`;
            }
              cardCount += 1;
            }

          // let cardCount = 3;
          // // keeping track of how many card groups need to be made, will be detected in multiples of 3
          // let cardIndex = 0;
          // // creaing the index to track the cards inside each card group
          //
          // for (var i = 0; i < itemsFromDB.length; i++) {
          //   if (cardCount % 3 == 0) {
          //     console.log(`cardcount is at ${cardCount}`);
          //     // checking if cardcount is a multiple of 3
          //     document.querySelector('.carousel-inner').innerHTML += `
          //     <div class="carousel-item">
          //       <div class="card-group mx-auto student-cards">
          //         <div class="card">
          //           <div class="card-body">
          //             <h5 class="card-title">${itemsFromDB[cardIndex].name}</h5>
          //             <h6>${itemsFromDB[cardIndex].username} • ${itemsFromDB[cardIndex].educator}</h6>
          //             <div class="img-container__crop">
          //                 <img src="${itemsFromDB[cardIndex].pfpUrl}" alt="${itemsFromDB[cardIndex].name}'s profile picture'">
          //             </div>
          //             <h5>${itemsFromDB[cardIndex].studyField}</h5>
          //             <p class="card-text">${itemsFromDB[cardIndex].extra}</p>
          //           </div>
          //         </div>
          //         <div class="card">
          //           <div class="card-body">
          //           <h5 class="card-title">${itemsFromDB[cardIndex+1].name}</h5>
          //           <h6>${itemsFromDB[cardIndex+1].username} • ${itemsFromDB[cardIndex+1].educator}</h6>
          //           <div class="img-container__crop">
          //               <img src="${itemsFromDB[cardIndex+1].pfpUrl}" alt="${itemsFromDB[cardIndex+1].name}'s profile picture'">
          //           </div>                    <h5>${itemsFromDB[cardIndex+1].studyField}</h5>
          //           <p class="card-text">${itemsFromDB[cardIndex+1].extra}</p>
          //         </div>
          //           </div>
          //         </div>
          //         <div class="card">
          //           <div class="card-body">
          //           <div class="card-body">
          //           <h5 class="card-title">${itemsFromDB[cardIndex+2].name}</h5>
          //           <h6>${itemsFromDB[cardIndex+2].username} • ${itemsFromDB[cardIndex+2].educator}</h6>
          //           <div class="img-container__crop">
          //               <img src="${itemsFromDB[cardIndex+2].pfpUrl}" alt="${itemsFromDB[cardIndex+2].name}'s profile picture'">
          //           </div>                    <h5>${itemsFromDB[cardIndex+2].studyField}</h5>
          //           <p class="card-text">${itemsFromDB[cardIndex+2].extra}</p>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //     `;
          //   }
          //   cardCount += 1;
          //   cardIndex += 3;
          // }
          // appends all items to the carousel (HOPEFULLY)
        }, //success ends
        error: function() {
          alert('Error: Cannot GET');
        } //error ends
      }); //ajax ends
    }); //window eventlistener ENDS
  }

  // student profiles JS ENDS------------------------------

  // student registration instant login tests ------------------------------
  // student registration  =====================================================
    //
    // $('#XXXCREATE-ACC-BTN-STUDENT').click(function(){
    //   event.preventDefault()//this prevents code breaking when no data is found
    //   let sName = $('#username-INPUT').val();
    //   let sUsername = $('#username-INPUT').val();
    //   let sEmail = $('#email-INPUT').val();
    //   let sPassword = $('#password-INPUT').val();
    //   let sPfpUrl = $('#portfolio-INPUT').val();
    //   let sStudy = $('#study-INPUT').val();
    //   let sEducator = $('#educator-INPUT').val();
    //   let sExtra = $('#extra-INPUT').val();
    //
    //   console.log(sName, sUsername, sEmail, sPassword, sPfpUrl, sStudy, sEducator, sExtra);
    //
    //   if (sName == '' || sUsername == '' || sEmail == '' || sPassword == '' || sStudy == '' || sEducator == ''){
    //     alert('Please enter all student details');
    //   } else {
    //     $.ajax({
    //       url: `${url}//registerStudent`,
    //       type : 'POST',
    //       data : {
    //         name: sName,
    //         username: sUsername,
    //         email: sEmail,
    //         password: sPassword,
    //         pfpUrl: sPfpUrl,
    //         studyField: sStudy,
    //         educator: sEducator,
    //         extra: sExtra
    //       },
    //       success:function(user){
    //         console.log(user); //remove when development is finished
    //         if (user !== 'username taken already. Please try another name'){
    //           alert('Please login to manipulate the products data');
    //         } else {
    //           alert('username taken already. Please try another name');
    //           // ********** change ids *******
    //           $('#username').val('');
    //           $('#email').val('');
    //           $('#password').val('');
    //         } //else
    //       }, //success
    //       error:function(){
    //         console.log('error: cannot call api');
    //       }//error
    //     })//ajax post
    //   }//if
    // })//#XXXCREATE-ACC-BTN-STUDENT
  // student registration instant login ENDS ------------------------------



 }()); //iife ENDS
