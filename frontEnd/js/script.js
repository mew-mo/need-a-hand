
(function() {


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

console.log('script is linked'); //testing if script.js is working
console.log(sessionStorage);


// employerDASH  =============================================================


  $('#createListing').hide();
  $('#jobPost').hide();


  $('#createAd').click(function(){
    $('#createListing').show();
  });


  // POST and GET - employer dash - add a job post and display it =====================
  // ** cc to add category **
$('#addPost').click(function(){
  $('#jobPost').show();
  $('#createListing').hide();
  event.preventDefault();
  let busiName = $('#businessName').val();
  let jTitle = $('#jobTitle').val();
  let jDescription = $('#jobDescription').val();
  let userid =  sessionStorage.getItem('userID');

  console.log(userid);
  console.log(busiName, jTitle, jDescription);
  if (busiName == '' || jTitle == '' || jDescription == ''){
    alert('Please enter all details');

  } else {
    // POST METHOD - post a job post to the employer dash
    $.ajax({
      url : `${url}/addPost`,
      type : 'POST',
      data :{
        jobTitle: jTitle,
        posterName: busiName,
        jobDescription: jDescription,
        username: userid
      },
      success : function(postadded){

        console.log('post added');

        }, // success ends
      error : function(){
        console.log('error: cannot call api');
      }//error
    });//ajax post

    // GET METHOD - display all posts to the employer dash
    $.ajax({
    url:`${url}/allPosts`,
    type: 'GET',
    dataType : 'json',
    success : function(postFromMDB){
      console.log(postFromMDB);
      var i;
      var getEditBtn = document.getElementById('editPost');
      document.getElementById('jobPost').innerHTML ="";
      for (i = 0; i < postFromMDB.length; i++) {
            console.log(postFromMDB[i]);
            document.getElementById('jobPost').innerHTML +=
            `
            <div>
              <h2>${postFromMDB[i].jobTitle}</h2>
              <h4>${postFromMDB[i].posterName}</h4>
              <hr>
              <p id="postDetails">${postFromMDB[i].jobDescription}</p>
            <div>
            <div>
              <button id="editPost" data-post-id="${postFromMDB[i]._id}" name="productButton" type="submit" class="btn btn-primary mx-2">Edit</button>
              <br>
              <br>
              <button id="deletePost" name="productButton" type="submit" class="btn btn-primary mx-2">Delete</button>
            </div>
            `;

          } // for loop one ends

     }, //end of success
     error:function(){
      }
    });//ajax get
  }//else
});//add post


// PATCH - employer dash - update job post  ============================================

$('#editPost').click(function(){
  alert('edit button clicked');
});//edit post btn
  // event.preventDefault();
  //
  // // ** not sure about username **
  // let userid = sessionStorage.getItem('userID');
  //
  // // let productId = $('#productId').val();
  // let jobTitle = $('#jobTitle').val();
  // // let posterName = $('#inputidUpdate').val();
  // let jobDescription = $('#jobDescription').val();
  //
  // console.log(jobTitle, posterName, jobDescription, username, userid);
  // if ( jobTitle == '' || posterName == '' || jobDescription == ''){
  //   alert('Please enter post update information');
  // } else {
  //   $.ajax({
  //     url: `${url}/updatePost/:id`,
  //     type: 'PATCH',
  //     data:{
  //       jobTitle: jobTitle,
  //       // posterName: posterName,
  //       jobDescription: jobDescription,
  //       // ** does this need to be added to models/employer
  //       username_id: userid
  //     },
  //     success: function(data){
  //       console.log(data);
  //       if(data == '401 error: user has no permission to update'){
  //         alert('401 error: user has no permission to update');
  //
  //       } else {
  //         alert('updated');
  //       }//else
  //       // ** NEED TO UPDATE THE IDS **
  //       $('#jobTitle').val('');
  //       $('#jobDescription').val('');
  //
  //     }, //success
  //     error: function(){
  //       console.log('error:cannot call api');
  //     }//error
  //   })//ajax
  // }//if
//
// working ver below, had to comment out for now--

  // console.log(jobTitle, posterName, jobDescription, username, userid);
  // if ( jobTitle == '' || posterName == '' || jobDescription == ''){
  //   alert('Please enter post update information');
  // } else {
  //   $.ajax({
  //     url: `${url}/updatePost/:id`,
  //     type: 'PATCH',
  //     data:{
  //       jobTitle: jobTitle,
  //       posterName: posterName,
  //       jobDescription: jobDescription,
  //       // ** does this need to be added to models/employer
  //       username_id: userid
  //     },
  //     success: function(data){
  //       console.log(data);
  //       if(data == '401 error: user has no permission to update'){
  //         alert('401 error: user has no permission to update');
  //
  //       } else {
  //         alert('updated');
  //       }//else
  //       // ** NEED TO UPDATE THE IDS **
  //       $('#inputidUpdate').val('');
  //       $('#inputidUpdate').val('');
  //       $('#inputidUpdate').val('');
  //
  //     }, //success
  //     error: function(){
  //       console.log('error:cannot call api');
  //     }//error
  //   });//ajax
  // }//if

  // GET - student to view job posts =================================================

  // ** click function id needs to be linked to when student registers / logs in / clicks 'dashboard button' **
  studentDash = () => {

    console.log(url);
    // $('#homePage').hide();
    // $('#adminPage').hide();
    // $('#result').show();
    $.ajax({
      url:`${url}/allPosts`,
      type: 'GET',
      dataType : 'json',
      // ** postFromMDB may need a different name as it may conflict with the above **
      success : function(postFromMDB){
        console.log(postFromMDB);
        var i;
        // ** add id for div where you want data to display **
        document.getElementById('sdJobPost').innerHTML ="";
        for (i = 0; i < postFromMDB.length; i++) {
              console.log(postFromMDB[i]);
              document.getElementById('sdJobPost').innerHTML +=
              `
              <h2>${postFromMDB[i].jobTitle}</h2>
              <h4>${postFromMDB[i].posterName}</h4>
              <hr>
              <p id="postDetails">${postFromMDB[i].jobDescription}</p>
              <button id="commentOn" name="commentButton" type="submit" class="btn btn-primary mx-2">Comment</button>
              `;
            } // for loop one ends
      },
      error:function(){

      }
    });//ajax

}; //end of studentDash function


  // student profile page  =====================================================

  // there should be a way to do it by running an if statement comparing the session storage property "userID" with the product ID (productsFromMongo.user_id) and then only showing the products which match, if that makes sense



  //   let name = $('#a-name').val();
  //   let price = $('#a-price').val();
  //   let image_url = $('#a-imageurl').val();
  //   let userid =  sessionStorage.getItem('userID');

  //   console.log(userid);
  //   console.log(name,price, image_url);
  //   if (userid == ){
  //     alert('Please enter all details');
  // username: userid

  studentProf = () => {

    console.log(url);
    $.ajax({
      url:`${url}/allPosts`,
      type: 'GET',
      dataType : 'json',
      // ** postFromMDB may need a different name as it may conflict with the above **
      success : function(postFromMDB){
        console.log(postFromMDB);
        var i;
        // ** add id for div where you want data to display **
        document.getElementById('sdJobPost').innerHTML ="";
        for (i = 0; i < postFromMDB.length; i++) {
              console.log(postFromMDB[i]);
              document.getElementById('sdJobPost').innerHTML +=
              `
              <h2>${postFromMDB[i].jobTitle}</h2>
              <h4>${postFromMDB[i].posterName}</h4>
              <hr>
              <p id="postDetails">${postFromMDB[i].jobDescription}</p>
              <button id="commentOn" name="commentButton" type="submit" class="btn btn-primary mx-2">Comment</button>
              `;
            } // for loop one ends
      },
      error:function(){

      }
    });//ajax

}; //end of studentDash function

  // POST - student registration  =====================================================

  $('#XXXCREATE-ACC-BTN-STUDENT').click(function() {
    event.preventDefault();//this prevents code breaking when no data is found
    let sName = $('#name-INPUT').val();
    let sUsername = $('#username-INPUT').val();
    let sEmail = $('#email-INPUT').val();
    let sPassword = $('#password-INPUT').val();
    let sCheckPass = $('#check-password-INPUT').val();
    let sPfpUrl = $('#pfp-INPUT').val();
    let sStudy = $('#study-INPUT').val();
    let sEducator = $('#educator-INPUT').val();
    let sExtra = $('#extra-INPUT').val();

    console.log(sName, sUsername, sEmail, sPassword, sStudyField, sEducator, sExtra);

    if (sPassword != sCheckPass) {
      $('#check-password-INPUT').val('');
      alert('Passwords do not match. Please try again');
    } else if (sName == '' || sUsername == '' || sEmail == '' || sPassword == '' || sCheckPass == '' || sStudy == '' || sEducator == '') {

      alert('Please enter all student details');
    } else {
      $.ajax({
        url: `${url}/registerStudent`,
        type : 'POST',
        data : {
          name: sName,
          username: sUsername,
          email: sEmail,
          password: sPassword,
          // pfpUrl: req.body.pfpUrl,
          studyField: sStudyField,
          educator: sEducator,
          extra: sExtra
        },
        success:function(user) {
          sessionStorage.setItem('userID', user._id);
          sessionStorage.setItem('userFullName', user.name);
          sessionStorage.setItem('username', user.username);
          sessionStorage.setItem('userEmail', user.email);
          sessionStorage.setItem('userPass', user.password);
          console.log(sessionStorage);
          console.log(user); //remove when development is finished
          if (user !== 'username taken already. Please try another name') {
            alert('You have been registered!');
            window.location.href = "studentDash.html";
          } else {
            alert('Username taken already. Please try another name');
            // ********** change ids *******
            $('#username').val('');
            $('#user-email').val('');
            $('#password').val('');

          } //else
        }, //success
        error:function() {
          console.log('error: cannot call api');
        }//error
      });//ajax post
    }//if
  });//#XXXCREATE-ACC-BTN-STUDENT

  // student registration ENDS

  // POST - employer registration  =====================================================

  // $('#').click(function() {
  //   event.preventDefault();//this prevents code breaking when no data is found
  //   let eName = $('#name').val();
  //   let eUsername = $('#username').val();
  //   let eEmail = $('#user-email').val();
  //   let ePassword = $('#password').val();
  //   let eCheckPass = $('#check-password-INPUT').val();
  //   let ePfpUrl = $('#profile-INPUT').val();
  //   let eWorkField = $('#r-name').val();
  //   let eCompanyName = $('#company-name').val();
  //   let eExtra = $('#r-extra').val();
  //
  //   console.log(eName, eUsername, eEmail, ePassword, eWorkField, eCompanyName, eExtra);
  //
  //   if (ePassword != eCheckPass) {
  //     $('#check-password-INPUT').val('');
  //     alert('Passwords do not match. Please try again');
  //   } else if (eName == '' || eUsername == '' || eEmail == '' || ePassword == '' || eCheckPass == '' || eWorkField == '' || eCompanyName == '') {
  //     alert('Please enter all employer details');
  //   } else {
  //     $.ajax({
  //       url: `${url}/registerEmployer`,
  //       type : 'POST',
  //       data : {
  //         name: eName,
  //         username: eUsername,
  //         email: eEmail,
  //         password: ePassword,
  //         // pfpUrl: ePfpUrl,
  //         workField: eWorkField,
  //         companyName: eCompanyName,
  //         extra: eExtra
  //       },
  //       success:function(user){
  //         sessionStorage.setItem('userID', user._id);
  //         sessionStorage.setItem('userFullName', user.name);
  //         sessionStorage.setItem('username', user.username);
  //         sessionStorage.setItem('userEmail', user.email);
  //         sessionStorage.setItem('userPass', user.password);
  //         console.log(sessionStorage);
  //         console.log(user); //remove when development is finished
  //         if (user !== 'username taken already. Please try another name'){
  //           alert('You have been registered!');
  //           window.location.href = "employerDash.html";
  //         } else {
  //           console.log('username taken already. Please try another name');
  //           // ********** change ids *******
  //           $('#username').val('');
  //           $('#user-email').val('');
  //           $('#password').val('');
  //         } //else
  //
  //       }, //success
  //       error:function(){
  //         console.log('error: cannot call api');
  //       }//error
  //     });//ajax post
  //   }//if
  // });//#XXXCREATE-ACC-BTN-EMPLOIYER
  // // employer registration ENDS

  // POST - login (and logout) =====================================================

    // will only run if the login submit is on the page
    if (document.querySelector('#loginSubmit')) {

      document.querySelector('#loginSubmit').addEventListener('click', () => {
        event.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();

        if (username === '' || password === '') {
          alert('Please enter all of your details.');
        } else {
          $.ajax({
            url: `${url}/loginStudent`,
            type: 'POST',
            data: {
              username: username,
              password: password
            },
            success: function(user) {
              if (user == 'User not found. Please register') {
                // if the user isn't found as a student, check if it is an employer account instead
                checkEmployer();
              } else if (user == 'Not authorized') {
                alert('Please try again with correct details.');
                $('#username').val('');
                // field where they type the username
                $('#password').val('');
                // field where they type the password
              } else {
                // session storage
                sessionStorage.setItem('userID', user._id);
                sessionStorage.setItem('userName', user.username);
                sessionStorage.setItem('userEmail', user.email);
                sessionStorage.setItem('userPass', user.password);
                window.location.href = "studentDash.html";
              } //else
            } //success
          }); //ajax ends
        } // else ends
      }, false);
      // login click ENDS

      // check if the person trying to login is an employer
      checkEmployer = () => {
        console.log('running employer checker!');
        event.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();
        if (username === '' || password === '') {
          alert('Please enter all of your details.');
        } else {
          $.ajax({
            url: `${url}/loginEmployer`,
            type: 'POST',
            data: {
              username: username,
              password: password
            },
            success: function(user) {
              if (user == 'User not found. Please register') {
                // if not found as a student or an employer, alerts that the user does not exist
                alert('User not found: Please register as a new user or enter the correct details.');
              } else if (user == 'Not authorized') {
                alert('Please try again with correct details.');
                $('#username').val('');
                // field where they type the username
                $('#password').val('');
                // field where they type the password
              } else {
                // session storage
                sessionStorage.setItem('userID', user._id);
                sessionStorage.setItem('userName', user.username);
                sessionStorage.setItem('userEmail', user.email);
                sessionStorage.setItem('userPass', user.password);
                window.location.href = "employerDash.html";
              } //else
            } //success
          }); //ajax ends
        } // else ends
      };
    } //if login btn exists ENDS

    // checks if logout btn is present on document before running code
    if (document.querySelector('#logoutSubmit')) {
      document.querySelector('#logoutSubmit').adaddEventListener('click', () => {
        sessionStorage.clear();
        alert('You have been logged out.');
        window.location.href = 'index.html';
      }, false);
    } // if logout btn exists ENDS

  // login and logout ENDS

  // PATCH - student profile - update student profile details ===========================

  $('#updateSTUDENTPROFILE').click(function(){

    event.preventDefault();

    // ** not sure about username **
    let userid = sessionStorage.getItem('userID');

    // let productId = $('#productId').val();
    let sName = $('#name').val();
    let sUsername = $('#username').val();
    let sEmail = $('#user-email').val();
    let ePassword = $('#password').val();
    // let ePfpUrl = $('#profile-INPUT').val();
    let eWorkField = $('#r-name').val();
    let eCompanyName = $('#company-name').val();
    let eExtra = $('#r-extra').val();

    console.log(name, studyField, educator, extra, userid);
    if ( name == '' || studyField == '' || educator == '' || extra == ''){
      alert('Please enter profile update information');
    } else {
      $.ajax({
        url: `${url}/updateStudent/:id`,
        type: 'PATCH',
        data:{
          name: name,
          studyField: studyField,
          educator: educator,
          extra: extra,
          // ** does this need to be added to models/employer
          username_id: userid
        },
        success: function(data){
          console.log(data);
          if(data == '401 error: user has no permission to update'){
            alert('401 error: user has no permission to update');

          } else {
            alert('updated');
          }//else
          // ** NEED TO UPDATE THE IDS **
          $('#inputidUpdate').val('');
          $('#inputidUpdate').val('');
          $('#inputidUpdate').val('');
          $('#inputidUpdate').val('');


        }, //success
        error: function(){
          console.log('error:cannot call api');
        }//error
      });//ajax
    }//if
  });//updateJOBPOSTXXXX



// once create job post has been created and 'job post advert' clicked - data is called

  // $('#updateProduct').click(function(){
  //   $('#createListing').hide();
  //   $('#jobPost').show();
  //   console.log(url);
  //
  //     fetch(url)
  //
  //      .then(function(response) {
  //        console.log(response);
  //        return response.json();
  //      }) // end of then one
  //
  //      .then(function(data) {
  //        console.log(data);
  //      }) // end of then two
  //
  // }); //end of createListing click function.


// cc above ====================================================================



// $('#login').click(function(){
//   $('#loginForm').show();
//   $('#registerForm').hide();
// })

  // (function ($) {
  //   $(function () {
  //
  //     class Vacantions {
  //       constructor() {
  //         this.slider = $('.js-vacancy_list');
  //       }
  //
  //       initializeSlider() {
  //         var $this = this;
  //
  //         // On init event
  //         $this.slider.on('init', function (event) {
  //           var prevVacantions = $(event.target).find('.js-vacancy_item.slick-active').first().prev().length;
  //           var nextVacantions = $(event.target).find('.js-vacancy_item.slick-active').last().next().length;
  //
  //           (!prevVacantions) ? $('.js-ag-vacancy_arrow.js-ag-vacancy_arrow__prev').addClass('js-ag-vacancy_arrow__hide') : $('.js-ag-vacancy_arrow.js-ag-vacancy_arrow__prev').removeClass('js-ag-vacancy_arrow__hide');
  //           (!nextVacantions) ? $('.js-ag-vacancy_arrow.js-ag-vacancy_arrow__next').addClass('js-ag-vacancy_arrow__hide') : $('.js-ag-vacancy_arrow.js-ag-vacancy_arrow__next').removeClass('js-ag-vacancy_arrow__hide');
  //         });
  //
  //         $this.slider.slick({
  //           infinite: false,
  //           slidesToShow: 2,
  //           variableWidth: true,
  //           rows: false,
  //           arrows: true,
  //           adaptiveHeight: true,
  //           prevArrow: $('.js-ag-vacancy_arrow__prev'),
  //           nextArrow: $('.js-ag-vacancy_arrow__next'),
  //           responsive: [
  //             {
  //               breakpoint: 1200,
  //               settings: {
  //                 slidesToShow: 1,
  //               }
  //             },
  //             {
  //               breakpoint: 768,
  //               settings: {
  //                 slidesToShow: 2,
  //               }
  //             },
  //             {
  //               breakpoint: 600,
  //               settings: {
  //                 slidesToShow: 1,
  //               }
  //             }
  //           ]
  //         });
  //
  //         // On swipe event
  //         $this.slider.on('swipe afterChange', function (event) {
  //           var prevVacantions = $(event.target).find('.js-vacancy_item.slick-active').first().prev().length;
  //           var nextVacantions = $(event.target).find('.js-vacancy_item.slick-active').last().next().length;
  //
  //           (!prevVacantions) ? $('.js-ag-vacancy_arrow.js-ag-vacancy_arrow__prev').addClass('js-ag-vacancy_arrow__hide') : $('.js-ag-vacancy_arrow.js-ag-vacancy_arrow__prev').removeClass('js-ag-vacancy_arrow__hide');
  //           (!nextVacantions) ? $('.js-ag-vacancy_arrow.js-ag-vacancy_arrow__next').addClass('js-ag-vacancy_arrow__hide') : $('.js-ag-vacancy_arrow.js-ag-vacancy_arrow__next').removeClass('js-ag-vacancy_arrow__hide');
  //         });
  //       }
  //
  //       init() {
  //         this.initializeSlider();
  //       }
  //     }
  //
  //     var vacantions = new Vacantions();
  //     vacantions.init();
  //
  //
  //   });
  // })(jQuery);

  // student profiles JS------------------------------

  // ICON NAV STARTS ------------------------------

  // checking if the icon exists in a page
  if (document.querySelector('.nav__popover')) {
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
        // nav will close if you click anywhere outside of the icon
      }
    }, false);
  }

  // ICON NAV ENDS ------------------------------

  if ($('body').data('title') === 'student-profiles-page') {

    $('.student-carousel').slick({
      arrows: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: '<div class="slick-prev"></div>',
      nextArrow: '<div class="slick-next"></div>',
    });

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
}()); //iife ENDS
