console.log('script'); //testing if script.js is working
console.log(sessionStorage);

$(document).ready(function(){


  $('#result').hide();
    $('#adminPage').hide();
    $('#logout').hide();
    $('#manip').hide();
    $('#login').show();
    $('#loginForm').hide();
    $('#registerForm').hide();


$('#home').click(function(){
  $('#result').hide();
  $('#adminPage').hide();
  $('#homePage').show();
});

$('#admin').click(function(){
  $('#homePage').hide();
  $('#result').hide();
  $('#adminPage').show();
  $('#logout').hide();
  $('#login').show();
  $('#register').show();
});
$('#login').click(function(){
  $('#loginForm').show();
  $('#registerForm').hide();
})
$('#register').click(function(){
  $('#registerForm').show();
  $('#loginForm').hide();
});
$('#username').click(function(){
  $(this).val('');
})
$('#password').click(function(){
  $(this).val('');
})
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
})


//view the products from database
$('#view').click(function(){
  console.log(url);
  $('#homePage').hide();
  $('#adminPage').hide();
  $('#result').show();
  $.ajax({
    url:`${url}/allProductsFromDB`,
    type: 'GET',
    dataType : 'json',
    success : function(productsFromMongo){
      console.log(productsFromMongo);
      var i;
      document.getElementById('result').innerHTML ="";
      for(i=0;i<productsFromMongo.length;i++){
      document.getElementById('result').innerHTML +=
      `<div class="col-4"><p>${productsFromMongo[i].name}<br>
      $ ${productsFromMongo[i].price}<br>
      <img src="${productsFromMongo[i].image_url}" alt="image" class="img-thumbnail"/>

      </p></div>`;
      }
    },
    error:function(){

    }
  })//ajax
})//view button click

//add a product
$('#addProduct').click(function(){
  event.preventDefault();
  let name = $('#a-name').val();
  let price = $('#a-price').val();
  let image_url = $('#a-imageurl').val();
  let userid =  sessionStorage.getItem('userID');
  console.log(userid);
  console.log(name,price, image_url);
  if (name == '' || price == '' || userid == ''){
    alert('Please enter all details');
  } else {
    $.ajax({
      url : `${url}/addProduct`,
      type : 'POST',
      data :{
        name: name,
        price: price,
        image_url:image_url,
        user_id:userid
      },
      success : function(product){
        console.log(product);
        alert ('product added');
      },
      error : function(){
        console.log('error: cannot call api');
      }//error
    })//ajax
  }//else
});//addProduct

//update the product
$('#updateProduct').click(function(){
  event.preventDefault();
  let productId = $('#productId').val();
  let productName = $('#productName').val();
  let productPrice = $('#productPrice').val();
  let imageurl = $('#imageurl').val();
  let userid =sessionStorage.getItem('userID');
  console.log(productId, productName, productPrice, imageurl, userid);
  if ( productId == ''){
    alert('Please enter product id for updating');
  } else {
    $.ajax({
      url: `${url}/updateProduct/${productId}`,
      type: 'PATCH',
      data:{
        name : productName,
        price : productPrice,
        image_url : imageurl,
        user_id: userid
      },
      success: function(data){
        console.log(data);
        if(data == '401 error: user has no permission to update'){
          alert('401 error: user has no permission to update');

        } else {
          alert('updated');
        }//else

        $('#productId').val('');
        $('#productName').val('');
        $('#productPrice').val('');
        $('#imageurl').val('');


      }, //success
      error: function(){
        console.log('error:cannot call api');
      }//error
    })//ajax
  }//if
})//updateProduct

//delete product
$('#deleteProduct').click(function(){
  event.preventDefault();
  if (!sessionStorage['userID']){
    alert('401 permission denied');
    return;
  };
  let productId = $('#delProductId').val();
  console.log(productId);
  if (productId == ''){
    alert('Please enter the product id to delete the product');
  } else {
    $.ajax({
      url : `${url}/deleteProduct/${productId}`,
      type:'DELETE',
      data :{
        user_id : sessionStorage['userID']
      },
      success : function(data){
        console.log(data);
        if (data =='deleted'){
          alert('deleted');
          $('#delProductId').val('');
        } else {
          alert('Enter a valid id');
        } //else
      }, //success
      error:function(){
        console.log('error: cannot call api');
      }//error
    })//ajax
  }//if

})//deleteProduct

// User Registration
$('#r-submit').click(function(){
  //event.preventDefault()//this prevents code breaking when no data is found

  let username = $('#r-username').val();
  let email = $('#r-email').val();
  let password = $('#r-password').val();
  console.log(username, email, password);

  if (username == '' || email == '' || password == ''){
    alert('Please enter all details');

  }else {
    $.ajax({
      url: `${url}/registerUser`,
      type : 'POST',
      data : {
        username :username,
        email :email,
        password:password
      },
      success:function(user){
        console.log(user); //remove when development is finished
        if (user !== 'username taken already. Please try another name'){
          alert('Please login to manipulate the products data');
          $('#registerForm').hide();
          $('#register').hide();
          $('#login').show();

        } else {
          alert('username taken already. Please try another name');
          $('#r-username').val('');
          $('#r-email').val('');
          $('#r-password').val('');
        } //else

      }, //success
      error:function(){
        console.log('error: cannot call api');
      }//error
    })//ajax post
  }//if

})//r-submit click

// User login
$('#submit').click(function(){

  event.preventDefault();
  let username = $('#username').val();
  let password = $('#password').val();

  console.log(username, password);//remove after development for security

  if (username == '' || password == ''){
    alert('Please enter all details');
  } else {
    $.ajax({
      url : `${url}/loginUser`,
      type :'POST',
      data :{
        username : username,
        password : password
      },
      success : function(user){
        console.log(user);

        if (user == 'user not found. Please register'){
          alert('user not found. Please enter correct data or register as a new user');
        } else if (user == 'not authorized') {
          alert('Please  try with correct details');
          $('#username').val('');
          $('#password').val('');
        }else{
           sessionStorage.setItem('userID', user['_id']);
           sessionStorage.setItem('userName',user['username']);
           sessionStorage.setItem('userEmail',user['email']);
           console.log(sessionStorage);
           $('#manip').show();
           $('#logout').show();
           $('#login').hide();
           $('#register').hide();
           $('#loginForm').hide();
           $('#registerForm').hide();
        }
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//errror

    })//ajax
  }//if else
})

//logout
$('#logout').click(function(){
  sessionStorage.clear();
  console.log('You are logged out');
  console.log(sessionStorage);
  $('#manip').hide();
});


});//document.ready
