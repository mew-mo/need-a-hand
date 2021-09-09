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
app.use((req,res,next) => {
 console.log(`${req.method} request ${req.url}`);
  next();
})

app.use(bodyParser.json());//calling body parser method
app.use(bodyParser.urlencoded({extended:false}));//using default

app.use(cors()); //calling cors method

 mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@need-a-hand.${config.MONGO_CLUSTER_NAME}.mongodb.net/need-a-hand?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log('DB connected!'))
.catch(err => {
  alert(`DBConnectionError:${err.message}`);
});

//BRANCH:creating-post - post method to write or create a document in mongodb
// POST add new post
app.post('/addPost',(req, res) => {
  const post = new Post({
    _id : new mongoose.Types.ObjectId,
    jobTitle: req.body.jobTitle,
    posterName: req.body.posterName,
    username: req.body.username,
    jobDescription: req.body.jobDescription
  });
  //save to the database and notify the user
  post.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));
})

// POST register employer
app.post('/registerEmployer', (req, res) => {
  // finds one employer
  Employer.findOne({username: req.body.username}, (err, userResult) => {
    if (userResult){
      res.send('Error: Username is already taken. Please try another name');
    } else {
      const hash = bcrypt.hashSync(req.body.password); //Password Encryption
      const employer = new Employer({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        pfpUrl: req.body.pfpUrl,
        workField: req.body.workField,
        companyName: req.body.companyName,
        extra: req.body.extra
      });
      employer.save()
      .then(result => {
        res.send(result)
      })
      .catch(err => res.send(err));
    }
  })
});

// POST register student
app.post('/registerStudent', (req, res) => {
  // finds one student
  Student.findOne({username: req.body.username}, (err, userResult) => {
    if (userResult){
      res.send('Error: Username is already taken. Please try another name');
    } else {
      const hash = bcrypt.hashSync(req.body.password); //Password Encryption
      const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        pfpUrl: req.body.pfpUrl,
        studyField: req.body.studyField,
        educator: req.body.educator,
        extra: req.body.extra
      });
      student.save()
      .then(result => {
        res.send(result)
      })
      .catch(err => res.send(err));
    }
  })
});

// login Employer
app.post('/loginEmployer', (req, res) => {
  Employer.findOne({username: req.body.username}, (err, userResult) => {
    if (userResult){
      if (bcrypt.compareSync(req.body.password, userResult.password)) {
        res.send(userResult);
      } else {
        res.send('Not authorized');
      }//inner if
    } else {
       res.send('User not found. Please register');
    }//outer if
  });//findOne
});//post

// login Student
app.post('/loginStudent', (req, res) => {
  Student.findOne({username: req.body.username}, (err, userResult) => {
    if (userResult){
      if (bcrypt.compareSync(req.body.password, userResult.password)) {
        res.send(userResult);
      } else {
        res.send('Not authorized');
      }//inner if
    } else {
       res.send('User not found. Please register');
    }//outer if
  });//findOne
});//post
// BRANCH:creating-post ENDS ---------------------------------------------------

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

//BRANCH:reading-get - view all users
app.get('/allUser',(req,res)=>{
  User.find().then(result=>{
    res.send(result);
  })
});
//BRANCH:reading-get ENDS

//listening to port
app.listen(port,()=>console.log(`Need-A-Hand is listening on port ${port}`))
