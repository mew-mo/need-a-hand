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

  $('.student-carousel').slick({
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '<div class="slick-prev"></div>',
    nextArrow: '<div class="slick-next"></div>',

    onBeforeChange: function () {
      $('.slick-slide').removeClass('card__card-body--active');
    },

    onAfterChange: function () {
      $('.slick-active').next().addClass('card__card-body--active');
    }
  });

  if ($('body').data('title') === 'student-profiles-page') {
    window.addEventListener('load', () => {
      $.ajax({
        url: `${url}/allStudents`,
        type: 'GET',
        dataType: 'json',
        success: function(itemsFromDB) {
          for (var i = 0; i < itemsFromDB.length; i++) {
            $('.student-carousel').slick('slickAdd', `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${itemsFromDB[i].name}</h5>
                <h6>@${itemsFromDB[i].username} • ${itemsFromDB[i].educator}</h6>
                <div class="img-container__crop-students mx-auto">
                    <img src="${itemsFromDB[i].pfpUrl}" alt="${itemsFromDB[i].name}'s profile picture'">
                </div>
                <h5>${itemsFromDB[i].studyField}</h5>
                <p class="card-text">${itemsFromDB[i].extra}</p>
             </div>
            </div>
            `); //slick
          }
          // appends all items to the carousel
        }, //success ends
        error: function() {
          alert('Error: Cannot GET');
        } //error ends
      }); //ajax ends
    }); //window eventlistener ENDS
  } //if bodydata ends
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
