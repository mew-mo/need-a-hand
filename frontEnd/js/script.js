(function() {

  // declaring url
  let url;
  // declaring where the user's uploaded image url will sit
  var uploadedImg = {
    url: ''
  };
  // starting the server
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

  convertImg = () => {
    // checks if the files exist before running
    if (document.querySelector('#userIcon').files && document.querySelector('#userIcon').files[0]) {
      var reader = new FileReader();
      var file = document.querySelector('#userIcon').files[0];
      // creates a filereader

      // read the data as a url for the file-
      reader.readAsDataURL(file);

      // when the filereader loads, generate the url of the target (user img)
      reader.addEventListener('load', (e) => {
        uploadedImg.url = e.target.result;
        console.log(uploadedImg.url);
      });
    }
  }; //convertimg ENDS

  // calls image conversion once user has selected an image- important so user can change the image before registering fully
  if (document.querySelector('#userIcon')) {
    document.querySelector('#userIcon').addEventListener('change', convertImg);
  }

  $('#studentRegSubmit').click(function() {

    // might have to make it so the max file size uploaded is something small like 200x200 just so the url string isnt so insanely long

    event.preventDefault();//this prevents code breaking when no data is found
    let sName = $('#sName').val();
    let sUsername = $('#sUsername').val();
    let sEmail = $('#sEmail').val();
    let sPassword = $('#sPassword').val();
    let sCheckPass = $('#sCheckPassword').val();
    let sPfpUrl = uploadedImg.url;
    let sStudy = $('#studyField').val();
    let sEducator = $('#educatorName').val();
    let sExtra = $('#sExtra').val();

    console.log(sName, sUsername, sEmail, sPassword, sStudy, sEducator, sExtra);

    if (sPassword != sCheckPass) {
      $('#sCheckPassword').val('');
      alert('Passwords do not match. Please try again');
    } else if (sName == '' || sUsername == '' || sEmail == '' || sPassword == '' || sCheckPass == '' || sStudy == '' || sEducator == '') {
      alert('Please enter all student details');
    } else if (!sPfpUrl) {
      alert('Please upload an icon for the best experience on this website.');
    } else if (document.querySelector('#userIcon').files[0].size > 10000000) {
      alert('Uploaded image file size is too large. Please select an image 10mbs or less.');
    } else {
      $.ajax({
        url: `${url}/registerStudent`,
        type : 'POST',
        data : {
          name: sName,
          username: sUsername,
          email: sEmail,
          password: sPassword,
          pfpUrl: sPfpUrl,
          studyField: sStudy,
          educator: sEducator,
          extra: sExtra
        },
        success: function(user) {
          window.name = user.pfpUrl;
          sessionStorage.setItem('userID', user._id);
          sessionStorage.setItem('userName', user.name);
          sessionStorage.setItem('username', user.username);
          sessionStorage.setItem('userEmail', user.email);
          sessionStorage.setItem('userPass', user.password);
          sessionStorage.setItem('accType', 'student');
          console.log(sessionStorage);
          console.log(user); //remove when development is finished
          if (user !== 'username taken already. Please try another name') {
            alert('You have been registered!');
            window.location.href = "studentDash.html";
          } else {
            alert('Username taken already. Please try another name');
            $('#sUsername').val('');
            $('#sPassword').val('');
          } //else
        }, //success
        error: function() {
          alert('Error: Cannot call API');
        }//error
      });//ajax post
    }//if
  });// registration ends

  // student registration ENDS

  // POST - employer registration  =====================================================

  $('#employerRegSubmit').click(function() {
    event.preventDefault();//this prevents code breaking when no data is found
    let eName = $('#eName').val();
    let eUsername = $('#eUsername').val();
    let eEmail = $('#eEmail').val();
    let ePassword = $('#ePassword').val();
    let eCheckPass = $('#eCheckPassword').val();
    let ePfpUrl = uploadedImg.url;
    let eWorkField = $('#jobTitle').val();
    let eCompanyName = $('#company-name').val();
    let eExtra = $('#companyName').val();

    console.log(eName, eUsername, eEmail, ePassword, eWorkField, eCompanyName, eExtra);

    if (ePassword != eCheckPass) {
      $('#eCheckPassword').val('');
      alert('Passwords do not match. Please try again');
    } else if (eName == '' || eUsername == '' || eEmail == '' || ePassword == '' || eCheckPass == '' || eWorkField == '' || eCompanyName == '') {
      alert('Please enter all employer details');
    } else if (!ePfpUrl) {
      alert('Please upload an icon for the best experience on this website.');
    } else if (document.querySelector('#userIcon').files[0].size > 10000000) {
      alert('Uploaded image file size is too large. Please select an image 10mbs or less.');
    } else {
      $.ajax({
        url: `${url}/registerEmployer`,
        type : 'POST',
        data : {
          name: eName,
          username: eUsername,
          email: eEmail,
          password: ePassword,
          pfpUrl: ePfpUrl,
          workField: eWorkField,
          companyName: eCompanyName,
          extra: eExtra
        },
        success:function(user) {
          window.name = user.pfpUrl;
          sessionStorage.setItem('userID', user._id);
          sessionStorage.setItem('userFullName', user.name);
          sessionStorage.setItem('username', user.username);
          sessionStorage.setItem('userEmail', user.email);
          sessionStorage.setItem('userPass', user.password);
          sessionStorage.setItem('accType', 'employer');

          console.log(sessionStorage);
          console.log(user); //remove when development is finished
          if (user !== 'username taken already. Please try another name'){
            alert('You have been registered!');
            window.location.href = "employerDash.html";
          } else {
            console.log('Username taken already. Please try another name');
            $('#eUsername').val('');
            $('#ePassword').val('');
          } //else
        }, //success
        error: function() {
          alert('Error: cannot call API');
        }//error
      });//ajax post
    }//if
  });//#XXXCREATE-ACC-BTN-EMPLOIYER
  // employer registration ENDS

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
                window.name = user.pfpUrl;
                sessionStorage.setItem('userID', user._id);
                sessionStorage.setItem('userName', user.username);
                sessionStorage.setItem('userEmail', user.email);
                sessionStorage.setItem('userPass', user.password);
                sessionStorage.setItem('accType', 'student');
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
                window.name = user.pfpUrl;
                sessionStorage.setItem('userID', user._id);
                sessionStorage.setItem('userName', user.username);
                sessionStorage.setItem('iconImg', user.pfpUrl);
                sessionStorage.setItem('userEmail', user.email);
                sessionStorage.setItem('userPass', user.password);
                sessionStorage.setItem('accType', 'employer');
                window.location.href = "employerDash.html";
              } //else
            } //success
          }); //ajax ends
        } // else ends
      };
    } //if login btn exists ENDS

    // checks if logout btn is present on document before running code
    if (document.querySelector('#logoutSubmit')) {
      document.querySelector('#logoutSubmit').addEventListener('click', () => {
        logOut();
      }, false);
    } // if logout btn exists ENDS

    // checks if second logout btn is present on document before running code
    if (document.querySelector('#logOut')) {
      document.querySelector('#logOut').addEventListener('click', () => {
        logOut();
      }, false);
    } // if second logout btn exists ENDS

    // logout function
    logOut = () => {
      sessionStorage.clear();
      window.name = '';
      alert('You have been logged out.');
      window.location.href = 'index.html';
    };
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

  // CONDITIONAL DASHBOARD LINKS  STARTS
  // ==================================================

  changeDashLink = (page) => {
    if (document.querySelector('#dashLink')) {
      document.querySelector('#dashLink').href = page;
    }
  };

  if (sessionStorage.accType == 'student') {
    changeDashLink('studentDash.html');
  } else if (sessionStorage.accType === 'employer') {
    changeDashLink('employerDash.html');
  }
  // conditional dashboard links ENDS ------------------------------

  // CONDITIONAL HOME NAV STARTS
  // ==================================================

    // checking if the session storage has content and the page is home (has conditional nav)
    if (sessionStorage.length != 0 && document.querySelector('#loggedInNav')) {
      document.querySelector('#loggedInNav').style.display = 'block';
      document.querySelector('#homeNav').style.display = 'none';
    } else if (sessionStorage.length == 0 && document.querySelector('#loggedInNav')) {
      // hide nav if the session storage doesnt have content and user is on homepage
      document.querySelector('#loggedInNav').style.display = 'none';
      document.querySelector('#homeNav').style.display = 'flex';
    }

  // conditional home nav ENDS ------------------------------

  // ICON NAV STARTS
  // ==================================================

  if (sessionStorage.length != 0 && document.querySelector('#icon')) {
    document.querySelector('#icon').innerHTML = `<img src="${window.name}" alt="@${sessionStorage.userName}'s icon'">`;
  } //NOTE : need to have err prevention if user doesnt have an icon

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

  // STUDENT PROFILES JS STARTS
  // ==================================================

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
