const express =require('express');//includes express
const app = express(); //calls the express method
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//cross origin resource sharing
const cors = require('cors');//cross origin restriction to be waived
const bcrypt = require('bcryptjs');
const config = require('./config.json');
const product = require('./Products.json');
const Post = require('./models/posts.js');
const Student = require('./models/students.js');
const Employer = require('./models/employers.js');

const port = 3000;

//use ends here
app.use((req,res,next)=>{
 console.log(`${req.method} request ${req.url}`);
  next();
})

app.use(bodyParser.json());//calling body parser method
app.use(bodyParser.urlencoded({extended:false}));//using default

app.use(cors()); //calling cors method

app.get('/',(req,res)=> res.send('Hello! I am from the backend'))

 mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@need-a-hand.${config.MONGO_CLUSTER_NAME}.mongodb.net/need-a-hand?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log('DB connected!'))
.catch(err=>{
  console.log(`DBConnectionError:${err.message}`);
});

//BRANCH:creating-post - post method to write or create a document in mongodb
app.post('/addProduct',(req,res)=>{
  const dbProduct = new Product({
    _id : new mongoose.Types.ObjectId,
    name : req.body.name,
    price: req.body.price,
    image_url : req.body.imageUrl
  });
  //save to the database and notify the user
  dbProduct.save().then(result=>{
    res.send(result);
  }).catch(err=>res.send(err));
})
// BRANCH:creating-post ENDS

//BRANCH:reading-get - retrieve objects or documents from the database
app.get('/allProductsFromDB',(req,res)=>{
  Product.find().then(result=>{
    res.send(result);
  })
})
//BRANCH:reading-get ENDS

//BRANCH:updating-patch - patch is to update the details of the objects
app.patch('/updateProduct/:id',(req,res)=>{
  const idParam = req.params.id;
  Product.findById(idParam,(err,product)=>{
    if (product['user_id'] == req.body.userId){
      const updatedProduct = {
        name : req.body.name,
        price : req.body.price,
        image_url:req.body.image_url
      }
      Product.updateOne({_id:idParam}, updatedProduct).
      then(result=>{
        res.send(result);
      }).catch(err=> res.send(err));
    } else{
      res.send('error: product not found')
    }//else
  })
})
//BRANCH:updating-patch ENDS

//BRANCH:updating - delete a product from database
app.delete('/deleteProduct/:id',(req,res)=>{
  const idParam = req.params.id;
  Product. findOne({_id:idParam}, (err,product)=>{
    if(product){
      Product.deleteOne({_id:idParam},err=>{
        res.send('deleted');
    });
    } else {
      res.send('not found');
    } //else
  }).catch(err=> res.send(err));
});//delete
//BRANCH:updating ENDS

//BRANCH:reading-get - get method to access data from Products.json
//routing to the endpoint
app.get('/allProducts', (req,res)=>{
  res.json(product);
})

app.get('/products/p=:id',(req,res)=>{
  const idParam = req.params.id;
  for (let i =0; i<product.length; i++){
    if (idParam.toString() === product[i].id.toString()){
      res.json(product[i]);
    }
  }
});
//BRANCH:reading-get ENDS

//BRANCH:creating-post - register a new user
app.post('/registerUser',(req,res)=>{
  //checking if user is found in the db already
  User.findOne({username:req.body.username},(err,userResult)=>{
    if (userResult){
      res.send('username taken already. Please try another name');

    } else {
      const hash = bcrypt.hashSync(req.body.password);//encrypts MONGO_PASSWORD
      const user = new User({
        _id : new mongoose.Types.ObjectId,
        username : req.body.username,
        email : req.body.email,
        password : hash
      });
      //saves to database and notify the user
      user.save().then(result=>{
        res.send(result);
      }).catch(err=>res.send(err));
    }
  })
});
//BRANCH:creating-post ENDS

//BRANCH:reading-get - view all users
app.get('/allUser',(req,res)=>{
  User.find().then(result=>{
    res.send(result);
  })
});
//BRANCH:creating-post ENDS

//BRANCH:creating-post - login the user
app.post('/loginUser', (req,res)=>{
  User.findOne({username:req.body.username},(err,userResult)=>{
    if (userResult){
      if (bcrypt.compareSync(req.body.password, userResult.password)){
        res.send(userResult);
      } else {
        res.send('not authorized');
      }//inner if
    } else {
       res.send('user not found. Please register');
    }//outer if
  });//findOne
});//post
//BRANCH:creating-post ENDS



//listening to port
app.listen(port,()=>console.log(`Need-A-Hand is listening on port ${port}`))
