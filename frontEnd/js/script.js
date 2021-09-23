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
      alert(error);
    }
  });

// **remove after testing**
  $('#createListing').hide();
  $('#jobPost').hide();
  $('#emjobPost').hide();


// EMPLOYER DASH - GET - DISPLAY ALL JOB AD POSTS  =============================================================

  // checking if the employer post section is present on the page
  if (document.querySelector('#emjobPostSec')) {
    window.addEventListener('load', () => {
      setTimeout(function() {
        $.ajax({
        url:`${url}/allPosts`,
        type: 'GET',
        dataType : 'json',
        success : function(postFromMDB){
          var i;
          var getEditBtn = document.getElementById('editPost');
          document.getElementById('emjobPostSec').innerHTML ="";
          for (i = 0; i < postFromMDB.length; i++) {
            let commentElements = [];
              if (postFromMDB[i].comments !== null) {

                let commentList = postFromMDB[i].comments;

                  for(x = 1; x < commentList.length; x++) {

                  commentElements += `<li>${commentList[x]}</li>`; }
                }

                document.getElementById('emjobPostSec').innerHTML +=
                `
                <div>
                  <div id="emjobPost" class="text-light mt-4 py-4 px-4">
                    <div class="text-light mt-4 py-4 px-4">
                    <h2 id="postTitle">${postFromMDB[i].jobTitle}</h2>
                    <h4 id="posterName">${postFromMDB[i].posterName}</h4>
                    <hr>
                    <p id="postDetails">${postFromMDB[i].jobDescription}</p>
                  <div>

                  <div>

                    <span id="editPostBtn" data-edit-id="${postFromMDB[i]._id}" class="material-icons-outlined edit-button">edit</span>
                    <span id="deletePostBtn" data-delete-id="${postFromMDB[i]._id}" class="material-icons-outlined delete-button">delete</span>
                    <span id="commentPostBtn" class="md-icon material-icons-outlined icon__comment comment-button">comment</span>

                    <span id="titleUpdate">${postFromMDB[i].jobTitle}</span>
                    <span id="detailsUpdate">${postFromMDB[i].jobDescription}
                    </span>

                  </div>

                  <div id="commentSection">
                  <span class="span__open-comments" style="display:none;">false</span>
                  <p class="commentBox" data-id="${postFromMDB[i]._id}">${commentElements}</p>
                    <br><b>Post comment</b><br><br>
                    <input type="text" class="form-control rounded-pill input__comment" name="comment" placeholder="Leave a comment here" data-id="${postFromMDB[i]._id}">
                    <button type="button" name="button" class="btn btn-primary btn-md mr-3 rounded-pill commented" data-id="${postFromMDB[i]._id}">Comment</button>
                  </div>

                </div>
                ` ;
              } // for loop one ends
            }, //end of success
          error:function(){
            alert('Error: Cannot connect to API');
          }
        });//ajax get
      }, 500);
    });
  } // if


  // POST EMPLOYER POST
  // ======================================================

  $('#createAd').click(function(){
    $('#createPostModal').modal('show');

    $('.update-modal__update-btn--create').click(function(){

      event.preventDefault();

      let posterName = `${sessionStorage.userFullName} | <span class="link__email">@${sessionStorage.username}</span>`;
      let jTitle = $('#createTitle').val() + ` | ${sessionStorage.userCompany}`;
      let jDescription = $('#createDesc').val();
      let userid =  sessionStorage.getItem('userID');

      if (posterName == '' || jTitle == '' || jDescription == ''){
        alert('Please enter all details to post a job ad, thank you!');

      } else {
        // POST METHOD - post a job post to the employer dash
        $.ajax({
          url : `${url}/addPost`,
          type : 'POST',
          data : {
            jobTitle: jTitle,
            posterName: posterName,
            jobDescription: jDescription,
            username: userid
          },
          success : function(postadded){
            alert('Your ad has been posted!');
            // page reloads
            location.reload();
            }, // success ends
          error : function(){
            alert('Error: Cannot connect to API');
          }//error
        });//ajax post
      }//else
    });//add post using createModal
  }); //createAd click function ends


// Cancel create employer post click function

  $('.update-modal__cancel-btn--create').click(function() {
    $('#createPostModal').hide();
    // page reloads
    location.reload();
  });

  // EMPLOYER POST - comment section
  // ======================================================

  // function for hiding and showing each comment section
  if (document.querySelector('#emjobPostSec')) {
    window.addEventListener('click', (e) => {
      if (e.target.innerText == 'comment' && e.target.parentNode.parentNode.childNodes[3].children[0].innerHTML == 'false') {
        e.target.parentNode.parentNode.childNodes[3].style.display = 'block';
        e.target.parentNode.parentNode.childNodes[3].children[0].innerHTML = 'true';
      } else if (e.target.innerText == 'comment' && e.target.parentNode.parentNode.childNodes[3].children[0].innerHTML == 'true') {
        e.target.parentNode.parentNode.childNodes[3].style.display = 'none';
        e.target.parentNode.parentNode.childNodes[3].children[0].innerHTML = 'false';
      }
    }, false); //event listener ends


  } // if em job post section exists ends

  $(document).on('click', '.commented', function(event) {
    event.preventDefault();
    let postID = this.dataset.id;

    let userComment = `<hr><p style="font-size:20px;">${sessionStorage.userFullName} | <span class="link__email">@${sessionStorage.username}</span></p>` + $("input[data-id='" + postID +"']").val();

      if (userComment == ''){
        alert('Please enter a comment');
      } else {
        $.ajax({
          url: `${url}/postComment/${postID}`,
          type: 'PATCH',
          data:{
            comment: userComment
          },
          success: function(data){
            if(data == '401 error: user has no permission to update') {
              alert('401 error: user has no permission to');
            } //else
            $("input[data-id='" + postID +"']").val('');
            // page reloads
            location.reload();
          }, //success
          error: function(){
            alert('error:cannot call api');
          }//error
        });//ajax
      }//if
  }); //end of commented click event function

// PATCH - employer dash - update job post  ============================================

// click edit button to display input fields
// input fields will call api data already

  window.addEventListener('click', (e) => {
    if (e.target.innerHTML === 'edit') {
      $('#updateTitle').val(e.target.parentNode.children[3].innerText.split('|')[0]);
      // splits so it only returns the title and not the company name in the input field
      $('#updateDesc').val(e.target.parentNode.children[4].innerText);
    }

  // click edit and modal shows
    $(document).on('click', '.edit-button', function(event) {

      var editId = $(this).attr("data-edit-id");

      $('#updatePostModal').modal('show');

      $('.update-modal__update-btn--post').click(function(){

        event.preventDefault();

        let userid = sessionStorage.getItem('userID');
        let jobTitle = $('#updateTitle').val() + ` | ${sessionStorage.companyName}`;
        let jobDescription = $('#updateDesc').val();
        let posterName = `${sessionStorage.userFullName} | <span class="link__email">@${sessionStorage.username}</span>`;

        $.ajax({
          url: `${url}/updatePost/${editId}`,
          type: 'PATCH',
          data: {
            jobTitle: jobTitle,
            jobDescription: jobDescription,
            posterName: posterName,
            user_id: userid
          },
          success: function(data){
            if(data == '401 error: user has no permission to update'){
              alert('401 error: user has no permission to update');
            } else {
              alert('Your post has been updated.');
            }//else
            // page reloads
            location.reload();
          }, //success
          error: function() {
            alert('Error: Cannot connect to API');
          }//error
        });//ajax
      }); //end of modal save changes button
    }); // end of onclick
  }, false);

  $('.update-modal__cancel-btn--post').click(function(){
    $('#updatePostModal').hide();
    // page reloads
    location.reload();
  });

  // GET - student to view job posts
  // =========================================================

  // checking if the student job post section is present on the page
  if (document.querySelector('#studentJobPosts')) {
    window.addEventListener('load', () => {
      setTimeout(function() {
        $.ajax({
          url:`${url}/allPosts`,
          type: 'GET',
          dataType : 'json',

          success : function(postFromMDB){
            var i;

            document.getElementById('studentJobPosts').innerHTML ="";

            for (i = 0; i < postFromMDB.length; i++) {
              let commentElements = [];
              if (postFromMDB[i].comments !== null) {
                let commentList = postFromMDB[i].comments;
                for(x = 1; x < commentList.length; x++) {
                  commentElements += `<li>${commentList[x]}</li>`; }
                }

              document.getElementById('studentJobPosts').innerHTML +=
                `
                <div id="sdjobPost" class="text-light mt-4 py-4 px-4">
                  <div class="post__content">
                    <h2>${postFromMDB[i].jobTitle}</h2>
                    <h4>${postFromMDB[i].posterName}</h4>
                    <span class="md-icon material-icons-outlined icon__bookmark--blank bookmark-button">
                      bookmark_border
                    </span>
                    <hr>
                    <p id="postDetails">${postFromMDB[i].jobDescription}</p>
                    <span data-id="${postFromMDB[i]._id}" class="md-icon material-icons-outlined icon__comment comment-button sd-comments">
                      comment
                    </span>

                    <div id="sdCommentSection" style="display:none;">
                    <span class="span__open-comments" style="display:none;">false</span>
                      <ul class="commentBox" data-id="${postFromMDB[i]._id}"> ${commentElements} </ul>
                      <br><b>Post comment</b><br><br>
                      <input type="text" class="form-control rounded-pill input__comment" name="comment" placeholder="Leave a comment here" data-id="${postFromMDB[i]._id}">
                      <button type="button" name="button" class="btn btn-primary btn-md mr-3 rounded-pill commented sd-comment-btn" data-id="${postFromMDB[i]._id}">Comment</button>
                    </div>

                    </div>

                  </div>
                </div>
                `;
              } // for loop one ends
            },
            error:function(){
              alert('Error: Cannot call API');
            }
        });//ajax
      }, 500);

    });
  }


  // STUDENT POST - comment section
  // ======================================================

    // function for hiding and showing each comment section
    if (document.querySelector('#studentJobPosts')) {
      window.addEventListener('click', (e) => {
        if (e.target.innerText == 'comment' && e.target.parentNode.children[6].children[0].innerHTML == 'false') {
          e.target.parentNode.children[6].style.display = 'block';
          e.target.parentNode.children[6].children[0].innerHTML = 'true';
        } else if (e.target.innerText == 'comment' && e.target.parentNode.children[6].children[0].innerHTML == 'true') {
          e.target.parentNode.children[6].style.display = 'none';
          e.target.parentNode.children[6].children[0].innerHTML = 'false';
        }
      }, false); //event listener ends

      $(document).on('click', '.sd-comment-btn', function(event) {
        event.preventDefault();

        let postID = this.dataset.id;

        let userComment = `<hr><p style="font-size:20px;">${sessionStorage.userFullName} | <span class="link__email">@${sessionStorage.username}</span></p>` + $("input[data-id='" + postID +"']").val();

        if ( userComment == ''){
          alert('Please enter a comment');
        } else {
          $.ajax({
            url: `${url}/postComment/${postID}`,
            type: 'PATCH',
            data:{
            comment: userComment },
            success: function(data){
                if(data == '401 error: user has no permission to update') {
                  alert('401 error: user has no permission to');
                }
          $("input[data-id='" + postID +"']").val('');
          // page reloads
          location.reload();
          }, //success
            error: function(){
              alert('Error: Cannot call API'); }//error
          });//ajax
        }//if
      }); //end of click changes
    } // if student job post section exists ends


// DELETE - employer dashboard - delete a post
// ==================================================

$(document).on('click', '.delete-button', function(event) {

    event.preventDefault();
    var deleteId = $(this).attr("data-delete-id");

    $.ajax({
      url : `${url}/deletePost/${deleteId}`,
      type:'DELETE',
      data :{
        user_id : sessionStorage.userID
      },
      success : function(data){
        if (data == 'Post Deleted'){
          alert('Post Deleted');
          // page reloads
          location.reload();
          // $('#delProductId').val('');
        } else {
          alert('Invalid Post: Post may not exist');
        } //else
      }, //success
      error:function() {
        alert('Error: Cannot call API');
      }//error
    });//ajax
  });//deletePost


// POST - student registration
 // =====================================================

  convertImg = () => {
    // checks if the files exist before running
    if (document.querySelector('#userIcon').files && document.querySelector('#userIcon').files[0]) {
      // creates a filereader
      var reader = new FileReader();
      // finds the file that was uploaded
      var file = document.querySelector('#userIcon').files[0];

      // reads the file data as a url
      reader.readAsDataURL(file);

      // when the filereader loads, generate the url of the target (user img) and set that as the uploaded img url
      reader.addEventListener('load', (e) => {
        uploadedImg.url = e.target.result;
      });
    }
  }; //convertimg ENDS

  // calls image conversion once user has selected an image- important so user can change the image before registering fully
  if (document.querySelector('#userIcon')) {
    document.querySelector('#userIcon').addEventListener('change', convertImg);
  }

  $('#studentRegSubmit').click(function() {

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

    if (sPassword != sCheckPass) {
      $('#sCheckPassword').val('');
      alert('Passwords do not match. Please try again');
    } else if (sName == '' || sUsername == '' || sEmail == '' || sPassword == '' || sCheckPass == '' || sStudy == '' || sEducator == '' || sExtra == '') {
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
          // session storage is not large enough to store the profile picture url, so we store it in the window name instead
          sessionStorage.setItem('userID', user._id);
          sessionStorage.setItem('userFullName', user.name);
          sessionStorage.setItem('username', user.username);
          sessionStorage.setItem('userEmail', user.email);
          sessionStorage.setItem('userPass', user.password);
          sessionStorage.setItem('accType', 'student');
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

  // POST - employer registration
  // =====================================================

  $('#employerRegSubmit').click(function() {
    event.preventDefault();//this prevents code breaking when no data is found
    let eName = $('#eName').val();
    let eUsername = $('#eUsername').val();
    let eEmail = $('#eEmail').val();
    let ePassword = $('#ePassword').val();
    let eCheckPass = $('#eCheckPassword').val();
    let ePfpUrl = uploadedImg.url;
    let eWorkField = $('#jobTitle').val();
    let eCompanyName = $('#companyName').val();
    let eExtra = $('#eExtra').val();

    if (ePassword != eCheckPass) {
      $('#eCheckPassword').val('');
      alert('Passwords do not match. Please try again');
    } else if (eName == '' || eUsername == '' || eEmail == '' || ePassword == '' || eCheckPass == '' || eWorkField == '' || eCompanyName == '' || eExtra == '') {
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
          sessionStorage.setItem('userCompany', user.companyName);
          sessionStorage.setItem('accType', 'employer');

          if (user !== 'username taken already. Please try another name'){
            alert('You have been registered!');
            window.location.href = "employerDash.html";
          } else {
            alert('Username taken already. Please try another name');
            $('#eUsername').val('');
            $('#ePassword').val('');
          } //else
        }, //success
        error: function() {
          alert('Error: cannot call API');
        }//error
      });//ajax post
    }//if
  });// employer reg btn click
  // employer registration ENDS

  // POST - login (and logout)
  // =====================================================

  // will only run if the login submit is on the page
  if (document.querySelector('#loginSubmit')) {

    document.querySelector('#loginSubmit').addEventListener('click', () => {
      event.preventDefault();
      let username = $('#loginForm').val();
      let password = $('#passwordForm').val();

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
              $('#loginForm').val('');
              // field where they type the username
              $('#passwordForm').val('');
              // field where they type the password
            } else {
              localStorage.clear();
              // session storage
              window.name = user.pfpUrl;
              sessionStorage.setItem('userID', user._id);
              sessionStorage.setItem('userFullName', user.name);
              sessionStorage.setItem('username', user.username);
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
      event.preventDefault();
      let username = $('#loginForm').val();
      let password = $('#passwordForm').val();
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
              $('#loginForm').val('');
              // field where they type the username
              $('#passwordForm').val('');
              // field where they type the password
            } else {
              // session storage
              window.name = user.pfpUrl;
              sessionStorage.setItem('userID', user._id);
              sessionStorage.setItem('userFullName', user.name);
              sessionStorage.setItem('username', user.username);
              sessionStorage.setItem('userEmail', user.email);
              sessionStorage.setItem('userPass', user.password);
              sessionStorage.setItem('userCompany', user.companyName);
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

  // GET - CONDITIONAL USER PROFILE STARTS
  // ==================================================

  // checking if the profile exists
  if (document.querySelector('#userProfile')) {
    if (sessionStorage.accType == 'student') {

      window.addEventListener('load', () => {
        $.ajax({
          url: `${url}/getStudent/${sessionStorage.userID}`,
          type: 'GET',
          dataType: 'json',
          beforeSend: function() {
            document.querySelector('.loading__icon').style.display = 'flex';
            document.querySelector('#userProfile').style.display = 'none';
          }, // beforeSend ENDS
          complete: function() {
            document.querySelector('.loading__icon').style.display = 'none';
            document.querySelector('#userProfile').style.display = 'block';
          }, // complete
          success: function(itemsFromDB) {
            // profile content
            document.querySelector('#myName').innerHTML = `${itemsFromDB.name} | @${itemsFromDB.username}`;

            document.querySelector('#userImage').innerHTML = `<img src="${window.name}" alt="@${itemsFromDB.username}'s profile picture'">`;
            document.querySelector('#myTitle').innerHTML = `${itemsFromDB.studyField} | ${itemsFromDB.educator}`;

            document.querySelector('#myDesc').innerHTML = `${itemsFromDB.extra}
            <br><br>
            Contact me here: <span class="link__email">${itemsFromDB.email}</span>`;
            // profile content ENDS
            // modal content
            document.querySelector('.label__update-place').innerHTML = 'Educator';
            $('#updateName').val(`${itemsFromDB.name}`);
            $('#updateUsername').val(`${itemsFromDB.username}`);
            $('#updateEmail').val(`${itemsFromDB.email}`);
            $('#updateField').val(`${itemsFromDB.studyField}`);
            $('#updatePlace').val(`${itemsFromDB.educator}`);
            $('#updateExtra').val(`${itemsFromDB.extra}`);
            // modal content ENDS
          }, //success ends
          error: function() {
            alert('Error: Cannot GET');
          } //error ends
        }); //ajax ends
      }); //window load

    } else if (sessionStorage.accType == 'employer') {

      window.addEventListener('load', () => {
        $.ajax({
          url: `${url}/getEmployer/${sessionStorage.userID}`,
          type: 'GET',
          dataType: 'json',
          beforeSend: function() {
            document.querySelector('.loading__icon').style.display = 'flex';
            document.querySelector('#userProfile').style.display = 'none';
          }, // beforeSend ENDS
          complete: function() {
            document.querySelector('.loading__icon').style.display = 'none';
            document.querySelector('#userProfile').style.display = 'block';
          }, // complete
          success: function(itemsFromDB) {

            // profile
            document.querySelector('#myName').innerHTML =  `${itemsFromDB.name} | @${itemsFromDB.username}`;

            document.querySelector('#userImage').innerHTML = `<img src="${window.name}" alt="@${itemsFromDB.username}'s profile picture'">`;
            document.querySelector('#myTitle').innerHTML =   `${itemsFromDB.workField} | ${itemsFromDB.companyName}`;

            document.querySelector('#myDesc').innerHTML =  `${itemsFromDB.extra}
            <br><br>
            Contact me here: <span class="link__email">${itemsFromDB.email}</span>`;
            // profile ENDS
            // modal content
            document.querySelector('.label__update-place').innerHTML = 'Company Name';
            $('#updateName').val(`${itemsFromDB.name}`);
            $('#updateUsername').val(`${itemsFromDB.username}`);
            $('#updateEmail').val(`${itemsFromDB.email}`);
            $('#updateField').val(`${itemsFromDB.workField}`);
            $('#updatePlace').val(`${itemsFromDB.companyName}`);
            $('#updateExtra').val(`${itemsFromDB.extra}`);
            // modal content ENDS
          }, //success ends
          error: function() {
            alert('Error: Cannot GET');
          } //error ends
        }); //ajax ends
      }); //window load
    } // student employer if else ends
  } // if user profile ends
  // conditional user profile ENDS

  // PATCH - UPDATE USER PROFILE STARTS
  // ==================================================

  if (document.querySelector('.icon__edit')) {
    document.querySelector('.icon__edit').addEventListener('click', () => {
      $('#updateUserModal').modal('show');
    }, false);
    // show edit modal

    document.querySelector('.update-modal__update-btn--user').addEventListener('click', () => {

      // checking if it's a student account
      if (sessionStorage.accType == 'student') {
        event.preventDefault();

        var pass = {
          newPass: ''
        };

        let userId = sessionStorage.getItem('userID');
        let name = $('#updateName').val();
        let username = $('#updateUsername').val();
        let email = $('#updateEmail').val();
        let password = $('#updatePass').val();
        let passwordCheck = $('#checkUpdatePass').val();
        let studyField = $('#updateField').val();
        let educator = $('#updatePlace').val();
        let extra = $('#updateExtra').val();
        let pfpUrl = window.name;

        // password setting conditionals
        if (password == '') {
          pass.newPass = sessionStorage.userPass;
        } else if (password && passwordCheck == '') {
          alert('Please re-enter your new password');
        } else if (password != passwordCheck) {
          $('#checkUpdatePass').val('');
          alert('Passwords do not match. Please try again');
        } else if (password) {
          pass.newPass = password;
        }

        document.querySelector('#userIcon').addEventListener('change', () => {
          if (document.querySelector('#userIcon').files[0].size > 10000000) {
            alert('Uploaded image file size is too large. Please select an image 10mbs or less.');
          }
        });

        if (name == '' || username == '' || email == '' || studyField == '' || educator == '' || extra == '') {
          alert('Please enter all update details');
        } else if (!pfpUrl) {
          alert('Please upload an icon for the best experience on this website.');
        } else {
          $.ajax({
            url: `${url}/updateStudent/${userId}`,
            type: 'PATCH',
            data: {
              name: name,
              username: username,
              email: email,
              password: pass.newPass,
              pfpUrl: pfpUrl,
              studyField: studyField,
              educator: educator,
              extra: extra
            },
            success: function(data) {
              if (data == 'Error: Student profile not found') {
                alert('Error: Student profile not found');
              } else {
                alert('Successfully updated your details.');
                // resetting pass fields
                $('#updatePass').val('');
                $('#checkUpdatePass').val('');
                // updating the session to match your updated details
                window.name = pfpUrl;
                sessionStorage.setItem('userFullName', name);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('userPass', pass.newPass);
                $('#updateUserModal').modal('hide');
              } //else
            }, //success
            error: function() {
              alert('Error: Can\'t call API');
            } // error
          }); // ajax
        } //else

        // checking if its an employer account
      } else if (sessionStorage.accType == 'employer') {
        event.preventDefault();

        var ePass = {
          newPass: ''
        };

        let userId = sessionStorage.getItem('userID');
        let name = $('#updateName').val();
        let username = $('#updateUsername').val();
        let email = $('#updateEmail').val();
        let password = $('#updatePass').val();
        let passwordCheck = $('#checkUpdatePass').val();
        let workField = $('#updateField').val();
        let companyName = $('#updatePlace').val();
        let extra = $('#updateExtra').val();
        let pfpUrl = window.name;

        document.querySelector('#userIcon').addEventListener('change', () => {
          if (document.querySelector('#userIcon').files[0].size > 10000000) {
            alert('Uploaded image file size is too large. Please select an image 10mbs or less.');
          }
        });

        // password setting conditionals
        if (password == '') {
          ePass.newPass = sessionStorage.userPass;
        } else if (password && passwordCheck == '') {
          alert('Please re-enter your new password');
        } else if (password != passwordCheck) {
          $('#checkUpdatePass').val('');
          alert('Passwords do not match. Please try again');
        } else if (password) {
          ePass.newPass = password;
        }

        if (name == '' || username == '' || email == '' || workField == '' || companyName == '' || extra == '') {
          alert('Please enter all update details');
        } else if (!pfpUrl) {
          alert('Please upload an icon for the best experience on this website.');
        } else {
          $.ajax({
            url: `${url}/updateEmployer/${userId}`,
            type: 'PATCH',
            data: {
              name: name,
              username: username,
              email: email,
              password: ePass.newPass,
              pfpUrl: pfpUrl,
              workField: workField,
              companyName: companyName,
              extra: extra
            },
            success: function(data) {
              if (data == 'Error: Employer profile not found') {
                alert('Error: Employer profile not found');
              } else {
                alert('Successfully updated your details.');
                // resetting pass fields
                $('#updatePass').val('');
                $('#checkUpdatePass').val('');
                // updating the session to match your updated details
                sessionStorage.setItem('userFullName', name);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('userPass', ePass.newPass);
                window.name = pfpUrl;
                $('#updateUserModal').modal('hide');
              } //else
            }, //success
            error: function() {
              alert('Error: Can\'t call API');
            } // error
          }); // ajax
        } //else
      } // if employer or student ENDS
    }, false); // edit onclick ENDS

    document.querySelector('.update-modal__cancel-btn').addEventListener('click', () => {
      $('#updateUserModal').modal('hide');
    }, false);
  } // if icon edit ENDS
  // update user profile ENDS

  // CONDITIONAL DASHBOARD LINKS STARTS
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
    document.querySelector('#icon').innerHTML = `<img src="${window.name}" alt="@${sessionStorage.username}'s icon'">`;
  }

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

  // GET - STUDENT PROFILES JS STARTS
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
        beforeSend: function() {
          document.querySelector('.loading__icon').style.display = 'flex';
        }, // beforeSend ENDS
        complete: function() {
          document.querySelector('.loading__icon').style.display = 'none';
        }, // complete
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
                <p class="card-text">
                ${itemsFromDB[i].extra}
                <br><br>
                Contact: <span class="link__email">${itemsFromDB[i].email}</span>
                </p>
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
