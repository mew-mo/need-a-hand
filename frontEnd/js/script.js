
console.log('script is linked'); //testing if script.js is working
console.log(sessionStorage);


$(document).ready(function(){

// employerDASH  =============================================================


  $('#createListing').hide();
  $('#jobPost').hide();


  $('#createAd').click(function(){
    $('#createListing').show();
  });


  let url;//declare url as a variable in es6
  $.ajax({
    url: 'config.json',
    type: 'GET',
    dataType: 'json',
    success:function(configData){
      console.log(configData.SERVER_URL,configData.SERVER_PORT );
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      console.log(url);
    },
    error:function(error){
      console.log(error);
    }
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
    })//ajax post

    // GET METHOD - display all posts to the employer dash
    $.ajax({
    url:`${url}/allPosts`,
    type: 'GET',
    dataType : 'json',
    success : function(postFromMDB){
      console.log(postFromMDB);
      var i;
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
              <button id="editPost" name="productButton" type="submit" class="btn btn-primary mx-2">Edit</button>

              <button id="deletePost" name="productButton" type="submit" class="btn btn-primary mx-2">Delete</button>

            </div>
            `
          } // for loop one ends
    },
    error:function(){
    }
  })//ajax get
  }//else
});//addProduct


// PATCH - employer dash - update job post  ============================================

$('#updateJOBPOSTXXXX').click(function(){
  event.preventDefault();

  // ** not sure about username **
  let userid = sessionStorage.getItem('userID');

  // let productId = $('#productId').val();
  let jobTitle = $('#inputidUpdate').val();
  let posterName = $('#inputidUpdate').val();
  let jobDescription = $('#inputidUpdate').val();

  console.log(jobTitle, posterName, jobDescription, username, userid);
  if ( jobTitle == '' || posterName == '' || jobDescription == ''){
    alert('Please enter post update information');
  } else {
    $.ajax({
      url: `${url}/updatePost/:id`,
      type: 'PATCH',
      data:{
        jobTitle: jobTitle,
        posterName: posterName,
        jobDescription: jobDescription,
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


      }, //success
      error: function(){
        console.log('error:cannot call api');
      }//error
    })//ajax
  }//if
})//updateJOBPOSTXXXX



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
              `
            } // for loop one ends
      },
      error:function(){

      }
    })//ajax

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
              `
            } // for loop one ends
      },
      error:function(){

      }
    })//ajax

}; //end of studentDash function



  // POST - student registration  =====================================================

  $('#XXXCREATE-ACC-BTN-STUDENT').click(function(){
    event.preventDefault()//this prevents code breaking when no data is found
    let sName = $('#username-INPUT').val();
    let sUsername = $('#username-INPUT').val();
    let sEmail = $('#email-INPUT').val();
    let sPassword = $('#password-INPUT').val();
    let sPfpUrl = $('#profile-INPUT').val();
    let sStudy = $('#study-INPUT').val();
    let sEducator = $('#educator-INPUT').val();
    let sExtra = $('#extra-INPUT').val();

    console.log(sName, sUsername, sEmail, sPassword, sPfpUrl, sStudy, sEducator, sExtra);

    if (sName == '' || sUsername == '' || sEmail == '' || sPassword == '' || sStudy == '' || sEducator == ''){
      alert('Please enter all student details');

    }else {
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
        success:function(user){
          console.log(user); //remove when development is finished
          if (user !== 'username taken already. Please try another name'){
            alert('Please login to manipulate the products data');

          } else {
            alert('username taken already. Please try another name');
            // ********** change ids *******
            $('#username').val('');
            $('#email').val('');
            $('#password').val('');
          } //else

        }, //success
        error:function(){
          console.log('error: cannot call api');
        }//error
      })//ajax post
    }//if

  })//#XXXCREATE-ACC-BTN-STUDENT


  // POST - employer registration  =====================================================

  $('#').click(function(){
    event.preventDefault()//this prevents code breaking when no data is found
    let eName = $('#name').val();
    let eUsername = $('#username').val();
    let eEmail = $('#user-email').val();
    let ePassword = $('#password').val();
    let ePfpUrl = $('#profile-INPUT').val();
    let eWorkField = $('#r-name').val();
    let eCompanyName = $('#company-name').val();
    let eExtra = $('#r-extra').val();

    console.log(eName, eUsername, eEmail, ePassword, ePfpUrl, eWorkField, eCompanyName, eExtra);

    if (eName == '' || eUsername == '' || eEmail == '' || ePassword == '' || eWorkField == '' || eCompanyName == ''){
      alert('Please enter all emplyoyer details');

    }else {
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
          companyName: eWorkField,
          extra: eExtra
        },
        success:function(user){
          console.log(user); //remove when development is finished
          if (user !== 'username taken already. Please try another name'){
            alert('Please login to manipulate the products data');

          } else {
            alert('username taken already. Please try another name');
            // ********** change ids *******
            $('#username').val('');
            $('#user-email').val('');
            $('#password').val('');
          } //else

        }, //success
        error:function(){
          console.log('error: cannot call api');
        }//error
      })//ajax post
    }//if

  })//#XXXCREATE-ACC-BTN-EMPLOIYER


  // PATCH - student profile - update student profile details ===========================
  $('#updateSTUDENTPROFILE').click(function(){
    event.preventDefault();

    // ** not sure about username **
    let userid = sessionStorage.getItem('userID');

    // let productId = $('#productId').val();
    let name = $('#inputidUpdate').val();
    let studyField = $('#inputidUpdate').val();
    let educator = $('#inputidUpdate').val();
    let extra = $('#inputidUpdate').val();

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
      })//ajax
    }//if
  })//updateJOBPOSTXXXX



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


});//document.ready


// cc above ====================================================================



// $('#login').click(function(){
//   $('#loginForm').show();
//   $('#registerForm').hide();
// })

// $('#register').click(function(){
//   $('#registerForm').show();
//   $('#loginForm').hide();
// });
// $('#username').click(function(){
//   $(this).val('');

// })
// $('#password').click(function(){
//   $(this).val('');
// })


// //view the products from database
// $('#view').click(function(){
//   console.log(url);
//   $('#homePage').hide();
//   $('#adminPage').hide();
//   $('#result').show();
//   $.ajax({
//     url:`${url}/allProductsFromDB`,
//     type: 'GET',
//     dataType : 'json',
//     success : function(productsFromMongo){
//       console.log(productsFromMongo);
//       var i;
//       document.getElementById('result').innerHTML ="";
//       for(i=0;i<productsFromMongo.length;i++){
//       document.getElementById('result').innerHTML +=
//       `<div class="col-4"><p>${productsFromMongo[i].name}<br>
//       $ ${productsFromMongo[i].price}<br>
//       <img src="${productsFromMongo[i].image_url}" alt="image" class="img-thumbnail"/>
//
//       </p></div>`;
//       }
//     },
//     error:function(){
//
//     }
//   })//ajax
// })//view button click
//
// //add a product
// $('#addProduct').click(function(){
//   event.preventDefault();
//   let name = $('#a-name').val();
//   let price = $('#a-price').val();
//   let image_url = $('#a-imageurl').val();
//   let userid =  sessionStorage.getItem('userID');
//   console.log(userid);
//   console.log(name,price, image_url);
//   if (name == '' || price == '' || userid == ''){
//     alert('Please enter all details');
//   } else {
//     $.ajax({
//       url : `${url}/addProduct`,
//       type : 'POST',
//       data :{
//         name: name,
//         price: price,
//         image_url:image_url,
//         user_id:userid
//       },
//       success : function(product){
//         console.log(product);
//         alert ('product added');
//       },
//       error : function(){
//         console.log('error: cannot call api');
//       }//error
//     })//ajax
//   }//else
// });//addProduct
//
// //update the product
// $('#updateProduct').click(function(){
//   event.preventDefault();
//   let productId = $('#productId').val();
//   let productName = $('#productName').val();
//   let productPrice = $('#productPrice').val();
//   let imageurl = $('#imageurl').val();
//   let userid =sessionStorage.getItem('userID');
//   console.log(productId, productName, productPrice, imageurl, userid);
//   if ( productId == ''){
//     alert('Please enter product id for updating');
//   } else {
//     $.ajax({
//       url: `${url}/updateProduct/${productId}`,
//       type: 'PATCH',
//       data:{
//         name : productName,
//         price : productPrice,
//         image_url : imageurl,
//         user_id: userid
//       },
//       success: function(data){
//         console.log(data);
//         if(data == '401 error: user has no permission to update'){
//           alert('401 error: user has no permission to update');
//
//         } else {
//           alert('updated');
//         }//else
//
//         $('#productId').val('');
//         $('#productName').val('');
//         $('#productPrice').val('');
//         $('#imageurl').val('');
//
//
//       }, //success
//       error: function(){
//         console.log('error:cannot call api');
//       }//error
//     })//ajax
//   }//if
// })//updateProduct
//
// //delete product
// $('#deleteProduct').click(function(){
//   event.preventDefault();
//   if (!sessionStorage['userID']){
//     alert('401 permission denied');
//     return;
//   };
//   let productId = $('#delProductId').val();
//   console.log(productId);
//   if (productId == ''){
//     alert('Please enter the product id to delete the product');
//   } else {
//     $.ajax({
//       url : `${url}/deleteProduct/${productId}`,
//       type:'DELETE',
//       data :{
//         user_id : sessionStorage['userID']
//       },
//       success : function(data){
//         console.log(data);
//         if (data =='deleted'){
//           alert('deleted');
//           $('#delProductId').val('');
//         } else {
//           alert('Enter a valid id');
//         } //else
//       }, //success
//       error:function(){
//         console.log('error: cannot call api');
//       }//error
//     })//ajax
//   }//if
//
// })//deleteProduct
//
// User Registration
// $('#r-submit').click(function(){
//   //event.preventDefault()//this prevents code breaking when no data is found
//
//   let username = $('#r-username').val();
//   let email = $('#r-email').val();
//   let password = $('#r-password').val();
//   console.log(username, email, password);
//
//   if (username == '' || email == '' || password == ''){
//     alert('Please enter all details');
//
//   }else {
//     $.ajax({
//       url: `${url}/registerUser`,
//       type : 'POST',
//       data : {
//         username :username,
//         email :email,
//         password:password
//       },
//       success:function(user){
//         console.log(user); //remove when development is finished
//         if (user !== 'username taken already. Please try another name'){
//           alert('Please login to manipulate the products data');
//           $('#registerForm').hide();
//           $('#register').hide();
//           $('#login').show();
//
//         } else {
//           alert('username taken already. Please try another name');
//           $('#r-username').val('');
//           $('#r-email').val('');
//           $('#r-password').val('');
//         } //else
//
//       }, //success
//       error:function(){
//         console.log('error: cannot call api');
//       }//error
//     })//ajax post
//   }//if
//
// })//r-submit click
//
// // User login
// $('#submit').click(function(){
//
//   event.preventDefault();
//   let username = $('#username').val();
//   let password = $('#password').val();
//
//   console.log(username, password);//remove after development for security
//
//   if (username == '' || password == ''){
//     alert('Please enter all details');
//   } else {
//     $.ajax({
//       url : `${url}/loginUser`,
//       type :'POST',
//       data :{
//         username : username,
//         password : password
//       },
//       success : function(user){
//         console.log(user);
//
//         if (user == 'user not found. Please register'){
//           alert('user not found. Please enter correct data or register as a new user');
//         } else if (user == 'not authorized') {
//           alert('Please  try with correct details');
//           $('#username').val('');
//           $('#password').val('');
//         }else{
//            sessionStorage.setItem('userID', user['_id']);
//            sessionStorage.setItem('userName',user['username']);
//            sessionStorage.setItem('userEmail',user['email']);
//            console.log(sessionStorage);
//            $('#manip').show();
//            $('#logout').show();
//            $('#login').hide();
//            $('#register').hide();
//            $('#loginForm').hide();
//            $('#registerForm').hide();
//         }
//       },//success
//       error:function(){
//         console.log('error: cannot call api');
//       }//errror
//
//     })//ajax
//   }//if else
// })
//
// //logout
// $('#logout').click(function(){
//   sessionStorage.clear();
//   console.log('You are logged out');
//   console.log(sessionStorage);
//   $('#manip').hide();
// });
//
